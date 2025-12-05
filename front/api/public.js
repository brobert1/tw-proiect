import { axios } from '@lib';

export const getInvitation = (token) => {
  return axios.get(`/public/reviewer-invitation/${token}`);
};

export const respondInvitation = (token, status) => {
  return axios.post(`/public/reviewer-invitation/${token}/respond`, { status });
};

export const setPassword = (token, data) => {
  return axios.post(`/public/reviewer-invitation/${token}/set-password`, data);
};
