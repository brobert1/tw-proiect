const ConferenceStatusBadge = ({ status }) => {
  const config = {
    upcoming: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Upcoming' },
    ongoing: { bg: 'bg-green-100', text: 'text-green-700', label: 'Ongoing' },
    completed: { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Completed' },
  };
  const { bg, text, label } = config[status] || config.upcoming;
  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${bg} ${text}`}>
      {label}
    </span>
  );
};

export default ConferenceStatusBadge;
