import { knex } from '@db';
import { error } from '@functions';

export default async (req, res) => {
  const { me } = req.user;
  if (!me) {
    throw error(401, 'Unauthorized');
  }

  const { id, invitationId } = req.params;

  const conference = await knex('conferences')
    .first('id')
    .where('id', '=', id)
    .where('user_id', '=', me);

  if (!conference) {
    throw error(404, 'Conference not found');
  }

  const trx = await knex.transaction();

  try {
    const invitation = await trx('reviewer_invitations')
      .first('id', 'email', 'status')
      .where('id', '=', invitationId)
      .where('conference_id', '=', id);

    if (!invitation) {
      throw error(404, 'Invitation not found');
    }

    await trx('reviewer_invitations').where('id', '=', invitationId).del();

    const identity = await trx('identities')
      .first('id', 'active')
      .where('email', '=', invitation.email);

    if (identity && !identity.active) {
      const otherInvitations = await trx('reviewer_invitations')
        .first('id')
        .where('email', '=', invitation.email);

      if (!otherInvitations) {
        await trx('identities').where('id', '=', identity.id).del();
      }
    }

    await trx.commit();

    return res.status(200).json({
      message: 'Invitation cancelled successfully',
    });
  } catch (err) {
    await trx.rollback();
    throw err;
  }
};
