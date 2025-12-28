import { axiosAuth } from '@lib';

export const submitPaper = async (conferenceId, formData) => {
  const data = new FormData();
  data.append('conferenceId', conferenceId);
  data.append('title', formData.title);
  data.append('abstract', formData.abstract);
  data.append('topics', JSON.stringify(formData.topics || []));
  data.append('coAuthors', JSON.stringify(formData.coAuthors || []));
  data.append('file', formData.file);

  return await axiosAuth.post('/author/papers', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const uploadFinalVersion = async (paperId, file) => {
  const data = new FormData();
  data.append('file', file);

  return await axiosAuth.put(`/author/papers/${paperId}/final`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
