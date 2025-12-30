import { MenuItem } from '@components';
import { LayoutDashboard, Calendar } from 'lucide-react';

const OrganizerMenu = () => {
  return (
    <div className="space-y-4">
      <section>
        <h3 className="mb-3 px-2 text-[10px] font-semibold uppercase tracking-wider text-text-secondary">
          Organizer
        </h3>
        <nav className="space-y-0.5">
          <MenuItem href="/organizer" icon={LayoutDashboard} level="1">
            Dashboard
          </MenuItem>
          <MenuItem href="/organizer/conferences" icon={Calendar} level="1">
            Conferences
          </MenuItem>
        </nav>
      </section>
    </div>
  );
};

export default OrganizerMenu;
