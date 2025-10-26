import { Logo, Pages, Profile } from '@components';
import { useSwipeable, useProfile } from '@hooks';

const Menu = () => {
  const { inputRef, navRef, onTouchStart, onTouchMove, onTouchEnd } = useSwipeable();
  const { me, status } = useProfile();

  // Determine user role from profile
  const userRole = status === 'success' && me?.role ? me.role : null;

  return (
    <>
      <input type="checkbox" id="menu" className="hidden" ref={inputRef} />
      <label
        htmlFor="menu"
        className="backdrop fixed inset-0 z-40 h-screen w-screen bg-gray-900/50 lg:hidden"
      />
      <nav
        className="nav-menu fixed left-0 top-0 z-50 h-screen w-[280px] border-r border-border-primary bg-sidebar-bg"
        ref={navRef}
        onTouchStart={(e) => onTouchStart(e.touches[0].clientX)}
        onTouchMove={(e) => onTouchMove(e.touches[0].clientX)}
        onTouchEnd={onTouchEnd}
      >
        <div className="flex h-full flex-col justify-between overflow-y-auto">
          <div className="flex-1 overflow-y-auto">
            <div className="border-b border-border-primary px-6 py-4">
              <Logo />
            </div>
            <div className="px-4 py-4">
              <Pages role={userRole} />
            </div>
          </div>
          <div className="border-t border-border-primary p-4">
            <Profile compact />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Menu;
