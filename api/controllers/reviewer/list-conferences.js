import { knex } from '@db';
import { error } from '@functions';

export default async (req, res) => {
  const { me } = req.user;
  if (!me) {
    throw error(401, 'Unauthorized');
  }

  // Get all conferences where the user is a reviewer (accepted invitation)
  const conferences = await knex('conference_reviewers')
    .select(
      'conferences.id',
      'conferences.name',
      'conferences.acronym',
      'conferences.description',
      'conferences.location',
      'conferences.conference_date',
      'conferences.topics',
      'conferences.submission_deadline',
      'conferences.review_deadline',
      'conferences.status',
      'conferences.created_at',
      'conference_reviewers.expertise_topics',
      'conference_reviewers.created_at as joined_at'
    )
    .innerJoin('conferences', 'conference_reviewers.conference_id', 'conferences.id')
    .where('conference_reviewers.user_id', '=', me)
    .orderBy('conferences.created_at', 'desc');

  return res.status(200).json(conferences);
};
