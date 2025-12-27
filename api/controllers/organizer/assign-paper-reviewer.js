import { knex } from '@db';
import { error } from '@functions';

export default async (req, res) => {
  const { me } = req.user;
  if (!me) {
    throw error(401, 'Unauthorized');
  }

  const { id, paperId } = req.params;
  const { reviewerId } = req.body;

  if (!reviewerId) {
    throw error(400, 'Reviewer ID is required');
  }

  const conference = await knex('conferences')
    .first('id')
    .where('id', '=', id)
    .where('user_id', '=', me);

  if (!conference) {
    throw error(404, 'Conference not found');
  }

  const paper = await knex('papers')
    .first('id', 'status')
    .where('id', '=', paperId)
    .where('conference_id', '=', id);

  if (!paper) {
    throw error(404, 'Paper not found');
  }

  const conferenceReviewer = await knex('conference_reviewers')
    .first('id')
    .where('conference_id', '=', id)
    .where('user_id', '=', reviewerId);

  if (!conferenceReviewer) {
    throw error(400, 'Reviewer is not part of this conference');
  }

  const existingAssignment = await knex('paper_reviewers')
    .first('id')
    .where('paper_id', '=', paperId)
    .where('user_id', '=', reviewerId);

  if (existingAssignment) {
    throw error(400, 'Reviewer is already assigned to this paper');
  }

  const [assignment] = await knex('paper_reviewers')
    .insert({
      paper_id: paperId,
      user_id: reviewerId,
      assignment_status: 'accepted',
      created_at: knex.fn.now(),
    })
    .returning('*');

  const reviewer = await knex('identities')
    .first('id', 'name', 'email')
    .where('id', '=', reviewerId);

  return res.status(201).json({
    message: 'Reviewer assigned successfully',
    assignment: {
      ...assignment,
      name: reviewer.name,
      email: reviewer.email,
    },
  });
};
