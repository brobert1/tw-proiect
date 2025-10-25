export default (organizerId) => {
  return [
    {
      user_id: organizerId,
      name: 'International Conference on Artificial Intelligence',
      acronym: 'ICAI 2025',
      description: 'A premier conference focusing on the latest advances in AI and machine learning.',
      location: 'San Francisco, CA',
      topics: JSON.stringify(['Artificial Intelligence', 'Machine Learning', 'Deep Learning', 'Natural Language Processing', 'Computer Vision']),
      status: 'open_for_submission',
      submission_deadline: new Date('2025-06-01'),
      review_deadline: new Date('2025-07-01'),
      notification_deadline: new Date('2025-08-01'),
      final_version_deadline: new Date('2025-09-01'),
    },
  ];
};
