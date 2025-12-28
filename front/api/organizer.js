import { axiosAuth } from '@lib';

export const createConference = (data) => {
  return axiosAuth.post('organizer/create-conference', data);
};

export const updateConference = (id, data) => {
  return axiosAuth.put(`organizer/conferences/${id}`, data);
};

export const deleteConference = (id) => {
  return axiosAuth.delete(`organizer/conferences/${id}`);
};

export const inviteReviewer = (id, data) =>
  axiosAuth.post(`/organizer/conferences/${id}/invite-reviewer`, data);

export const cancelReviewerInvitation = (conferenceId, invitationId) =>
  axiosAuth.delete(`/organizer/conferences/${conferenceId}/reviewers/invitations/${invitationId}`);

export const assignPaperReviewer = (conferenceId, paperId, reviewerId) =>
  axiosAuth.post(`/organizer/conferences/${conferenceId}/papers/${paperId}/reviewers`, {
    reviewerId,
  });

export const updatePaperDecision = (conferenceId, paperId, decision) =>
  axiosAuth.put(`/organizer/conferences/${conferenceId}/papers/${paperId}/decision`, {
    decision,
  });
