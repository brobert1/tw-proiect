import { knex } from '@db';
import { error } from '@functions';

export default async (req, res) => {
  const { me } = req.user;
  if (!me) {
    throw error(401, 'Unauthorized');
  }

  const { id } = req.params;
  const { expertise_topics } = req.body;

  // Validate expertise_topics is an array
  if (!Array.isArray(expertise_topics)) {
    throw error(400, 'expertise_topics must be an array');
  }

  // Check if the user is a reviewer for this conference
  const reviewerRecord = await knex('conference_reviewers')
    .first('id')
    .where('conference_id', '=', id)
    .where('user_id', '=', me);

  if (!reviewerRecord) {
    throw error(404, 'Conference not found or you are not a reviewer for this conference');
  }

  // Update expertise topics
  await knex('conference_reviewers')
    .update({
      expertise_topics: JSON.stringify(expertise_topics),
      updated_at: knex.fn.now(),
    })
    .where('id', '=', reviewerRecord.id);

  return res.status(200).json({
    message: 'Expertise topics updated successfully',
    expertise_topics,
  });
};
