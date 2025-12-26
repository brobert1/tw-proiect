import { Link } from '@components';
import { formatDate } from '@functions';
import { classnames } from '@lib';
import { Calendar, MapPin, ArrowRight, Clock } from 'lucide-react';

const ConferenceCard = ({ conference }) => {
  const isSubmittable = conference.status === 'upcoming' || conference.status === 'ongoing';

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-white border border-gray-200 p-8 transition-all duration-500 hover:border-gray-300">
      <div className="absolute top-0 right-0 -z-10 h-40 w-40 rounded-full bg-gradient-to-br from-gray-50 to-gray-100 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
      <div className="mb-6 flex items-center justify-between">
        <span className="inline-flex items-center rounded-full bg-gray-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-gray-500 ring-1 ring-inset ring-gray-200 transition-colors group-hover:bg-gray-100 group-hover:text-gray-900 group-hover:ring-gray-300">
          {conference.acronym}
        </span>
        <span className="flex items-center gap-1.5 text-sm font-medium text-gray-500">
          <Calendar className="h-4 w-4 text-gray-400" />
          {formatDate(conference.conference_date)}
        </span>
      </div>
      <h3 className="mb-4 text-2xl font-bold font-display leading-tight text-gray-900 transition-colors group-hover:text-gray-700">
        {conference.name}
      </h3>
      <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
        <MapPin className="h-4 w-4 text-gray-400" />
        {conference.location || 'Online'}
      </div>
      {conference.submission_deadline && (
        <div className="mb-8 flex items-center gap-2 text-sm text-gray-500">
          <Clock className="h-4 w-4 text-gray-400" />
          <span className={classnames(isSubmittable ? 'text-orange-600 font-medium' : '')}>
            Deadline: {formatDate(conference.submission_deadline)}
          </span>
        </div>
      )}
      <div className="mt-auto flex items-center justify-between pt-6 border-t border-gray-100">
        <div className="flex flex-col gap-1">
          {conference.topics && conference.topics.length > 0 ? (
            <div className="text-xs font-medium text-gray-400">
              <span className="text-gray-900 font-bold">{conference.topics.length}</span> topics
              available
            </div>
          ) : null}
          <div className="flex flex-wrap gap-1">
            {conference.topics?.slice(0, 2).map((t, i) => (
              <span
                key={i}
                className="text-[10px] text-gray-500 bg-gray-50 px-2 py-0.5 rounded-full border border-gray-100"
              >
                {t}
              </span>
            ))}
            {conference.topics?.length > 2 && (
              <span className="text-[10px] text-gray-500 px-1">+More</span>
            )}
          </div>
        </div>
        <Link
          href={isSubmittable ? `/author/submit?conferenceId=${conference.id}` : '#'}
          className={classnames(
            'flex h-10 w-10 items-center justify-center rounded-full border shadow-sm transition-all duration-300 group-hover:scale-110',
            isSubmittable
              ? 'border-gray-200 bg-white group-hover:border-gray-900 group-hover:bg-gray-900 group-hover:text-white'
              : 'border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed'
          )}
          title={isSubmittable ? 'Submit Paper' : 'Submissions Closed'}
          onClick={(e) => !isSubmittable && e.preventDefault()}
        >
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

export default ConferenceCard;
