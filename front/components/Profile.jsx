import { ProfileLoading, ProfileMenu, ProfileSuccess } from '@components';
import { useDisclosure, useOnClickOutside, useProfile } from '@hooks';
import { useRef } from 'react';
import { User, ChevronUp, ChevronDown } from 'lucide-react';

const Profile = ({ compact = false }) => {
  const { status, me } = useProfile();

  const { isOpen, hide, toggle } = useDisclosure();
  const ref = useRef();
  useOnClickOutside(ref, hide);

  if (compact) {
    return (
      <div ref={ref} className="relative">
        <div className="flex cursor-pointer items-center gap-3" onClick={toggle} role="button">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-text-secondary">
            <User className="h-4 w-4 text-white" strokeWidth={2} />
          </div>
          <div className="flex flex-1 flex-col overflow-hidden">
            {status === 'pending' && <ProfileLoading />}
            {status === 'success' && (
              <>
                <span className="truncate text-sm font-semibold text-text-primary">
                  {me?.name || 'User'}
                </span>
                <span className="truncate text-xs text-text-tertiary first-letter:uppercase">
                  {me?.role || ''}
                </span>
              </>
            )}
          </div>
          {isOpen ? (
            <ChevronUp className="h-4 w-4 text-text-secondary" strokeWidth={2} />
          ) : (
            <ChevronDown className="h-4 w-4 text-text-secondary" strokeWidth={2} />
          )}
        </div>
        {isOpen && (
          <div className="absolute bottom-[calc(100%+0.5rem)] left-0 right-0 w-full rounded-lg border border-border-primary bg-white shadow-lg">
            <ProfileMenu />
          </div>
        )}
      </div>
    );
  }
  return (
    <div ref={ref} className="relative flex items-center gap-4">
      <div
        className="hidden cursor-pointer items-center space-x-2 md:flex"
        onClick={toggle}
        role="button"
      >
        <div className="flex items-center gap-2">
          {status === 'pending' && <ProfileLoading />}
          {status === 'success' && <ProfileSuccess {...me} />}
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
            <User className="h-5 w-5 text-white" strokeWidth={2} />
          </div>
        </div>
        {isOpen ? (
          <ChevronUp className="h-4 w-4 text-gray-600" strokeWidth={2} />
        ) : (
          <ChevronDown className="h-4 w-4 text-gray-600" strokeWidth={2} />
        )}
      </div>
      {isOpen && (
        <div className="absolute right-2 top-12 z-50 rounded-lg bg-white shadow-xl">
          <ProfileMenu />
        </div>
      )}
    </div>
  );
};

export default Profile;
