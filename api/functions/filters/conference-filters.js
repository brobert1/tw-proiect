export default function (query) {
  const filter = {};

  if (query.name && query.name !== '' && query.name !== 'all') {
    filter.name = query.name;
  }

  if (query.topic && query.topic !== '' && query.topic !== 'all') {
    filter.topic = query.topic;
  }

  return filter;
}
