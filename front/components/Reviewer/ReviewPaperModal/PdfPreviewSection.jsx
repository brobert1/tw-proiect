import { Download, ExternalLink, FileText } from 'lucide-react';

const PdfPreviewSection = ({ pdfUrl }) => {
  return (
    <div className="lg:col-span-3 flex flex-col max-h-[calc(90vh-120px)]">
      <div className="mb-3 flex items-center justify-between flex-shrink-0">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500">
          Paper Preview
        </h4>
        <div className="flex gap-2">
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-200 transition-colors"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Open
          </a>
          <a
            href={pdfUrl}
            download
            className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 transition-colors"
          >
            <Download className="h-3.5 w-3.5" />
            Download
          </a>
        </div>
      </div>
      {pdfUrl ? (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-gray-900 shadow-lg flex-1 min-h-0">
          <iframe src={pdfUrl} title="Paper PDF" className="h-full w-full" />
        </div>
      ) : (
        <div className="flex flex-1 min-h-64 items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50">
          <div className="text-center">
            <FileText className="mx-auto h-10 w-10 text-gray-400" />
            <p className="mt-2 text-sm text-gray-500">No file available</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PdfPreviewSection;
