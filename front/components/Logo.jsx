import { sitename } from '@site.config';

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-md overflow-hidden bg-transparent">
        <img src="/images/CElogo.png" alt={sitename} className="h-full w-full object-cover" />
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-text-primary">{sitename}</span>
      </div>
    </div>
  );
};

export default Logo;
