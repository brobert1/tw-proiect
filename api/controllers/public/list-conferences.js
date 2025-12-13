import { knex } from '@db';

export default async (req, res) => {
  const conferences = await knex('conferences')
    .select(
      'id',
      'name',
      'acronym',
      'description',
      'location',
      'conference_date',
      'topics',
      'created_at'
    )
    .orderBy('created_at', 'desc');

  return res.status(200).json(conferences);
};
