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
