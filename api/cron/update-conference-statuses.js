import { knex } from '@db';
import { createCron } from '@functions';
import { logger } from '@lib';

async function task() {
  logger.info('Running conference status update job...');

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Start of today

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1); // Start of tomorrow

  // Update conferences to 'ongoing' if conference_date is today
  const ongoingUpdated = await knex('conferences')
    .where('conference_date', '>=', today)
    .where('conference_date', '<', tomorrow)
    .whereNot('status', 'ongoing')
    .update({
      status: 'ongoing',
      updated_at: knex.fn.now(),
    });

  logger.info(`Updated ${ongoingUpdated} conference(s) to 'ongoing' status`);

  // Update conferences to 'completed' if conference_date is before today
  const completedUpdated = await knex('conferences')
    .where('conference_date', '<', today)
    .whereNot('status', 'completed')
    .update({
      status: 'completed',
      updated_at: knex.fn.now(),
    });

  logger.info(`Updated ${completedUpdated} conference(s) to 'completed' status`);

  return {
    ongoing: ongoingUpdated,
    completed: completedUpdated,
    total: ongoingUpdated + completedUpdated,
  };
}

export default createCron({
  name: 'update-conference-statuses',
  schedule: '0 2 * * *', // At 02:00 every day
  task,
  timezone: 'Europe/Bucharest',
  autostart: true,
});
