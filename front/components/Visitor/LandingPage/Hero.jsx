import { Link } from '@components';
import { Search, MapPin } from 'lucide-react';

const FadeIn = ({ children, className = '' }) => <div className={className}>{children}</div>;

const Hero = () => (
  <div className="relative flex min-h-[90vh] flex-col justify-center overflow-hidden bg-white pt-20">
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)] opacity-70"></div>
      <div className="absolute -top-[10%] -left-[10%] w-[500px] h-[500px] bg-purple-200 rounded-full mix-blend-multiply filter blur-[80px] opacity-40 animate-blob"></div>
      <div className="absolute top-[20%] -right-[10%] w-[500px] h-[500px] bg-blue-200 rounded-full mix-blend-multiply filter blur-[80px] opacity-40 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-[20%] left-[20%] w-[500px] h-[500px] bg-indigo-200 rounded-full mix-blend-multiply filter blur-[80px] opacity-40 animate-blob animation-delay-4000"></div>
    </div>
    <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-gray-50 via-white/40 to-transparent z-0 pointer-events-none"></div>
    <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <FadeIn>
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/70 px-4 py-1.5 text-sm font-medium text-gray-600 shadow-sm backdrop-blur-md transition-colors hover:border-gray-300">
            <span className="flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span>Live: 500+ new events added</span>
          </div>
        </FadeIn>
        <FadeIn>
          <h1 className="mb-8 text-5xl font-extrabold font-display leading-[1.1] text-gray-900 sm:text-7xl">
            The marketplace for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600">
              professional events.
            </span>
          </h1>
        </FadeIn>
        <FadeIn>
          <p className="mb-12 text-xl leading-relaxed text-gray-500 sm:max-w-2xl sm:mx-auto">
            Connect, learn, and grow. The easiest way to find and book your next conference
            experience.
          </p>
        </FadeIn>
        <FadeIn>
          <div className="mx-auto flex max-w-3xl transform flex-col gap-2 rounded-2xl bg-white/90 p-2 shadow-2xl shadow-gray-200/50 ring-1 ring-gray-200 backdrop-blur-sm sm:flex-row">
            <div className="flex flex-1 items-center gap-3 rounded-xl px-4 py-4 transition-colors hover:bg-gray-50/50">
              <Search className="h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search events..."
                className="w-full bg-transparent text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none"
              />
            </div>
            <div className="hidden h-auto w-px bg-gray-200 sm:block my-2"></div>
            <div className="flex flex-1 items-center gap-3 rounded-xl px-4 py-4 transition-colors hover:bg-gray-50/50">
              <MapPin className="h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Location"
                className="w-full bg-transparent text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none"
              />
            </div>
            <Link
              href="/login"
              className="flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-8 py-4 text-sm font-bold text-white transition-all hover:bg-gray-800 hover:scale-[1.02]"
            >
              Explore
            </Link>
          </div>
        </FadeIn>
      </div>
    </div>
  </div>
);

export default Hero;
