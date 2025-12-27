import { knex } from '@db';
import { error } from '@functions';

export default async (req, res) => {
  const { me } = req.user;
  if (!me) {
    throw error(401, 'Unauthorized');
  }

  const { id, paperId } = req.params;

  const conference = await knex('conferences')
    .first('id')
    .where('id', '=', id)
    .where('user_id', '=', me);

  if (!conference) {
    throw error(404, 'Conference not found');
  }

  const paper = await knex('papers')
    .first('id')
    .where('id', '=', paperId)
    .where('conference_id', '=', id);

  if (!paper) {
    throw error(404, 'Paper not found');
  }

  const assignedReviewers = await knex('paper_reviewers')
    .select(
      'paper_reviewers.id',
      'paper_reviewers.user_id',
      'paper_reviewers.assignment_status as status',
      'paper_reviewers.created_at',
      'identities.name',
      'identities.email'
    )
    .leftJoin('identities', 'paper_reviewers.user_id', 'identities.id')
    .where('paper_reviewers.paper_id', '=', paperId)
    .orderBy('paper_reviewers.created_at', 'desc');

  const assignedUserIds = assignedReviewers.map((r) => r.user_id);

  let availableReviewersQuery = knex('conference_reviewers')
    .select(
      'conference_reviewers.user_id',
      'conference_reviewers.expertise_topics',
      'identities.name',
      'identities.email'
    )
    .leftJoin('identities', 'conference_reviewers.user_id', 'identities.id')
    .where('conference_reviewers.conference_id', '=', id);

  if (assignedUserIds.length > 0) {
    availableReviewersQuery = availableReviewersQuery.whereNotIn(
      'conference_reviewers.user_id',
      assignedUserIds
    );
  }

  const availableReviewers = await availableReviewersQuery.orderBy('identities.name', 'asc');

  return res.status(200).json({
    assignedReviewers,
    availableReviewers,
  });
};
