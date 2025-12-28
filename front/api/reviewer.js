import { axiosAuth } from '@lib';

export const listConferences = () => {
  return axiosAuth.get('reviewer/conferences');
};

export const updateExpertise = (conferenceId, expertise_topics) => {
  return axiosAuth.put(`reviewer/conferences/${conferenceId}/expertise`, { expertise_topics });
};

export const submitReview = (assignmentId, reviewData) => {
  return axiosAuth.post(`reviewer/assignments/${assignmentId}/reviews`, reviewData);
};
