import { CronJob } from 'cron';
import { logger } from '@lib';

export default function createCron({
  name,
  schedule,
  task,
  timezone = 'Europe/Bucharest',
  autostart = true,
}) {
  const onTick = async () => {
    const startedAt = new Date();
    try {
      logger.info(`[CRON] Starting: ${name}`);
      await task();
      const finishedAt = new Date();
      const duration = finishedAt - startedAt;
      logger.info(`[CRON] Completed: ${name} (${duration}ms)`);
    } catch (err) {
      const finishedAt = new Date();
      const duration = finishedAt - startedAt;
      logger.error(`[CRON] Failed: ${name} (${duration}ms)`, err);
    }
  };

  return new CronJob(schedule, onTick, null, autostart, timezone);
}
