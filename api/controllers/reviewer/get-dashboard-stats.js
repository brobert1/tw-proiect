import { knex } from '@db';
import { error } from '@functions';

export default async (req, res) => {
  const { me } = req.user;
  if (!me) {
    throw error(401, 'Unauthorized');
  }

  const conferences = await knex('conference_reviewers')
    .select(
      'conferences.id',
      'conferences.name',
      'conferences.acronym',
      'conferences.status',
      'conferences.review_deadline'
    )
    .leftJoin('conferences', 'conference_reviewers.conference_id', 'conferences.id')
    .where('conference_reviewers.user_id', '=', me);

  const conferenceIds = conferences.map((c) => c.id);

  const assignedPapers = conferenceIds.length
    ? await knex('paper_reviewers')
        .select(
          'paper_reviewers.id as assignment_id',
          'papers.id as paper_id',
          'papers.title',
          'papers.conference_id',
          'conferences.acronym as conference_acronym',
          'conferences.review_deadline'
        )
        .leftJoin('papers', 'paper_reviewers.paper_id', 'papers.id')
        .leftJoin('conferences', 'papers.conference_id', 'conferences.id')
        .where('paper_reviewers.user_id', '=', me)
        .orderBy('conferences.review_deadline', 'asc')
    : [];

  const submittedReviews = await knex('reviews')
    .select('reviews.id', 'reviews.paper_reviewer_id')
    .leftJoin('paper_reviewers', 'reviews.paper_reviewer_id', 'paper_reviewers.id')
    .where('paper_reviewers.user_id', '=', me);

  const reviewedAssignmentIds = submittedReviews.map((r) => r.paper_reviewer_id);

  const stats = {
    totalConferences: conferences.length,
    activeConferences: conferences.filter((c) => c.status === 'upcoming' || c.status === 'ongoing')
      .length,
    totalAssignedPapers: assignedPapers.length,
    pendingReviews: assignedPapers.filter((p) => !reviewedAssignmentIds.includes(p.assignment_id))
      .length,
    completedReviews: submittedReviews.length,
  };

  const papersPendingReview = assignedPapers
    .filter((p) => !reviewedAssignmentIds.includes(p.assignment_id))
    .slice(0, 5);

  const recentReviews = await knex('reviews')
    .select(
      'reviews.id',
      'reviews.recommendation',
      'reviews.submitted_at',
      'papers.title as paper_title',
      'conferences.acronym as conference_acronym'
    )
    .leftJoin('paper_reviewers', 'reviews.paper_reviewer_id', 'paper_reviewers.id')
    .leftJoin('papers', 'paper_reviewers.paper_id', 'papers.id')
    .leftJoin('conferences', 'papers.conference_id', 'conferences.id')
    .where('paper_reviewers.user_id', '=', me)
    .orderBy('reviews.submitted_at', 'desc')
    .limit(5);

  return res.status(200).json({
    stats,
    papersPendingReview,
    recentReviews,
    conferences: conferences.slice(0, 5),
  });
};
