import { knex } from '@db';
import { error } from '@functions';

export default async (req, res) => {
  const { token } = req.params;
  const { status } = req.body; // 'accepted' or 'declined'

  if (!token) {
    throw error(400, 'Missing invitation token');
  }
  if (!['accepted', 'declined'].includes(status)) {
    throw error(400, 'Invalid status. Must be "accepted" or "declined"');
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
      .first('id', 'email', 'status')
      .where('id', '=', tokenRecord.invitation_id)
      .forUpdate();

    if (!invitation) {
      throw error(404, 'Invitation not found');
    }

    // If attempting to accept an already processed invitation
    if (status === 'accepted' && invitation.status !== 'pending') {
      throw error(400, 'Invitation already processed');
    }

    // Update invitation status
    await trx('reviewer_invitations')
      .update({ status, updated_at: knex.fn.now() })
      .where('id', '=', invitation.id);

    const identity = await trx('identities')
      .first('id', 'last_login_at')
      .where('email', '=', invitation.email);

    if (status === 'declined') {
      // If declined and identity has no history (never logged in), clean it up
      if (identity && !identity.last_login_at) {
        await trx('identities').where('id', '=', identity.id).del();
      }
      // Delete token as it is no longer needed
      await trx('invitation_tokens').where('id', '=', tokenRecord.id).del();

      await trx.commit();
      return res.status(200).json({ message: 'Invitation declined' });
    } else {
      // Accepted flow
      const next = identity?.last_login_at ? 'login' : 'set_password';

      // If going to login, we are done with the token
      if (next === 'login') {
        await trx('invitation_tokens').where('id', '=', tokenRecord.id).del();
      }
      // If going to set_password, keep token alive for that step

      await trx.commit();
      return res.status(200).json({ next, message: 'Invitation accepted' });
    }
  } catch (err) {
    await trx.rollback();
    throw err;
  }
};
