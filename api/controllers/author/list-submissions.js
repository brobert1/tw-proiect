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
      'conferences.submission_deadline',
      'conferences.review_deadline'
    )
    .leftJoin('conferences', 'papers.conference_id', 'conferences.id')
    .where('papers.user_id', '=', me)
    .orderBy('papers.created_at', 'desc');

  return res.status(200).json(submissions);
};
