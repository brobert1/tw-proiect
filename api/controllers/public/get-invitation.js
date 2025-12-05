import { knex } from '@db';
import { error } from '@functions';

export default async (req, res) => {
  const { token } = req.params;
  if (!token) {
    throw error(400, 'Missing invitation token');
  }

  const invitation = await knex('invitation_tokens')
    .join('reviewer_invitations', 'invitation_tokens.invitation_id', 'reviewer_invitations.id')
    .first(
      'reviewer_invitations.id',
      'reviewer_invitations.conference_id',
      'reviewer_invitations.email',
      'reviewer_invitations.status',
      'invitation_tokens.expires_at'
    )
    .where('invitation_tokens.token', '=', token);

  if (!invitation) {
    throw error(404, 'Invitation not found');
  }

  if (new Date() > new Date(invitation.expires_at)) {
    throw error(410, 'Invitation expired');
  }

  const conference = await knex('conferences')
    .first('id', 'name', 'acronym', 'location', 'conference_date')
    .where('id', '=', invitation.conference_id);

  if (!conference) {
    throw error(404, 'Conference not found');
  }

  const identity = await knex('identities')
    .first('id', 'last_login_at')
    .where('email', '=', invitation.email);

  return res.status(200).json({
    email: invitation.email,
    status: invitation.status,
    identity_last_login_at: identity?.last_login_at || null,
    conference,
  });
};
