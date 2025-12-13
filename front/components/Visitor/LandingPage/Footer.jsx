import { Link } from '@components';
import { Globe, Twitter, Linkedin, Facebook } from 'lucide-react';

const Footer = () => (
  <footer className="border-t border-gray-100 bg-white pt-16 pb-8">
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5 mb-16">
        <div className="col-span-2 lg:col-span-2 pr-8">
          <div className="mb-6 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Globe size={18} />
            </div>
            <span className="text-xl font-bold font-display tracking-tight text-gray-900">
              ConfEra
            </span>
          </div>
          <p className="mb-6 text-sm text-gray-500 leading-relaxed">
            ConfEra is the premier global marketplace for professional events. We connect ambitious
            individuals with life-changing knowledge and networking opportunities.
          </p>
          <div className="flex gap-4">
            <a
              href="#"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 text-gray-400 transition-all hover:bg-gray-900 hover:text-white hover:scale-110"
            >
              <Twitter size={18} />
            </a>
            <a
              href="#"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 text-gray-400 transition-all hover:bg-gray-900 hover:text-white hover:scale-110"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="#"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 text-gray-400 transition-all hover:bg-gray-900 hover:text-white hover:scale-110"
            >
              <Facebook size={18} />
            </a>
          </div>
        </div>
        <div>
          <h4 className="mb-6 text-sm font-bold text-gray-900 uppercase tracking-wider">
            Discover
          </h4>
          <ul className="space-y-4 text-sm text-gray-500">
            <li>
              <Link href="#" className="hover:text-primary transition-colors">
                Featured Events
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-primary transition-colors">
                Online Workshops
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-primary transition-colors">
                Cities
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-primary transition-colors">
                Groups
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="mb-6 text-sm font-bold text-gray-900 uppercase tracking-wider">Company</h4>
          <ul className="space-y-4 text-sm text-gray-500">
            <li>
              <Link href="#" className="hover:text-primary transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-primary transition-colors">
                Careers
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-primary transition-colors">
                Blog
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-primary transition-colors">
                Press
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="mb-6 text-sm font-bold text-gray-900 uppercase tracking-wider">
            Resources
          </h4>
          <ul className="space-y-4 text-sm text-gray-500">
            <li>
              <Link href="#" className="hover:text-primary transition-colors">
                Help Center
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-primary transition-colors">
                For Organizers
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-primary transition-colors">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-primary transition-colors">
                Terms
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-gray-400">
          &copy; {new Date().getFullYear()} ConfEra Inc. All rights reserved.
        </p>
        <div className="flex gap-6 text-xs text-gray-400">
          <Link href="#" className="hover:text-gray-900">
            Privacy Policy
          </Link>
          <Link href="#" className="hover:text-gray-900">
            Terms of Service
          </Link>
          <Link href="#" className="hover:text-gray-900">
            Cookies Settings
          </Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
