export default (organizerId) => {
  const now = new Date();

  const daysFromNow = (days) => {
    const date = new Date(now);
    date.setDate(date.getDate() + days);
    return date;
  };

  return [
    {
      user_id: organizerId,
      name: 'International Conference on Machine Learning 2024',
      acronym: 'ICML 2024',
      description:
        'The premier gathering of professionals dedicated to the advancement of machine learning.',
      location: 'Vienna, Austria',
      conference_date: daysFromNow(-60),
      topics: JSON.stringify([
        'Machine Learning',
        'Deep Learning',
        'Neural Networks',
        'Reinforcement Learning',
      ]),
      submission_deadline: daysFromNow(-120),
      review_deadline: daysFromNow(-90),
      status: 'completed',
    },
    {
      user_id: organizerId,
      name: 'ACM Conference on Computer-Human Interaction',
      acronym: 'CHI 2025',
      description: 'The premier international conference on Human-Computer Interaction.',
      location: 'Yokohama, Japan',
      conference_date: daysFromNow(60),
      topics: JSON.stringify([
        'HCI',
        'UX Design',
        'Accessibility',
        'User Research',
        'Interactive Systems',
      ]),
      submission_deadline: daysFromNow(-30),
      review_deadline: daysFromNow(30),
      status: 'ongoing',
    },
    {
      user_id: organizerId,
      name: 'IEEE International Conference on Software Engineering',
      acronym: 'ICSE 2026',
      description: 'The flagship conference on software engineering research and practice.',
      location: 'Melbourne, Australia',
      conference_date: daysFromNow(180),
      topics: JSON.stringify([
        'Software Engineering',
        'DevOps',
        'Testing',
        'Code Quality',
        'Agile',
      ]),
      submission_deadline: daysFromNow(60),
      review_deadline: daysFromNow(120),
      status: 'upcoming',
    },
  ];
};
