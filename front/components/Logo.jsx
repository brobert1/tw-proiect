import { sitename } from '@site.config';

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-text-primary">
        <span className="text-lg font-bold text-white">A</span>
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-text-primary">{sitename}</span>
        <span className="text-xs text-text-tertiary">Enterprise</span>
      </div>
    </div>
  );
};

export default Logo;
