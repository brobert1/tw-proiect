import { knex } from '@db';
import { error } from '@functions';

export default async (req, res) => {
  const { me } = req.user;
  if (!me) {
    throw error(401, 'Unauthorized');
  }

  const submissions = await knex('papers')
    .select(
      'papers.id',
      'papers.title',
      'papers.status',
      'papers.conference_id',
      'papers.created_at',
      'conferences.name as conference_name',
      'conferences.acronym as conference_acronym',
      'conferences.review_deadline'
    )
    .leftJoin('conferences', 'papers.conference_id', 'conferences.id')
    .where('papers.user_id', '=', me)
    .orderBy('papers.created_at', 'desc');

  const stats = {
    totalSubmissions: submissions.length,
    pendingReview: submissions.filter(
      (s) => s.status === 'submitted' || s.status === 'under_review'
    ).length,
    awaitingFinal: submissions.filter((s) => s.status === 'awaiting_final').length,
    accepted: submissions.filter((s) => s.status === 'accepted').length,
    rejected: submissions.filter((s) => s.status === 'rejected').length,
  };

  const submissionsNeedingAction = submissions
    .filter((s) => s.status === 'awaiting_final')
    .slice(0, 5);

  const recentSubmissions = submissions.slice(0, 5);

  const availableConferences = await knex('conferences')
    .select('id', 'name', 'acronym', 'submission_deadline')
    .where('status', '=', 'upcoming')
    .whereNotIn('id', knex('papers').select('conference_id').where('user_id', '=', me))
    .orderBy('submission_deadline', 'asc')
    .limit(5);

  return res.status(200).json({
    stats,
    submissionsNeedingAction,
    recentSubmissions,
    availableConferences,
  });
};
