export default (organizerId) => {
  return [
    {
      user_id: organizerId,
      name: 'International Conference on Artificial Intelligence',
      acronym: 'ICAI 2025',
      description: 'A premier conference focusing on the latest advances in AI and machine learning.',
      location: 'San Francisco, CA',
      conference_date: new Date('2025-09-15'),
      topics: JSON.stringify(['Artificial Intelligence', 'Machine Learning', 'Deep Learning', 'Natural Language Processing', 'Computer Vision']),
      submission_deadline: new Date('2025-06-01'),
      review_deadline: new Date('2025-07-01'),
    },
  ];
};
