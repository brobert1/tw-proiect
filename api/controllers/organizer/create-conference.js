import { knex } from '@db';
import { error, randomHash } from '@functions';
import { sendReviewerInvitation } from '@functions/email';
import bcrypt from 'bcryptjs';

export default async (req, res) => {
  const { me } = req.user;
  if (!me) {
    throw error(401, 'Unauthorized');
  }

  const {
    title,
    shortCode,
    description,
    location,
    date,
    topics,
    submissionDate,
    reviewDate,
    emails = [],
  } = req.body;

  const trx = await knex.transaction();

  const [conference] = await trx('conferences')
    .insert({
      user_id: me,
      name: title,
      acronym: shortCode,
      description: description || null,
      location: location || null,
      conference_date: date ? new Date(date) : null,
      topics: topics && topics.length > 0 ? JSON.stringify(topics) : null,
      submission_deadline: submissionDate ? new Date(submissionDate) : null,
      review_deadline: reviewDate ? new Date(reviewDate) : null,
      status: 'upcoming',
      created_at: knex.fn.now(),
    })
    .returning('*');

  const invitationResults = [];

  for (const email of emails) {
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

    invitationResults.push({
      email: email,
      reviewerId: reviewer.id,
      invitationToken,
    });
  }

  await trx.commit();

  const emailPromises = invitationResults.map(async (invitation) => {
    await sendReviewerInvitation({
      email: invitation.email,
      conference: {
        name: conference.name,
        acronym: conference.acronym,
        location: conference.location,
        date: conference.conference_date,
      },
    });
    return { email: invitation.email, sent: true };
  });

  const emailResults = await Promise.allSettled(emailPromises);

  return res.status(201).json({
    message: 'Conference created successfully',
    conference: {
      id: conference.id,
      name: conference.name,
      acronym: conference.acronym,
    },
    invitations: {
      total: invitationResults.length,
      emailsSent: emailResults.filter((r) => r.status === 'fulfilled' && r.value.sent).length,
      emailsFailed: emailResults.filter((r) => r.status === 'rejected' || !r.value?.sent).length,
    },
  });
};
