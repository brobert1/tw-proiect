export default function calculateTopicScore(reviewerTopics = [], paperTopics = []) {
  if (!reviewerTopics || !paperTopics) return 0;

  const reviewerSet = new Set(reviewerTopics.map((t) => t.toLowerCase().trim()));
  return paperTopics.filter((topic) => reviewerSet.has(topic.toLowerCase().trim())).length;
}
