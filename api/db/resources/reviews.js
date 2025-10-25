export default (paperReviewerId) => {
  return [
    {
      paper_reviewer_id: paperReviewerId,
      recommendation: 'accept',
      feedback_for_author: 'This is a well-written paper with solid contributions. The methodology is sound and the results are convincing. I recommend minor revisions to improve the clarity of Section 3.',
      confidential_comments: 'The author should be encouraged to submit to the main track.',
    },
  ];
};
