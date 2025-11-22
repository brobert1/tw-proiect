import { knex } from '@db';
import { error } from '@functions';

export default async (req, res) => {
  const { me } = req.user;
  if (!me) {
    throw error(401, 'Unauthorized');
  }

  const { id } = req.params;
  const { title, shortCode, description, location, date, topics, submissionDate, reviewDate } =
    req.body;

  const conference = await knex('conferences')
    .first('id')
    .where('id', '=', id)
    .where('user_id', '=', me);

  if (!conference) {
    throw error(404, 'Conference not found or you do not have permission to edit it');
  }

  const [updatedConference] = await knex('conferences')
    .where('id', '=', id)
    .update({
      name: title,
      acronym: shortCode,
      description: description || null,
      location: location || null,
      conference_date: date ? new Date(date) : null,
      topics: topics ? JSON.stringify(topics) : null,
      submission_deadline: submissionDate ? new Date(submissionDate) : null,
      review_deadline: reviewDate ? new Date(reviewDate) : null,
      updated_at: knex.fn.now(),
    })
    .returning('*');

  return res
    .status(200)
    .json({ data: updatedConference, message: 'Conference updated successfully' });
};
