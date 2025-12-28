import { Download, ExternalLink, FileText } from 'lucide-react';

const PdfPreviewSection = ({ fileUrl }) => {
  return (
    <div className="lg:col-span-3">
      <div className="sticky top-0">
        <div className="mb-3 flex items-center justify-between">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Paper Preview
          </h4>
          {fileUrl && (
            <div className="flex gap-2">
              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-200 transition-colors"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Open
              </a>
              <a
                href={fileUrl}
                download
                className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 transition-colors"
              >
                <Download className="h-3.5 w-3.5" />
                Download
              </a>
            </div>
          )}
        </div>
        {fileUrl ? (
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-gray-900 shadow-lg">
            <iframe src={fileUrl} title="Paper PDF" className="h-[600px] w-full" />
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
  );
};

export default PdfPreviewSection;
