import { knex } from '@db';
import { error } from '@functions';

export default async (req, res) => {
  const { me } = req.user;
  if (!me) {
    throw error(401, 'Unauthorized');
  }

  const { id } = req.params;

  const conference = await knex('conferences')
    .first('id', 'status', 'submission_deadline', 'review_deadline', 'conference_date')
    .where('id', '=', id)
    .where('user_id', '=', me);

  if (!conference) {
    throw error(404, 'Conference not found');
  }

  const [totalSubmissions, reviewersAccepted, reviewsCompleted] = await Promise.all([
    knex('papers')
      .count('* as count')
      .where('conference_id', '=', id)
      .first()
      .then((result) => parseInt(result?.count || 0)),

    knex('reviewer_invitations')
      .count('* as count')
      .where('conference_id', '=', id)
      .where('status', '=', 'accepted')
      .first()
      .then((result) => parseInt(result?.count || 0)),

    knex('reviews')
      .count('* as count')
      .whereIn('paper_id', function () {
        this.select('id').from('papers').where('conference_id', '=', id);
      })
      .where('status', '=', 'submitted')
      .first()
      .then((result) => parseInt(result?.count || 0))
      .catch(() => 0),
  ]);

  const data = {
    status: conference.status,
    submission_deadline: conference.submission_deadline,
    review_deadline: conference.review_deadline,
    conference_date: conference.conference_date,
    stats: {
      totalSubmissions,
      reviewersAccepted,
      reviewsCompleted,
    },
  };

  return res.status(200).json(data);
};
