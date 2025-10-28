import { knex } from '@db';
import { error } from '@functions';
import { conferenceFilters } from '@functions/filters';

export default async (req, res) => {
  const { me } = req.user;
  if (!me) {
    throw error(401, 'Unauthorized');
  }

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
      'created_at',
      'updated_at'
    )
    .where('user_id', '=', me);

  if (filter.name) {
    query = query.where('name', 'ilike', `%${filter.name}%`);
  }

  const conferences = await query.orderBy('created_at', 'desc');

  return res.status(200).json(conferences);
};
