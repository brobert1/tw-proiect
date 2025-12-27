import { MapPin } from 'lucide-react';
import { DateRow } from '.';

const ConferenceSidebar = ({ conference }) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <h2 className="mb-4 text-lg font-semibold text-gray-900">Key Dates</h2>
      <div className="space-y-4">
        <DateRow title="Conference Date" date={conference.conference_date} />
        <DateRow title="Submission Deadline" date={conference.submission_deadline} />
        <DateRow title="Review Deadline" date={conference.review_deadline} />
      </div>
      <hr className="my-6 border-gray-200" />
      <h3 className="mb-3 text-sm font-semibold text-gray-900">Location</h3>
      <div className="flex items-start gap-3">
        <div className="rounded-lg bg-gray-100 p-2">
          <MapPin className="h-4 w-4 text-gray-600" />
        </div>
        <p className="text-sm text-gray-600">{conference.location || 'Location not specified'}</p>
      </div>
    </div>
  );
};

export default ConferenceSidebar;
