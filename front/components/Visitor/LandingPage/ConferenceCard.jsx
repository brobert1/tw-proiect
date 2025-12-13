import { Link } from '@components';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';

const ConferenceCard = ({ conf }) => (
  <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-white border border-gray-200 p-8 transition-all duration-500 hover:shadow-2xl hover:border-gray-300">
    <div className="absolute top-0 right-0 -z-10 h-40 w-40 rounded-full bg-gradient-to-br from-gray-50 to-gray-100 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
    <div className="mb-6 flex items-center justify-between">
      <span className="inline-flex items-center rounded-full bg-gray-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-gray-500 ring-1 ring-inset ring-gray-200 transition-colors group-hover:bg-gray-100 group-hover:text-gray-900 group-hover:ring-gray-300">
        {conf.category}
      </span>
      <span className="flex items-center gap-1.5 text-sm font-medium text-gray-500">
        <Calendar className="h-4 w-4 text-gray-400" />
        {conf.date}
      </span>
    </div>
    <h3 className="mb-4 text-2xl font-bold font-display leading-tight text-gray-900 transition-colors group-hover:text-gray-700">
      {conf.title}
    </h3>
    <div className="mb-8 flex items-center gap-2 text-sm text-gray-500">
      <MapPin className="h-4 w-4 text-gray-400" />
      {conf.location}
    </div>
    <div className="mt-auto flex items-center justify-between pt-6 border-t border-gray-100">
      <div className="flex items-center gap-3">
        <div className="flex -space-x-3">
          {[...Array(3)].map((_, i) => (
            <img
              key={i}
              src={`https://i.pravatar.cc/100?img=${conf.id * 5 + i}`}
              alt="Attendee"
              className="h-8 w-8 rounded-full border-2 border-white bg-gray-100 shadow-sm object-cover"
            />
          ))}
        </div>
        <div className="text-xs font-medium text-gray-400">
          <span className="text-gray-900 font-bold">
            +{conf.attendees > 1000 ? '1k' : conf.attendees}
          </span>{' '}
          interested
        </div>
      </div>
      <Link
        href="/login"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition-all duration-300 group-hover:border-gray-900 group-hover:bg-gray-900 group-hover:text-white group-hover:scale-110"
      >
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  </div>
);

export default ConferenceCard;
