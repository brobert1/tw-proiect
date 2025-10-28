export default function (query) {
  const filter = {};

  if (query.name && query.name !== '' && query.name !== 'all') {
    filter.name = query.name;
  }

  return filter;
}
