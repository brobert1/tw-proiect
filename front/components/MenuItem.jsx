import { Link } from '@components';
import { classnames } from '@lib';
import { useRouter } from 'next/router';

const MenuItem = ({ href, children, icon: Icon, level = 1 }) => {
  const router = useRouter();
  const { pathname } = router;
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={classnames(
        'group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-text-primary no-underline transition-colors',
        'hover:bg-interactive-bg',
        isActive && 'bg-interactive-bg',
        level === 1 ? '' : 'pl-6'
      )}
    >
      {Icon && (
        <Icon
          className="h-4 w-4 text-text-secondary transition-colors group-hover:text-text-primary"
          strokeWidth={2}
        />
      )}
      <span>{children}</span>
    </Link>
  );
};

export default MenuItem;
