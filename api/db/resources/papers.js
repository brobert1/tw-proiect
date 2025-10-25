export default (authorId, conferenceId) => {
  return [
    {
      user_id: authorId,
      conference_id: conferenceId,
      title: 'Advanced Neural Networks for Image Recognition',
      abstract: 'This paper presents a novel approach to image recognition using deep convolutional neural networks with attention mechanisms.',
      topics: JSON.stringify(['Deep Learning', 'Computer Vision', 'Neural Networks']),
      status: 'submitted',
      co_authors: JSON.stringify([
        { name: 'Dr. Jane Smith', email: 'jane.smith@university.edu' },
        { name: 'Prof. Bob Johnson', email: 'bob.j@tech.edu' }
      ]),
    },
    {
      user_id: authorId,
      conference_id: conferenceId,
      title: 'Natural Language Processing with Transformer Models',
      abstract: 'An exploration of transformer architectures for various NLP tasks including sentiment analysis and machine translation.',
      topics: JSON.stringify(['Natural Language Processing', 'Machine Learning', 'Deep Learning']),
      status: 'under_review',
      co_authors: JSON.stringify([]),
    },
  ];
};
