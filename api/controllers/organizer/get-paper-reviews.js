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

  const reviews = await knex('reviews')
    .select(
      'reviews.id',
      'reviews.recommendation',
      'reviews.feedback_for_author',
      'reviews.confidential_comments',
      'reviews.submitted_at',
      'identities.name as reviewer_name',
      'identities.email as reviewer_email'
    )
    .leftJoin('paper_reviewers', 'reviews.paper_reviewer_id', 'paper_reviewers.id')
    .leftJoin('identities', 'paper_reviewers.user_id', 'identities.id')
    .where('paper_reviewers.paper_id', '=', paperId)
    .orderBy('reviews.submitted_at', 'desc');

  const totalAssignedReviewers = await knex('paper_reviewers')
    .count('id as count')
    .where('paper_id', '=', paperId)
    .where('assignment_status', '=', 'accepted')
    .first();

  return res.status(200).json({
    reviews,
    totalAcceptedReviewers: parseInt(totalAssignedReviewers?.count || 0, 10),
  });
};
