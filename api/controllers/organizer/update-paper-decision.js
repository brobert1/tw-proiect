import { knex } from '@db';
import { error } from '@functions';
import { logger } from '@lib';
import { sendEmail } from '@plugins/nodemailer';

export default async (req, res) => {
  const { me } = req.user;
  if (!me) {
    throw error(401, 'Unauthorized');
  }

  const { id: conferenceId, paperId } = req.params;
  const { decision } = req.body;

  if (!decision || !['accepted', 'rejected'].includes(decision)) {
    throw error(400, 'Invalid decision. Must be "accepted" or "rejected"');
  }

  const conference = await knex('conferences')
    .first('id', 'name', 'user_id')
    .where('id', '=', conferenceId);

  if (!conference) {
    throw error(404, 'Conference not found');
  }

  if (conference.user_id !== me) {
    throw error(403, 'You are not the organizer of this conference');
  }

  const paper = await knex('papers')
    .first('papers.id', 'papers.title', 'papers.status', 'identities.email')
    .leftJoin('identities', 'papers.user_id', 'identities.id')
    .where('papers.id', '=', paperId);

  if (!paper) {
    throw error(404, 'Paper not found');
  }

  await knex('papers').where('id', '=', paperId).update({
    status: decision,
    updated_at: knex.fn.now(),
  });

  try {
    await sendEmail({
      to: paper.email,
      subject: `Paper ${decision === 'accepted' ? 'Accepted' : 'Rejected'} - ${conference.name}`,
      type: 'paperDecision',
      data: {
        paper_title: paper.title,
        conference_name: conference.name,
        decision_text: decision === 'accepted' ? 'Accepted' : 'Rejected',
        decision_class: decision,
        url: `${process.env.APP_BASE_URL}/author/conferences/${conferenceId}`,
      },
    });
    logger.info(`Paper decision email sent to ${paper.email}`);
  } catch (emailError) {
    logger.error('Failed to send paper decision email:', emailError);
  }

  return res.status(200).json({
    message: `Paper ${decision === 'accepted' ? 'accepted' : 'rejected'} successfully`,
    status: decision,
  });
};
