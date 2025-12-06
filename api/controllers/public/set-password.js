import { knex } from '@db';
import { error } from '@functions';
import bcrypt from 'bcryptjs';

export default async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  if (!token) {
    throw error(400, 'Missing invitation token');
  }
  if (!password || typeof password !== 'string' || password.length < 8) {
    throw error(400, 'Password must be at least 8 characters');
  }

  const trx = await knex.transaction();

  try {
    const tokenRecord = await trx('invitation_tokens')
      .first('id', 'invitation_id', 'expires_at')
      .where('token', '=', token);

    if (!tokenRecord) {
      throw error(404, 'Invitation not found');
    }
    if (new Date() > new Date(tokenRecord.expires_at)) {
      throw error(410, 'Invitation expired');
    }

    const invitation = await trx('reviewer_invitations')
      .first('email', 'status', 'conference_id')
      .where('id', '=', tokenRecord.invitation_id);

    if (!invitation) {
      throw error(404, 'Invitation not found');
    }

    const identity = await trx('identities').first('id').where('email', '=', invitation.email);

    if (!identity) {
      throw error(404, 'Identity not found');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await trx('identities')
      .update({ password: hashedPassword, active: true, updated_at: knex.fn.now() })
      .where('id', '=', identity.id);

    // Add the reviewer to the conference
    await trx('conference_reviewers').insert({
      user_id: identity.id,
      conference_id: invitation.conference_id,
      created_at: knex.fn.now(),
    });

    await trx('invitation_tokens').where('id', '=', tokenRecord.id).del();

    await trx.commit();
    return res.status(200).json({ message: 'Password updated' });
  } catch (err) {
    await trx.rollback();
    throw err;
  }
};
