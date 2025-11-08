import { Calendar } from 'lucide-react';

const DateCard = ({ title, date }) => {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2 text-sm text-text-secondary">
        <Calendar className="h-4 w-4" />
        <span className="font-medium">{title}</span>
      </div>
      <p className="text-sm text-text-primary">{date}</p>
    </div>
  );
};

export default DateCard;
