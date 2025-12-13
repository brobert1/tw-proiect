import { Button, Link } from '@components';

const Newsletter = () => (
  <section className="py-24 bg-white">
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 shadow-2xl rounded-3xl sm:rounded-3xl sm:px-24 xl:py-32">
        <h2 className="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-white sm:text-4xl font-display">
          Don't miss the next big event
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-lg leading-8 text-gray-300">
          Join our newsletter to get weekly updates on the hottest conferences and exclusive
          early-bird discounts.
        </p>
        <form className="mx-auto mt-10 flex max-w-md gap-x-4">
          <label htmlFor="email-address" className="sr-only">
            Email address
          </label>
          <input
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="min-w-0 flex-auto rounded-xl border-0 bg-white/5 cubic-bezier(0.4, 0, 0.2, 1) px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6 placeholder:text-gray-400"
            placeholder="Enter your email"
          />
          <Button
            type="submit"
            className="flex-none rounded-xl bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all transform hover:scale-105"
          >
            Subscribe
          </Button>
        </form>
        <p className="mt-4 text-center text-xs text-gray-400">
          We care about your data in our{' '}
          <Link href="#" className="underline hover:text-white transition-colors">
            privacy policy
          </Link>
          .
        </p>
        <svg
          viewBox="0 0 1024 1024"
          className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 font-display [mask-image:radial-gradient(closest-side,white,transparent)]"
          aria-hidden="true"
        >
          <circle cx={512} cy={512} r={512} fill="url(#gradient)" fillOpacity="0.15" />
          <defs>
            <radialGradient id="gradient">
              <stop stopColor="#fff" />
              <stop offset={1} stopColor="#fff" />
            </radialGradient>
          </defs>
        </svg>
      </div>
    </div>
  </section>
);

export default Newsletter;
