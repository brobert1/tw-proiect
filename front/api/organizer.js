import { axiosAuth } from '@lib';

export const createConference = (data) => {
  return axiosAuth.post('organizer/create-conference', data);
};
