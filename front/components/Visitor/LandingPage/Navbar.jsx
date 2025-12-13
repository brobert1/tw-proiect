import { Link } from '@components';
import { Globe } from 'lucide-react';

const Navbar = ({ scrolled }) => (
  <nav
    className={`fixed top-0 z-50 w-full transition-all duration-300 ${scrolled ? 'bg-white/70 backdrop-blur-xl shadow-sm border-b border-white/20 py-3' : 'bg-transparent backdrop-blur-[2px] py-5'}`}
  >
    <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-gray-900 to-gray-800 text-white shadow-lg">
          <Globe size={20} strokeWidth={2.5} />
        </div>
        <span className="text-xl font-bold font-display tracking-tight text-gray-900">ConfEra</span>
      </div>
      <div className="hidden items-center gap-8 md:flex">
        {['Explore', 'Organizers', 'Community'].map((item) => (
          <Link
            key={item}
            href="#"
            className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
          >
            {item}
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <Link
          href="/login"
          className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
        >
          Log in
        </Link>
        <Link
          href="/signup"
          className="rounded-full bg-gray-900 px-6 py-2.5 text-sm font-bold text-white shadow-lg hover:bg-gray-800 transition-all hover:scale-105 hover:shadow-xl"
        >
          Sign Up
        </Link>
      </div>
    </div>
  </nav>
);

export default Navbar;
