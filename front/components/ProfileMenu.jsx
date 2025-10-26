import { logout } from '@api/identity';
import { useDisclosure, useOnClickOutside } from '@hooks';
import { useRef } from 'react';
import { LogOut } from 'lucide-react';

const ProfileMenu = () => {
  const { hide } = useDisclosure();
  const ref = useRef();
  useOnClickOutside(ref, hide);

  return (
    <div className="w-full">
      <button
        className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-left text-sm text-text-primary transition-colors hover:bg-interactive-bg"
        onClick={logout}
      >
        <LogOut className="h-4 w-4 text-text-secondary" strokeWidth={2} />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default ProfileMenu;
