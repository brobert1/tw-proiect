import { MenuItem } from '@components';
import { LayoutDashboard, Building2, FileSearch } from 'lucide-react';

const ReviewerMenu = () => {
  return (
    <div className="space-y-4">
      <section>
        <h3 className="mb-3 px-2 text-[10px] font-semibold uppercase tracking-wider text-text-secondary">
          Reviewer
        </h3>
        <nav className="space-y-0.5">
          <MenuItem href="/reviewer" icon={LayoutDashboard} level="1">
            Dashboard
          </MenuItem>
          <MenuItem href="/reviewer/conferences" icon={Building2} level="1">
            My Conferences
          </MenuItem>
          <MenuItem href="/reviewer/assigned-papers" icon={FileSearch} level="1">
            Assigned Papers
          </MenuItem>
        </nav>
      </section>
    </div>
  );
};

export default ReviewerMenu;
