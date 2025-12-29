import { knex } from '@db';
import { conferenceFilters } from '@functions/filters';

export default async (req, res) => {
  const filter = conferenceFilters(req.query);

  let query = knex('conferences')
    .select(
      'id',
      'name',
      'acronym',
      'description',
      'location',
      'conference_date',
      'topics',
      'submission_deadline',
      'review_deadline',
      'status',
      'created_at'
    )
    .where('status', '=', 'upcoming');

  if (filter.name) {
    query = query.where(function () {
      this.where('name', 'ilike', `%${filter.name}%`)
        .orWhere('acronym', 'ilike', `%${filter.name}%`)
        .orWhere('location', 'ilike', `%${filter.name}%`);
    });
  }

  if (filter.topic) {
    query = query.whereRaw('topics @> ?', [JSON.stringify([filter.topic])]);
  }

  const conferences = await query.orderBy('submission_deadline', 'asc');

  return res.status(200).json(conferences);
};
