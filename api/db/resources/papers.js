export const paperTemplatesForCompleted = [
  {
    title: 'Transformer-based Models for Time Series Forecasting',
    abstract:
      'We propose a novel transformer architecture specifically designed for time series data, achieving state-of-the-art results on multiple benchmarks.',
    topics: JSON.stringify(['Machine Learning', 'Deep Learning', 'Neural Networks']),
    status: 'accepted',
    co_authors: JSON.stringify([{ name: 'Dr. Alice Chen', email: 'alice@stanford.edu' }]),
  },
  {
    title: 'Federated Learning with Differential Privacy Guarantees',
    abstract:
      'This paper presents a privacy-preserving federated learning framework with formal differential privacy guarantees.',
    topics: JSON.stringify(['Machine Learning', 'Privacy', 'Distributed Systems']),
    status: 'accepted',
    co_authors: JSON.stringify([]),
  },
  {
    title: 'Limitations of Current Reinforcement Learning in Real-World Robotics',
    abstract:
      'An empirical study showing the gap between simulation and real-world performance in RL-based robotics.',
    topics: JSON.stringify(['Reinforcement Learning', 'Robotics']),
    status: 'rejected',
    co_authors: JSON.stringify([{ name: 'Prof. James Wilson', email: 'jwilson@mit.edu' }]),
  },
];

export const paperTemplatesForOngoing = [
  {
    title: 'Designing Accessible Voice Interfaces for Elderly Users',
    abstract:
      'A comprehensive study on voice UI design patterns that improve accessibility for users aged 65 and above.',
    topics: JSON.stringify(['HCI', 'Accessibility', 'UX Design']),
    status: 'under_review',
    co_authors: JSON.stringify([{ name: 'Dr. Sarah Kim', email: 'skim@uw.edu' }]),
  },
  {
    title: 'Gesture-Based Interaction in Virtual Reality Environments',
    abstract:
      'Evaluating the effectiveness of various gesture recognition systems for VR interaction.',
    topics: JSON.stringify(['HCI', 'Interactive Systems', 'VR']),
    status: 'under_review',
    co_authors: JSON.stringify([]),
  },
  {
    title: 'The Impact of Dark Patterns on User Trust',
    abstract:
      'A large-scale user study examining how dark patterns in UI design affect long-term user trust and retention.',
    topics: JSON.stringify(['UX Design', 'User Research', 'Ethics']),
    status: 'awaiting_final',
    co_authors: JSON.stringify([
      { name: 'Dr. Emily Zhang', email: 'ezhang@berkeley.edu' },
      { name: 'Prof. Michael Brown', email: 'mbrown@cmu.edu' },
    ]),
  },
];

export const paperTemplatesForUpcoming = [
  {
    title: 'AI-Assisted Code Review: A Comparative Study',
    abstract:
      'Comparing the effectiveness of various AI tools for automated code review in enterprise settings.',
    topics: JSON.stringify(['Software Engineering', 'Code Quality', 'AI']),
    status: 'submitted',
    co_authors: JSON.stringify([{ name: 'John Developer', email: 'jdev@google.com' }]),
  },
  {
    title: 'Continuous Deployment Strategies for Microservices',
    abstract:
      'Best practices and patterns for implementing CD pipelines in microservice architectures.',
    topics: JSON.stringify(['DevOps', 'Software Engineering', 'Testing']),
    status: 'submitted',
    co_authors: JSON.stringify([]),
  },
];

export default (authorId, conferenceId) => {
  return [
    ...paperTemplatesForCompleted,
    ...paperTemplatesForOngoing,
    ...paperTemplatesForUpcoming,
  ].map((paper) => ({
    ...paper,
    user_id: authorId,
    conference_id: conferenceId,
  }));
};
