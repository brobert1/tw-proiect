import { knex } from '@db';
import { error } from '@functions';

export default async (req, res) => {
  const { me } = req.user;
  if (!me) {
    throw error(401, 'Unauthorized');
  }

  const { assignmentId } = req.params;
  const { recommendation, feedback_for_author, confidential_comments } = req.body;

  if (!recommendation) {
    throw error(400, 'Recommendation is required');
  }

  const validRecommendations = ['strong_accept', 'accept', 'weak_accept', 'weak_reject', 'reject'];
  if (!validRecommendations.includes(recommendation)) {
    throw error(400, 'Invalid recommendation value');
  }

  const assignment = await knex('paper_reviewers')
    .select(
      'paper_reviewers.id',
      'paper_reviewers.user_id',
      'paper_reviewers.assignment_status',
      'conferences.review_deadline'
    )
    .leftJoin('papers', 'paper_reviewers.paper_id', 'papers.id')
    .leftJoin('conferences', 'papers.conference_id', 'conferences.id')
    .where('paper_reviewers.id', '=', assignmentId)
    .first();

  if (!assignment) {
    throw error(404, 'Assignment not found');
  }

  if (assignment.user_id !== me) {
    throw error(403, 'You are not assigned to review this paper');
  }

  if (assignment.review_deadline && new Date(assignment.review_deadline) < new Date()) {
    throw error(400, 'Review deadline has passed');
  }

  if (!['accepted', 'submitted'].includes(assignment.assignment_status)) {
    throw error(400, 'Cannot submit review for this assignment');
  }

  const existingReview = await knex('reviews')
    .where('paper_reviewer_id', '=', assignmentId)
    .first();

  if (existingReview) {
    await knex('reviews')
      .where('id', '=', existingReview.id)
      .update({
        recommendation,
        feedback_for_author: feedback_for_author || null,
        confidential_comments: confidential_comments || null,
        submitted_at: knex.fn.now(),
        updated_at: knex.fn.now(),
      });
  } else {
    await knex('reviews').insert({
      paper_reviewer_id: assignmentId,
      recommendation,
      feedback_for_author: feedback_for_author || null,
      confidential_comments: confidential_comments || null,
    });

    await knex('paper_reviewers').where('id', '=', assignmentId).update({
      assignment_status: 'submitted',
      updated_at: knex.fn.now(),
    });
  }

  return res.status(200).json({ message: 'Review submitted successfully' });
};
