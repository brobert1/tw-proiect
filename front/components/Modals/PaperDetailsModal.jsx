import {
  X,
  FileText,
  User,
  Tag,
  Clock,
  CheckCircle,
  AlertCircle,
  Download,
  ExternalLink,
} from 'lucide-react';
import { Button } from '@components';
import { formatDate } from '@functions';

const statusConfig = {
  submitted: { label: 'Submitted', icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50' },
  under_review: {
    label: 'Under Review',
    icon: Clock,
    color: 'text-yellow-600',
    bg: 'bg-yellow-50',
  },
  accepted: { label: 'Accepted', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
  rejected: { label: 'Rejected', icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50' },
  revisions_required: {
    label: 'Revisions Required',
    icon: AlertCircle,
    color: 'text-orange-600',
    bg: 'bg-orange-50',
  },
};

const PaperDetailsModal = ({ open, onClose, paper }) => {
  if (!open || !paper) return null;

  const config = statusConfig[paper.status] || statusConfig.submitted;
  const StatusIcon = config.icon;
  const topics = typeof paper.topics === 'string' ? JSON.parse(paper.topics) : paper.topics || [];
  const coAuthors =
    typeof paper.co_authors === 'string' ? JSON.parse(paper.co_authors) : paper.co_authors || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
              <FileText className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Paper Details</h2>
              <p className="text-sm text-gray-500">Version {paper.version || 1}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium ${config.bg} ${config.color}`}
            >
              <StatusIcon className="h-4 w-4" />
              {config.label}
            </span>
            <Button
              onClick={onClose}
              className="rounded-lg p-2 hover:bg-gray-200 transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </Button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className="grid gap-6 p-6 lg:grid-cols-5">
            <div className="space-y-6 lg:col-span-2">
              <div>
                <h3 className="text-xl font-bold text-gray-900 leading-tight">{paper.title}</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Submitted on {formatDate(paper.created_at)}
                </p>
              </div>

              <div className="rounded-lg bg-gray-50 p-4">
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Abstract
                </h4>
                <p className="text-sm text-gray-700 leading-relaxed line-clamp-6">
                  {paper.abstract}
                </p>
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
                          <p className="truncate text-sm font-medium text-gray-900">
                            {author.name}
                          </p>
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
            </div>
            <div className="lg:col-span-3">
              <div className="sticky top-0">
                <div className="mb-3 flex items-center justify-between">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Paper Preview
                  </h4>
                  {paper.file_url && (
                    <div className="flex gap-2">
                      <a
                        href={paper.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-200 transition-colors"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        Open
                      </a>
                      <a
                        href={paper.file_url}
                        download
                        className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 transition-colors"
                      >
                        <Download className="h-3.5 w-3.5" />
                        Download
                      </a>
                    </div>
                  )}
                </div>
                {paper.file_url ? (
                  <div className="overflow-hidden rounded-xl border border-gray-200 bg-gray-900 shadow-lg">
                    <iframe src={paper.file_url} title="Paper PDF" className="h-[600px] w-full" />
                  </div>
                ) : (
                  <div className="flex h-64 items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50">
                    <div className="text-center">
                      <FileText className="mx-auto h-10 w-10 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-500">No file available</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaperDetailsModal;
