export const reviewTemplates = [
  {
    recommendation: 'strong_accept',
    feedback_for_author: 'Excellent work! This paper makes a significant contribution to the field. The methodology is rigorous and the results are compelling. Minor suggestions: clarify the limitations section.',
    confidential_comments: 'This is one of the best papers I have reviewed this cycle. Strongly recommend acceptance.',
  },
  {
    recommendation: 'accept',
    feedback_for_author: 'This is a well-written paper with solid contributions. The methodology is sound and the results are convincing. I recommend minor revisions to improve the clarity of the related work section.',
    confidential_comments: 'Good paper, should be accepted with minor revisions.',
  },
  {
    recommendation: 'weak_accept',
    feedback_for_author: 'The paper presents interesting ideas but needs more thorough evaluation. Please add more baseline comparisons and address the scalability concerns.',
    confidential_comments: 'Borderline paper. Ideas are interesting but execution could be stronger.',
  },
  {
    recommendation: 'weak_reject',
    feedback_for_author: 'While the problem is relevant, the approach lacks novelty. The experimental evaluation is insufficient to support the claims. Major revisions needed.',
    confidential_comments: 'Not ready for publication. Suggest rejection with encouragement to resubmit after major revisions.',
  },
  {
    recommendation: 'reject',
    feedback_for_author: 'The paper does not meet the standards for this venue. The methodology has significant flaws and the results are not reproducible based on the provided information.',
    confidential_comments: 'Clear reject. Fundamental issues with the approach.',
  },
];

export default (paperReviewerId) => {
  const template = reviewTemplates[Math.floor(Math.random() * reviewTemplates.length)];
  return [
    {
      paper_reviewer_id: paperReviewerId,
      ...template,
    },
  ];
};
