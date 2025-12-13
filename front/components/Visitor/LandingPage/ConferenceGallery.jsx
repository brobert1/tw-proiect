import { ArrowUpRight } from 'lucide-react';
import { Link, Loading, QueryError } from '@components';
import { useQuery } from '@hooks';
import { format } from 'date-fns';
import ConferenceCard from './ConferenceCard';

const ConferenceGallery = () => {
  const { data: conferences, status } = useQuery('public/conferences');

  if (status === 'error') {
    return (
      <section id="events" className="py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <QueryError title="Failed to load conferences" />
        </div>
      </section>
    );
  }

  if (status === 'pending') {
    return (
      <section id="events" className="py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Loading message="Loading conferences..." />
        </div>
      </section>
    );
  }

  const formattedConferences = conferences.map((conf) => ({
    id: conf.id,
    title: conf.name,
    date: conf.conference_date
      ? format(new Date(conf.conference_date), 'MMM dd, yyyy')
      : 'Date TBA',
    location: conf.location || 'Location TBA',
    category: conf.topics?.[0] || 'General',
    attendees: Math.floor(Math.random() * 5000) + 500, // Hardcoded for now as requested
  }));

  return (
    <section id="events" className="py-24 bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12 space-y-1">
          <h2 className="text-3xl font-bold font-display text-gray-900">Upcoming Events</h2>
          <p className="text-gray-500">Explore trusted events curated for you.</p>
        </div>
        {formattedConferences.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-4 rounded-full bg-gray-100 p-4">
              <ArrowUpRight size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">No conferences yet</h3>
            <p className="text-gray-500">Check back soon for upcoming events.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {formattedConferences.map((conf) => (
                <ConferenceCard key={conf.id} conf={conf} />
              ))}
            </div>
            <div className="mt-20 flex justify-center">
              <Link
                href="/login"
                className="group relative flex items-center gap-2 rounded-full border border-gray-200 bg-white px-8 py-3.5 text-sm font-bold text-gray-900 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md hover:border-gray-300 active:translate-y-0"
              >
                Load more events
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ConferenceGallery;
