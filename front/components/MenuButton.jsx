import React from 'react';
import { Menu } from 'lucide-react';

const MenuButton = () => {
  return (
    <div
      className="ml-2 inline-block rounded border border-border-primary bg-white px-2 py-1 text-text-primary xl:hidden"
      aria-label="Open menu"
    >
      <label htmlFor="menu" className="mb-0 flex cursor-pointer items-center gap-1 text-text-primary">
        <Menu className="h-4 w-4" strokeWidth={2} />
        <span className="text-sm">Menu</span>
      </label>
    </div>
  );
};

export default MenuButton;
