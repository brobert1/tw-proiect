import { Link } from '@components';
import { Calendar, MapPin, Clock, FileText, Users } from 'lucide-react';
import { format } from 'date-fns';
import classNames from '@lib/classnames';

const ConferenceCard = ({ conference }) => {
  const formatDate = (dateString) => {
    if (!dateString) return '—';
    return format(new Date(dateString), 'MMM dd, yyyy');
  };

  const getStatusConfig = () => {
    const status = conference.status;

    const configs = {
      upcoming: {
        color: classNames(
          'inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium border',
          'bg-blue-50 text-blue-700 border-blue-200'
        ),
        text: 'Upcoming',
      },
      ongoing: {
        color: classNames(
          'inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium border',
          'bg-green-50 text-green-700 border-green-200'
        ),
        text: 'Ongoing',
      },
      completed: {
        color: classNames(
          'inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium border',
          'bg-gray-50 text-gray-600 border-gray-200'
        ),
        text: 'Completed',
      },
    };

    return configs[status] || configs.upcoming;
  };

  const statusConfig = getStatusConfig();

  return (
    <div
      className={classNames(
        'group relative overflow-hidden rounded-lg border bg-white shadow-sm transition-all duration-200',
        'border-gray-200 hover:shadow-md hover:border-gray-300'
      )}
    >
      <div className="absolute top-4 right-4">
        <span className={statusConfig.color}>{statusConfig.text}</span>
      </div>
      <div className="p-6 pb-4">
        <div className="mb-3">
          <div className="mb-2 inline-flex items-center rounded-md bg-gray-100 px-3 py-1 text-xs font-medium uppercase text-gray-700">
            {conference.acronym}
          </div>
          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
            {conference.name}
          </h3>
          {conference.description && (
            <p className="mt-2 line-clamp-2 text-sm text-gray-600 leading-relaxed">
              {conference.description}
            </p>
          )}
        </div>
      </div>
      <div className="px-6 pb-4">
        <div className="space-y-3">
          {conference.location && (
            <div className="flex items-center gap-3 text-sm">
              <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0" />
              <span className="text-gray-600">{conference.location}</span>
            </div>
          )}
          {conference.conference_date && (
            <div className="flex items-center gap-3 text-sm">
              <Calendar className="h-4 w-4 text-gray-400 flex-shrink-0" />
              <span className="text-gray-600">
                <span className="font-medium">Conference:</span>
                {formatDate(conference.conference_date)}
              </span>
            </div>
          )}
          {conference.submission_deadline && (
            <div className="flex items-center gap-3 text-sm">
              <FileText className="h-4 w-4 text-gray-400 flex-shrink-0" />
              <span className="text-gray-600">
                <span className="font-medium">Submission:</span>
                {formatDate(conference.submission_deadline)}
              </span>
            </div>
          )}
          {conference.review_deadline && (
            <div className="flex items-center gap-3 text-sm">
              <Clock className="h-4 w-4 text-gray-400 flex-shrink-0" />
              <span className="text-gray-600">
                <span className="font-medium">Review:</span>
                {formatDate(conference.review_deadline)}
              </span>
            </div>
          )}
        </div>
        {conference.topics && conference.topics.length > 0 && (
          <div className="mt-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-4 w-4 text-gray-400" />
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Topics
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {conference.topics.slice(0, 4).map((topic, idx) => (
                <span
                  key={idx}
                  className={classNames(
                    'inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium border',
                    'bg-gray-50 text-gray-700 border-gray-200'
                  )}
                >
                  {topic}
                </span>
              ))}
              {conference.topics.length > 4 && (
                <span
                  className={classNames(
                    'inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium',
                    'bg-gray-100 text-gray-600'
                  )}
                >
                  +{conference.topics.length - 4} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="px-6 pb-6">
        <Link
          href={`/organizer/conferences/${conference.id}`}
          className={classNames(
            'block w-full rounded-md px-4 py-3 text-center text-sm font-medium transition-all duration-200',
            'bg-gray-900 text-white hover:bg-gray-800 hover:shadow-sm'
          )}
        >
          Manage Conference
        </Link>
      </div>
    </div>
  );
};

export default ConferenceCard;
