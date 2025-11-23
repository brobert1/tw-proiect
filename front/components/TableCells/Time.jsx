import { format } from 'date-fns';

const Time = ({ value }) => {
  if (!value) return '-';
  return format(new Date(value), 'MMM d, yyyy');
};

export default Time;
