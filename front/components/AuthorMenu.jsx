import { MenuItem } from '@components';
import { LayoutDashboard, Search, FileText } from 'lucide-react';

const AuthorMenu = () => {
  return (
    <div className="space-y-4">
      <section>
        <h3 className="mb-3 px-2 text-[10px] font-semibold uppercase tracking-wider text-text-secondary">
          Author
        </h3>
        <nav className="space-y-0.5">
          <MenuItem href="/author" icon={LayoutDashboard} level="1">
            Dashboard
          </MenuItem>
          <MenuItem href="/author/conferences" icon={Search} level="1">
            Discover Conferences
          </MenuItem>
          <MenuItem href="/author/submissions" icon={FileText} level="1">
            My Submissions
          </MenuItem>
        </nav>
      </section>
    </div>
  );
};

export default AuthorMenu;
