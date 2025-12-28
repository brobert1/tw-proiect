import { knex } from '@db';
import { error } from '@functions';

export default async (req, res) => {
  const { me } = req.user;
  if (!me) {
    throw error(401, 'Unauthorized');
  }

  const latestVersionSubquery = knex('paper_versions')
    .select('paper_id')
    .max('version_number as max_version')
    .groupBy('paper_id')
    .as('latest_versions');

  const assignments = await knex('paper_reviewers')
    .select(
      'paper_reviewers.id as assignment_id',
      'paper_reviewers.assignment_status',
      'paper_reviewers.created_at as assigned_at',
      'papers.id as paper_id',
      'papers.title',
      'papers.abstract',
      'papers.topics',
      'conferences.id as conference_id',
      'conferences.name as conference_name',
      'conferences.acronym as conference_acronym',
      'conferences.review_deadline',
      'paper_versions.file_url'
    )
    .leftJoin('papers', 'paper_reviewers.paper_id', 'papers.id')
    .leftJoin('conferences', 'papers.conference_id', 'conferences.id')
    .leftJoin(latestVersionSubquery, 'papers.id', 'latest_versions.paper_id')
    .leftJoin('paper_versions', function () {
      this.on('papers.id', '=', 'paper_versions.paper_id').andOn(
        'paper_versions.version_number',
        '=',
        'latest_versions.max_version'
      );
    })
    .where('paper_reviewers.user_id', '=', me)
    .whereIn('paper_reviewers.assignment_status', ['accepted', 'submitted'])
    .orderBy('conferences.review_deadline', 'asc')
    .orderBy('paper_reviewers.created_at', 'desc');

  const assignmentIds = assignments.map((a) => a.assignment_id);

  const submittedReviews = await knex('reviews')
    .select('paper_reviewer_id')
    .whereIn('paper_reviewer_id', assignmentIds);

  const submittedSet = new Set(submittedReviews.map((r) => r.paper_reviewer_id));

  const assignmentsWithReviewStatus = assignments.map((assignment) => ({
    ...assignment,
    has_submitted_review: submittedSet.has(assignment.assignment_id),
  }));

  return res.status(200).json(assignmentsWithReviewStatus);
};
