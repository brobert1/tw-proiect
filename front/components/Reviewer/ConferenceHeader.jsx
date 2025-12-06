import { classnames } from '@lib';

const statusColors = {
  upcoming: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
  ongoing: { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200' },
  completed: { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200' },
};

const ConferenceHeader = ({ name, acronym, status }) => {
  const statusStyle = statusColors[status] || statusColors.upcoming;

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{name}</h1>
          <p className="mt-1 text-lg text-gray-500">{acronym}</p>
        </div>
        <span
          className={classnames(
            'inline-flex items-center rounded-md border px-3 py-1 text-xs font-medium uppercase',
            statusStyle.bg,
            statusStyle.text,
            statusStyle.border
          )}
        >
          {status}
        </span>
      </div>
    </div>
  );
};

export default ConferenceHeader;
