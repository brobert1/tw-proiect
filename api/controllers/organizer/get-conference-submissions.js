import { knex } from '@db';
import { error } from '@functions';
import { paperFilters } from '@functions/filters';

export default async (req, res) => {
  const { me } = req.user;
  if (!me) {
    throw error(401, 'Unauthorized');
  }

  const { id } = req.params;

  const conference = await knex('conferences')
    .first('id', 'submission_deadline', 'review_deadline')
    .where('id', '=', id)
    .where('user_id', '=', me);

  if (!conference) {
    throw error(404, 'Conference not found');
  }

  const filter = paperFilters(req.query);

  const latestVersionSubquery = knex('paper_versions')
    .select('paper_id')
    .max('version_number as max_version')
    .groupBy('paper_id')
    .as('latest_versions');

  let query = knex('papers')
    .select(
      'papers.id',
      'papers.title',
      'papers.abstract',
      'papers.status',
      'papers.co_authors',
      'papers.topics',
      'papers.created_at',
      'papers.updated_at',
      'identities.id as author_id',
      'identities.name as author_name',
      'identities.email as author_email',
      'paper_versions.file_url'
    )
    .leftJoin('identities', 'papers.user_id', 'identities.id')
    .leftJoin(latestVersionSubquery, 'papers.id', 'latest_versions.paper_id')
    .leftJoin('paper_versions', function () {
      this.on('papers.id', '=', 'paper_versions.paper_id').andOn(
        'paper_versions.version_number',
        '=',
        'latest_versions.max_version'
      );
    })
    .where('papers.conference_id', '=', id);

  if (filter.search) {
    query = query.where(function () {
      this.where('papers.title', 'ilike', `%${filter.search}%`).orWhere(
        'identities.name',
        'ilike',
        `%${filter.search}%`
      );
    });
  }

  if (filter.status) {
    query = query.where('papers.status', '=', filter.status);
  }

  const submissions = await query.orderBy('papers.created_at', 'desc');

  return res.status(200).json({
    submissions,
    submissionDeadline: conference.submission_deadline,
    reviewDeadline: conference.review_deadline,
  });
};
