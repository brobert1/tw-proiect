import { formatDate } from '@functions';
import { User, Tag } from 'lucide-react';

const PaperInfoSection = ({ paper, coAuthors, topics }) => {
  return (
    <>
      <div>
        <h3 className="text-xl font-bold text-gray-900 leading-tight">{paper.title}</h3>
        <p className="mt-2 text-sm text-gray-500">Submitted on {formatDate(paper.created_at)}</p>
      </div>

      <div className="rounded-lg bg-gray-50 p-4">
        <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
          Abstract
        </h4>
        <p className="text-sm text-gray-700 leading-relaxed line-clamp-6">{paper.abstract}</p>
      </div>
      {coAuthors.length > 0 && (
        <div>
          <h4 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
            <User className="h-4 w-4" />
            Co-Authors ({coAuthors.length})
          </h4>
          <div className="space-y-2">
            {coAuthors.map((author, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-3 shadow-sm"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-sm font-medium text-white">
                  {author.name.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900">{author.name}</p>
                  <p className="truncate text-xs text-gray-500">{author.email}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {topics.length > 0 && (
        <div>
          <h4 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
            <Tag className="h-4 w-4" />
            Topics
          </h4>
          <div className="flex flex-wrap gap-2">
            {topics.map((topic) => (
              <span
                key={topic}
                className="rounded-full bg-gradient-to-r from-blue-50 to-blue-100 px-3 py-1.5 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-200"
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
