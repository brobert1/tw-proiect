export default function (query) {
  const filter = {};

  if (query.search && query.search !== '') {
    filter.search = query.search;
  }

  if (query.status && query.status !== '' && query.status !== 'all') {
    filter.status = query.status;
  }

  return filter;
}
