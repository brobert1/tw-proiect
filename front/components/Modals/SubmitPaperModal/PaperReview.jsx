import { useFormContext } from 'react-hook-form';
import { FileText, User, Tag, Edit2 } from 'lucide-react';
import { Button } from '@components';

const PaperReview = ({ onGoToStep }) => {
  const { watch } = useFormContext();
  const title = watch('title');
  const abstract = watch('abstract');
  const coAuthors = watch('coAuthors') || [];
  const topics = watch('topics') || [];
  const file = watch('file');

  const formatFileSize = (bytes) => {
    if (!bytes) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const Section = ({ title, icon: Icon, onEdit, children }) => (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-gray-500" />
          <h4 className="font-medium text-gray-900">{title}</h4>
        </div>
        {onEdit && (
          <Button
            type="button"
            onClick={onEdit}
            className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
          >
            <Edit2 className="h-3 w-3" />
            Edit
          </Button>
        )}
      </div>
      {children}
    </div>
  );

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Review Your Submission</h3>
        <p className="mt-1 text-sm text-gray-500">
          Please review your paper details before submitting.
        </p>
      </div>
      <Section title="Paper Information" icon={FileText} onEdit={() => onGoToStep(1)}>
        <div className="space-y-3">
          <div>
            <p className="text-xs font-medium uppercase text-gray-500">Title</p>
            <p className="text-sm text-gray-900">{title || 'Not provided'}</p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase text-gray-500">Abstract</p>
            <p className="text-sm text-gray-600 line-clamp-3">{abstract || 'Not provided'}</p>
          </div>
        </div>
      </Section>
      {coAuthors.length > 0 && (
        <Section title="Co-Authors" icon={User} onEdit={() => onGoToStep(1)}>
          <div className="space-y-2">
            {coAuthors.map((author, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm">
                <span className="font-medium text-gray-900">{author.name}</span>
                <span className="text-gray-500">({author.email})</span>
                {author.affiliation && (
                  <span className="text-gray-400">- {author.affiliation}</span>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}
      <Section title="Selected Topics" icon={Tag} onEdit={() => onGoToStep(2)}>
        {topics.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {topics.map((topic) => (
              <span
                key={topic}
                className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800"
              >
                {topic}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No topics selected</p>
        )}
      </Section>
      <Section title="Uploaded File" icon={FileText} onEdit={() => onGoToStep(3)}>
        {file ? (
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
              <FileText className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{file.name}</p>
              <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
            </div>
          </div>
        ) : (
          <p className="text-sm text-red-600">No file uploaded</p>
        )}
      </Section>
    </div>
  );
};

export default PaperReview;
