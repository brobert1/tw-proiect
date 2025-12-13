import { useState, useEffect } from 'react';
import {
  Navbar,
  Hero,
  ConferenceGallery,
  Newsletter,
  Footer,
} from '@components/Visitor/LandingPage';

const Page = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className="min-h-screen bg-white font-body text-gray-900 selection:bg-primary/20 selection:text-primary">
        <Navbar scrolled={scrolled} />
        <main>
          <Hero />
          <ConferenceGallery />
          <Newsletter />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Page;
