export default (reviewerId, conferenceId) => {
  return [
    {
      user_id: reviewerId,
      conference_id: conferenceId,
      expertise_topics: JSON.stringify(['Artificial Intelligence', 'Machine Learning', 'Deep Learning']),
    },
  ];
};
