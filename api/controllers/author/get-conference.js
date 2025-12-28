import { knex } from '@db';
import { error } from '@functions';

export default async (req, res) => {
  const { me } = req.user;
  if (!me) {
    throw error(401, 'Unauthorized');
  }

  const { id } = req.params;

  const conference = await knex('conferences')
    .first(
      'id',
      'name',
      'acronym',
      'description',
      'location',
      'conference_date',
      'topics',
      'submission_deadline',
      'review_deadline',
      'status'
    )
    .where('id', '=', id)
    .whereIn('status', ['upcoming', 'ongoing']);

  if (!conference) {
    throw error(404, 'Conference not found or not accepting submissions');
  }

  const paper = await knex('papers')
    .first('id', 'title', 'abstract', 'topics', 'co_authors', 'status', 'created_at')
    .where('user_id', '=', me)
    .where('conference_id', '=', id);

  let paperWithVersion = null;
  if (paper) {
    const latestVersion = await knex('paper_versions')
      .first('id', 'file_url', 'version_number', 'created_at')
      .where('paper_id', '=', paper.id)
      .orderBy('version_number', 'desc');

    const reviews = await knex('reviews')
      .select(
        'reviews.id',
        'reviews.recommendation',
        'reviews.feedback_for_author',
        'reviews.submitted_at'
      )
      .leftJoin('paper_reviewers', 'reviews.paper_reviewer_id', 'paper_reviewers.id')
      .where('paper_reviewers.paper_id', '=', paper.id)
      .orderBy('reviews.submitted_at', 'desc');

    paperWithVersion = {
      ...paper,
      file_url: latestVersion?.file_url || null,
      version: latestVersion?.version_number || null,
      reviews,
    };
  }

  return res.status(200).json({
    ...conference,
    paper: paperWithVersion,
  });
};
