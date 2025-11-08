import classNames from '@lib/classnames';

const StatusCard = ({ title, subtitle, badge, badgeColor = 'gray' }) => {
  const badgeColors = {
    green: 'bg-green-50 text-green-700 border-green-200',
    yellow: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    gray: 'bg-gray-50 text-gray-700 border-gray-200',
  };

  return (
    <div className="rounded-lg border border-border-primary bg-white p-4 md:p-6">
      <h3 className="text-sm font-medium text-text-secondary">{title}</h3>
      {badge && (
        <div className="mt-3">
          <span
            className={classNames(
              'inline-flex items-center rounded-md border px-3 py-1 text-xs font-medium uppercase tracking-wide',
              badgeColors[badgeColor] || badgeColors.gray
            )}
          >
            {badge}
          </span>
        </div>
      )}
      {subtitle && <p className="mt-2 text-sm text-text-secondary">{subtitle}</p>}
    </div>
  );
};

export default StatusCard;
