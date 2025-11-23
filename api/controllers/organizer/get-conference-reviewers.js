import { knex } from '@db';
import { error } from '@functions';

export default async (req, res) => {
  const { me } = req.user;
  if (!me) {
    throw error(401, 'Unauthorized');
  }

  const { id } = req.params;

  const conference = await knex('conferences')
    .first('id')
    .where('id', '=', id)
    .where('user_id', '=', me);

  if (!conference) {
    throw error(404, 'Conference not found');
  }

  const invitations = await knex('reviewer_invitations')
    .select(
      'reviewer_invitations.id',
      'reviewer_invitations.email',
      'reviewer_invitations.status',
      'reviewer_invitations.created_at',
      'identities.id as reviewer_id',
      'identities.name as reviewer_name'
    )
    .leftJoin('identities', 'reviewer_invitations.email', 'identities.email')
    .where('reviewer_invitations.conference_id', '=', id)
    .orderBy('reviewer_invitations.created_at', 'desc');

  const accepted = invitations.filter((inv) => inv.status === 'accepted');
  const pendingOrRejected = invitations.filter(
    (inv) => inv.status === 'pending' || inv.status === 'declined'
  );

  if (accepted.length > 0) {
    const reviewerIds = accepted.map((inv) => inv.reviewer_id).filter(Boolean);

    if (reviewerIds.length > 0) {
      const reviewersData = await knex('conference_reviewers')
        .select('user_id', 'expertise_topics')
        .where('conference_id', '=', id)
        .whereIn('user_id', reviewerIds);

      const topicsByReviewer = reviewersData.reduce((acc, reviewer) => {
        acc[reviewer.user_id] = reviewer.expertise_topics || [];
        return acc;
      }, {});
      accepted.forEach((inv) => {
        if (inv.reviewer_id) {
          inv.expertise_topics = topicsByReviewer[inv.reviewer_id] || [];
        } else {
          inv.expertise_topics = [];
        }
      });
    }
  }

  return res.status(200).json({
    accepted,
    pendingOrRejected,
  });
};
