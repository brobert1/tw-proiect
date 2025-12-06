import { formatDate } from '@functions';
import { Calendar } from 'lucide-react';

const DateRow = ({ title, date }) => (
  <div className="flex items-start gap-3">
    <div className="rounded-lg bg-gray-100 p-2">
      <Calendar className="h-4 w-4 text-gray-600" />
    </div>
    <div>
      <p className="text-sm font-medium text-gray-900">{title}</p>
      <p className="text-sm text-gray-500">{formatDate(date)}</p>
    </div>
  </div>
);

export default DateRow;
