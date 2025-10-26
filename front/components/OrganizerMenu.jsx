import { MenuItem } from '@components';
import {
  LayoutDashboard,
  Calendar,
  Plus,
  Users,
  FileText,
  Settings,
  BarChart,
  Mail,
} from 'lucide-react';

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
            My Conferences
          </MenuItem>
          <MenuItem href="/organizer/create" icon={Plus} level="1">
            Create Conference
          </MenuItem>
        </nav>
      </section>
      <section>
        <h3 className="mb-3 px-2 text-[10px] font-semibold uppercase tracking-wider text-text-secondary">
          Management
        </h3>
        <nav className="space-y-0.5">
          <MenuItem href="/organizer/reviewers" icon={Users} level="1">
            Manage Reviewers
          </MenuItem>
          <MenuItem href="/organizer/submissions" icon={FileText} level="1">
            Paper Submissions
          </MenuItem>
          <MenuItem href="/organizer/invitations" icon={Mail} level="1">
            Send Invitations
          </MenuItem>
        </nav>
      </section>
      <section>
        <h3 className="mb-3 px-2 text-[10px] font-semibold uppercase tracking-wider text-text-secondary">
          Analytics
        </h3>
        <nav className="space-y-0.5">
          <MenuItem href="/organizer/statistics" icon={BarChart} level="1">
            Statistics
          </MenuItem>
          <MenuItem href="/organizer/settings" icon={Settings} level="1">
            Conference Settings
          </MenuItem>
        </nav>
      </section>
    </div>
  );
};

export default OrganizerMenu;
