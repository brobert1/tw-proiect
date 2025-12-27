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

    paperWithVersion = {
      ...paper,
      file_url: latestVersion?.file_url || null,
      version: latestVersion?.version_number || null,
    };
  }

  return res.status(200).json({
    ...conference,
    paper: paperWithVersion,
  });
};
