import { knex } from '@db';
import { error } from '@functions';

export default async (req, res) => {
  const { me } = req.user;
  if (!me) {
    throw error(401, 'Unauthorized');
  }

  const { id } = req.params;

  // Check if the user is a reviewer for this conference
  const reviewerRecord = await knex('conference_reviewers')
    .first('id', 'expertise_topics', 'created_at as joined_at')
    .where('conference_id', '=', id)
    .where('user_id', '=', me);

  if (!reviewerRecord) {
    throw error(404, 'Conference not found or you are not a reviewer for this conference');
  }

  // Get conference details
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
    .where('id', '=', id);

  if (!conference) {
    throw error(404, 'Conference not found');
  }

  return res.status(200).json({
    ...conference,
    expertise_topics: reviewerRecord.expertise_topics || [],
    joined_at: reviewerRecord.joined_at,
  });
};
