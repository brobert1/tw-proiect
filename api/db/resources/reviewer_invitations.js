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
      email: 'dwight@email.com',
      invitation_token: randomHash(),
      status: 'pending',
    },
  ];
};
