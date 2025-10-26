import { MenuItem } from '@components';
import {
  LayoutDashboard,
  Inbox,
  FileSearch,
  MessageSquare,
  CheckSquare,
  Calendar,
} from 'lucide-react';

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
          <MenuItem href="/reviewer/invitations" icon={Inbox} level="1">
            Review Invitations
          </MenuItem>
          <MenuItem href="/reviewer/assigned" icon={FileSearch} level="1">
            Assigned Papers
          </MenuItem>
          <MenuItem href="/reviewer/reviews" icon={MessageSquare} level="1">
            My Reviews
          </MenuItem>
        </nav>
      </section>
      <section>
        <h3 className="mb-3 px-2 text-[10px] font-semibold uppercase tracking-wider text-text-secondary">
          Activity
        </h3>
        <nav className="space-y-0.5">
          <MenuItem href="/reviewer/completed" icon={CheckSquare} level="1">
            Completed Reviews
          </MenuItem>
          <MenuItem href="/reviewer/deadlines" icon={Calendar} level="1">
            Upcoming Deadlines
          </MenuItem>
        </nav>
      </section>
    </div>
  );
};

export default ReviewerMenu;
