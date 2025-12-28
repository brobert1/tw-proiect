import { knex } from '@db';
import { createCron, sendFinalUploadRequest } from '@functions';
import { logger } from '@lib';

async function task() {
  logger.info('Running final upload notification job...');

  const now = new Date();

  const conferences = await knex('conferences')
    .select('id', 'name', 'review_deadline')
    .where('review_deadline', '<', now)
    .whereIn('status', ['upcoming', 'ongoing']);

  if (conferences.length === 0) {
    logger.info('No conferences with passed review deadlines');
    return { processed: 0 };
  }

  let totalNotified = 0;

  for (const conference of conferences) {
    const papers = await knex('papers')
      .select('papers.id', 'papers.title', 'papers.user_id', 'identities.email')
      .leftJoin('identities', 'papers.user_id', 'identities.id')
      .where('papers.conference_id', '=', conference.id)
      .where('papers.status', '=', 'under_review');

    for (const paper of papers) {
      await knex('papers').where('id', '=', paper.id).update({
        status: 'awaiting_final',
        updated_at: knex.fn.now(),
      });

      try {
        await sendFinalUploadRequest({
          email: paper.email,
          paper: { title: paper.title },
          conference: { id: conference.id, name: conference.name },
        });
        totalNotified++;
        logger.info(`Notified author for paper: ${paper.title}`);
      } catch (error) {
        logger.error(`Failed to notify author for paper: ${paper.title}`, error);
      }
    }
  }

  logger.info(`Final upload notifications complete: ${totalNotified} author(s) notified`);

  return { notified: totalNotified };
}

export default createCron({
  name: 'notify-final-upload',
  schedule: '0 0 * * *', // Daily at midnight
  task,
  timezone: 'Europe/Bucharest',
  autostart: true,
});
