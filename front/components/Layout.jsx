import { Menu, MenuButton } from '@components';
import { ChevronRight } from 'lucide-react';

const Layout = ({ title, children }) => {
  return (
    <div className="flex min-h-screen bg-content-bg font-body text-sm">
      <Menu />
      <main className="ml-0 w-full lg:ml-[280px] lg:w-[calc(100%-280px)]">
        <header className="flex min-h-16 items-center border-b border-border-primary px-6 py-4">
          <nav className="hidden flex-1 items-center gap-2 md:flex">
            <span className="text-sm text-text-secondary">Building Your Application</span>
            <ChevronRight className="h-3 w-3 text-text-tertiary" strokeWidth={2} />
            <span className="text-sm font-medium text-text-primary">{title}</span>
          </nav>
          <div className="flex flex-1 md:hidden">
            <span className="text-sm font-medium text-text-primary">{title}</span>
          </div>
          <MenuButton />
        </header>
        <div className="p-6">
          <div className="grid gap-4">{children}</div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
