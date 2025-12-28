const PaperInfoSection = ({ paper, topics }) => {
  return (
    <>
      <div>
        <h3 className="text-xl font-bold text-gray-900 leading-tight">{paper.title}</h3>
        <p className="mt-1 text-sm text-gray-500">
          {paper.conference_name} ({paper.conference_acronym})
        </p>
      </div>
      <div className="rounded-lg bg-gray-50 p-4">
        <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
          Abstract
        </h4>
        <p className="text-sm text-gray-700 leading-relaxed">
          {paper.abstract || 'No abstract provided'}
        </p>
      </div>
      {topics.length > 0 && (
        <div>
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
            Topics
          </h4>
          <div className="flex flex-wrap gap-2">
            {topics.map((topic) => (
              <span
                key={topic}
                className="rounded-full bg-gradient-to-r from-blue-50 to-blue-100 px-3 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-200"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default PaperInfoSection;
