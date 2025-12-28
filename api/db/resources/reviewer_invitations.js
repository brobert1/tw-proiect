import { randomHash } from '../../functions';

export default (conferenceId) => {
  return [
    {
      conference_id: conferenceId,
      email: 'jim@email.com',
      invitation_token: randomHash(),
      status: 'accepted',
    },
    {
      conference_id: conferenceId,
      email: 'angela@email.com',
      invitation_token: randomHash(),
      status: 'accepted',
    },
    {
      conference_id: conferenceId,
      email: 'oscar@email.com',
      invitation_token: randomHash(),
      status: 'pending',
    },
    {
      conference_id: conferenceId,
      email: 'kevin@email.com',
      invitation_token: randomHash(),
      status: 'declined',
    },
  ];
};
