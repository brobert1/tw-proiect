export default (paperId, reviewerId) => {
  return [
    {
      paper_id: paperId,
      user_id: reviewerId,
      assignment_status: 'accepted',
    },
  ];
};
