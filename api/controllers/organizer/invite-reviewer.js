import { knex } from '@db';
import { error, randomHash } from '@functions';
import { sendReviewerInvitation } from '@functions/email';
import bcrypt from 'bcryptjs';

export default async (req, res) => {
  const { me } = req.user;
  if (!me) {
    throw error(401, 'Unauthorized');
  }

  const { id } = req.params;
  const { email } = req.body;

  if (!email) {
    throw error(400, 'Email is required');
  }

  const conference = await knex('conferences')
    .first('id', 'name', 'acronym', 'location', 'conference_date')
    .where('id', '=', id)
    .where('user_id', '=', me);

  if (!conference) {
    throw error(404, 'Conference not found');
  }

  const existingInvitation = await knex('reviewer_invitations')
    .first('id', 'status')
    .where('conference_id', '=', id)
    .where('email', '=', email);

  if (existingInvitation) {
    throw error(400, 'This reviewer has already been invited to this conference');
  }

  const trx = await knex.transaction();

  try {
    let reviewer = await trx('identities')
      .first('id', 'email', 'name', 'role')
      .where('email', '=', email);

    if (!reviewer) {
      const password = randomHash();
      const hashedPassword = await bcrypt.hash(password, 10);

      const [newReviewer] = await trx('identities')
        .insert({
          email: email,
          name: email.split('@')[0],
          role: 'reviewer',
          password: hashedPassword,
          active: false,
          loginAttempts: 0,
          created_at: knex.fn.now(),
        })
        .returning(['id', 'email', 'name', 'role']);

      reviewer = newReviewer;
    }

    const invitationToken = randomHash() + randomHash();

    await trx('reviewer_invitations').insert({
      conference_id: conference.id,
      email: email,
      invitation_token: invitationToken,
      status: 'pending',
      created_at: knex.fn.now(),
    });

    await trx.commit();

    try {
      await sendReviewerInvitation({
        email: email,
        conference: {
          name: conference.name,
          acronym: conference.acronym,
          location: conference.location,
          date: conference.conference_date,
        },
      });
    } catch (emailError) {
      console.error('Failed to send invitation email:', emailError);
    }

    return res.status(201).json({
      message: 'Reviewer invited successfully',
      reviewer: {
        email: reviewer.email,
        name: reviewer.name,
      },
    });
  } catch (err) {
    await trx.rollback();
    throw err;
  }
};
