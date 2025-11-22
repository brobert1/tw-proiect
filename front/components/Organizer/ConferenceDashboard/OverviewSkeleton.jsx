const OverviewSkeleton = () => {
  return (
    <div className="animate-pulse space-y-4 md:space-y-6">
      <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-border-primary bg-white p-4 md:p-6">
          <div className="h-4 w-32 rounded bg-gray-400"></div>
          <div className="mt-3 h-6 w-48 rounded bg-gray-400"></div>
          <div className="mt-2 h-4 w-40 rounded bg-gray-400"></div>
        </div>
        <div className="rounded-lg border border-border-primary bg-white p-4 md:p-6">
          <div className="h-4 w-24 rounded bg-gray-400"></div>
          <div className="mt-4 space-y-3 md:space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-1">
                <div className="h-4 w-36 rounded bg-gray-400"></div>
                <div className="h-4 w-28 rounded bg-gray-400"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <div className="mb-3 h-6 w-32 rounded bg-gray-400 md:mb-4"></div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-lg border border-border-primary bg-white p-4 md:p-6">
              <div className="h-4 w-32 rounded bg-gray-400"></div>
              <div className="mt-3 h-10 w-16 rounded bg-gray-400 md:h-12"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OverviewSkeleton;
