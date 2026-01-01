import { CheckCircle, Clock, FileText, XCircle } from 'lucide-react';

const STATUS_CONFIG = [
  { key: 'submitted', label: 'Submitted', icon: FileText, color: 'text-blue-600 bg-blue-50' },
  {
    key: 'under_review',
    label: 'Under Review',
    icon: Clock,
    color: 'text-yellow-600 bg-yellow-50',
  },
  {
    key: 'awaiting_final',
    label: 'Awaiting Final',
    icon: Clock,
    color: 'text-orange-600 bg-orange-50',
  },
  {
    key: 'final_submitted',
    label: 'Final Submitted',
    icon: FileText,
    color: 'text-purple-600 bg-purple-50',
  },
  { key: 'accepted', label: 'Accepted', icon: CheckCircle, color: 'text-green-600 bg-green-50' },
  { key: 'rejected', label: 'Rejected', icon: XCircle, color: 'text-red-600 bg-red-50' },
];

const PaperStatusOverview = ({ papersByStatus }) => (
  <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
    <h2 className="mb-6 text-lg font-semibold text-gray-900">Paper Status Overview</h2>
    <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
      {STATUS_CONFIG.map(({ key, label, icon: Icon, color }) => (
        <div key={key} className={`rounded-lg p-4 ${color.split(' ')[1]}`}>
          <div className="flex items-center gap-2">
            <Icon className={`h-5 w-5 ${color.split(' ')[0]}`} />
            <span className={`text-2xl font-bold ${color.split(' ')[0]}`}>
              {papersByStatus?.[key] || 0}
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-600">{label}</p>
        </div>
      ))}
    </div>
  </div>
);

export default PaperStatusOverview;
