import { knex } from '@db';
import { allocateReviewersForConference, createCron } from '@functions';
import { logger } from '@lib';

async function task() {
  logger.info('Running reviewer allocation job...');

  const now = new Date();

  // Find conferences where submission deadline has passed
  const conferencesToProcess = await knex('conferences')
    .select('id', 'name')
    .where('submission_deadline', '<', now);

  if (conferencesToProcess.length === 0) {
    logger.info('No conferences ready for reviewer allocation');
    return { processed: 0 };
  }

  logger.info(`Found ${conferencesToProcess.length} conference(s) to check`);

  let totalProcessed = 0;
  let totalPapersAllocated = 0;

  for (const conference of conferencesToProcess) {
    // Allocate reviewers to papers (only affects papers with 'submitted' status)
    const result = await allocateReviewersForConference(conference.id);

    if (result.allocated > 0) {
      totalProcessed++;
      totalPapersAllocated += result.allocated;

      logger.info(
        `Conference "${conference.name}" processed: ${result.allocated} paper(s) allocated`
      );
    }
  }

  logger.info(
    `Reviewer allocation complete: ${totalProcessed} conference(s), ${totalPapersAllocated} paper(s)`
  );

  return {
    processed: totalProcessed,
    papersAllocated: totalPapersAllocated,
  };
}

export default createCron({
  name: 'allocate-reviewers',
  schedule: '*/15 * * * *', // Every 15 minutes
  task,
  timezone: 'Europe/Bucharest',
  autostart: true,
});
