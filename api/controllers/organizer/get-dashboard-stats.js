import { knex } from '@db';
import { error } from '@functions';

export default async (req, res) => {
  const { me } = req.user;
  if (!me) {
    throw error(401, 'Unauthorized');
  }

  const conferences = await knex('conferences')
    .select('id', 'name', 'acronym', 'status', 'submission_deadline', 'review_deadline')
    .where('user_id', '=', me);

  const conferenceIds = conferences.map((c) => c.id);

  const papers = conferenceIds.length
    ? await knex('papers').select('conference_id', 'status').whereIn('conference_id', conferenceIds)
    : [];

  const acceptedReviewers = conferenceIds.length
    ? await knex('conference_reviewers')
        .select('conference_id')
        .whereIn('conference_id', conferenceIds)
    : [];

  const pendingInvitations = conferenceIds.length
    ? await knex('reviewer_invitations')
        .select('conference_id')
        .whereIn('conference_id', conferenceIds)
        .where('status', '=', 'pending')
    : [];

  const reviews = conferenceIds.length
    ? await knex('reviews')
        .select('reviews.id')
        .leftJoin('paper_reviewers', 'reviews.paper_reviewer_id', 'paper_reviewers.id')
        .leftJoin('papers', 'paper_reviewers.paper_id', 'papers.id')
        .whereIn('papers.conference_id', conferenceIds)
    : [];

  const stats = {
    totalConferences: conferences.length,
    activeConferences: conferences.filter((c) => c.status === 'upcoming' || c.status === 'ongoing')
      .length,
    completedConferences: conferences.filter((c) => c.status === 'completed').length,
    totalPapers: papers.length,
    papersByStatus: {
      submitted: papers.filter((p) => p.status === 'submitted').length,
      under_review: papers.filter((p) => p.status === 'under_review').length,
      awaiting_final: papers.filter((p) => p.status === 'awaiting_final').length,
      final_submitted: papers.filter((p) => p.status === 'final_submitted').length,
      accepted: papers.filter((p) => p.status === 'accepted').length,
      rejected: papers.filter((p) => p.status === 'rejected').length,
    },
    totalReviewers: acceptedReviewers.length,
    pendingInvitations: pendingInvitations.length,
    totalReviews: reviews.length,
  };

  const recentConferences = await knex('conferences')
    .select('id', 'name', 'acronym', 'status', 'submission_deadline', 'review_deadline')
    .where('user_id', '=', me)
    .orderBy('created_at', 'desc')
    .limit(5);

  const recentConferencesWithStats = await Promise.all(
    recentConferences.map(async (conf) => {
      const paperCount = await knex('papers')
        .where('conference_id', '=', conf.id)
        .count('* as count')
        .first();
      const reviewerCount = await knex('conference_reviewers')
        .where('conference_id', '=', conf.id)
        .count('* as count')
        .first();
      return {
        ...conf,
        paper_count: parseInt(paperCount?.count || 0),
        reviewer_count: parseInt(reviewerCount?.count || 0),
      };
    })
  );

  const papersNeedingAction = conferenceIds.length
    ? await knex('papers')
        .select(
          'papers.id',
          'papers.title',
          'papers.status',
          'papers.conference_id',
          'conferences.acronym as conference_acronym'
        )
        .leftJoin('conferences', 'papers.conference_id', 'conferences.id')
        .whereIn('papers.conference_id', conferenceIds)
        .whereIn('papers.status', ['final_submitted'])
        .orderBy('papers.updated_at', 'desc')
        .limit(10)
    : [];

  return res.status(200).json({
    stats,
    recentConferences: recentConferencesWithStats,
    papersNeedingAction,
  });
};
