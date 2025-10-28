import { classnames } from '@lib';

const StepIndicator = ({ step = 1, labels = ['Basics', 'Timeline', 'Review'] }) => {
  return (
    <div className="flex items-start justify-between px-6 pt-4">
      {labels.map((label, idx) => {
        const s = idx + 1;
        return (
          <div key={label} className="relative flex flex-1 flex-col items-center">
            {idx < labels.length - 1 && (
              <div
                className={classnames(
                  'absolute left-[calc(50%+1rem)] right-[calc(-50%+1rem)] top-[15px] h-[2px] -z-10',
                  s < step ? 'bg-blue-600' : 'bg-gray-200'
                )}
              />
            )}
            <div
              className={classnames(
                'flex h-8 w-8 items-center justify-center rounded-full font-semibold',
                s <= step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
              )}
            >
              {s}
            </div>
            <div className="mt-2 text-sm font-medium text-text-primary">{label}</div>
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;
