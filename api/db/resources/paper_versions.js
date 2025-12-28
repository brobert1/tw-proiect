export default (paperId) => {
  return [
    {
      paper_id: paperId,
      file_url: 'PENDING_UPLOAD',
      version_number: 1,
      is_final_version: false,
    },
  ];
};
