import { knex } from '@db';
import { logger } from '@lib';
import calculateTopicScore from './calculate-topic-score';

export default async function allocateReviewersForConference(conferenceId) {
  // Get all papers for the conference that haven't been assigned reviewers yet
  const papers = await knex('papers')
    .select('id', 'user_id', 'topics', 'title')
    .where('conference_id', '=', conferenceId)
    .where('status', '=', 'submitted');

  if (papers.length === 0) {
    logger.info(`No papers to allocate for conference ${conferenceId}`);
    return { allocated: 0 };
  }

  // Get all accepted conference reviewers (the reviewer pool)
  const conferenceReviewers = await knex('conference_reviewers')
    .select('user_id', 'expertise_topics')
    .where('conference_id', '=', conferenceId);

  if (conferenceReviewers.length === 0) {
    logger.warn(`No reviewers available for conference ${conferenceId}`);
    return { allocated: 0 };
  }

  // Get current assignment counts for all reviewers
  const assignmentCounts = await knex('paper_reviewers')
    .select('user_id')
    .count('id as count')
    .whereIn(
      'user_id',
      conferenceReviewers.map((r) => r.user_id)
    )
    .groupBy('user_id');

  const countMap = assignmentCounts.reduce((acc, row) => {
    acc[row.user_id] = parseInt(row.count, 10);
    return acc;
  }, {});

  let totalAllocated = 0;

  for (const paper of papers) {
    const paperTopics = paper.topics || [];

    // Score and filter reviewers
    const scoredReviewers = conferenceReviewers
      // Filter out the paper author (conflict of interest)
      .filter((reviewer) => reviewer.user_id !== paper.user_id)
      // Calculate topic match score for each reviewer
      .map((reviewer) => ({
        userId: reviewer.user_id,
        score: calculateTopicScore(reviewer.expertise_topics, paperTopics),
        assignmentCount: countMap[reviewer.user_id] || 0,
      }))
      // Sort by score (descending), then by assignment count (ascending) for load balancing
      .sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        return a.assignmentCount - b.assignmentCount;
      });

    // Select top 2 reviewers
    const selectedReviewers = scoredReviewers.slice(0, 2);

    if (selectedReviewers.length < 2) {
      logger.warn(
        `Not enough reviewers for paper "${paper.title}" (id: ${paper.id}). ` +
          `Found ${selectedReviewers.length}, need 2.`
      );
      // Still assign whatever reviewers we have
      if (selectedReviewers.length === 0) continue;
    }

    const assignments = selectedReviewers.map((reviewer) => ({
      paper_id: paper.id,
      user_id: reviewer.userId,
      assignment_status: 'accepted',
      created_at: knex.fn.now(),
    }));

    await knex('paper_reviewers').insert(assignments).onConflict(['paper_id', 'user_id']).ignore();

    for (const reviewer of selectedReviewers) {
      countMap[reviewer.userId] = (countMap[reviewer.userId] || 0) + 1;
    }

    // Update paper status to 'under_review'
    await knex('papers')
      .update({ status: 'under_review', updated_at: knex.fn.now() })
      .where('id', '=', paper.id);

    totalAllocated++;
    logger.info(
      `Allocated ${selectedReviewers.length} reviewer(s) to paper "${paper.title}" (id: ${paper.id})`
    );
  }

  return { allocated: totalAllocated };
}
