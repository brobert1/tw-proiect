const PaperStatusBadge = ({ status }) => {
  const config = {
    submitted: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Submitted' },
    under_review: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Under Review' },
    awaiting_final: { bg: 'bg-orange-100', text: 'text-orange-700', label: 'Awaiting Final' },
    final_submitted: { bg: 'bg-purple-100', text: 'text-purple-700', label: 'Final Submitted' },
    accepted: { bg: 'bg-green-100', text: 'text-green-700', label: 'Accepted' },
    rejected: { bg: 'bg-red-100', text: 'text-red-700', label: 'Rejected' },
  };
  const { bg, text, label } = config[status] || config.submitted;
  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${bg} ${text}`}>
      {label}
    </span>
  );
};

export default PaperStatusBadge;
