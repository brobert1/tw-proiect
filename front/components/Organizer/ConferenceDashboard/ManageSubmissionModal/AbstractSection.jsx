import { Download } from 'lucide-react';

const AbstractSection = ({ abstract, fileUrl }) => {
  const handleDownload = () => {
    if (fileUrl) {
      window.open(fileUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="rounded-lg border border-border-primary bg-gray-50 p-4 md:p-6">
      <h3 className="mb-3 text-base font-semibold text-text-primary">Abstract</h3>
      <p className="text-sm leading-relaxed text-text-secondary">{abstract}</p>
      <button
        type="button"
        onClick={handleDownload}
        disabled={!fileUrl}
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md border border-border-primary bg-white px-4 py-2 text-sm font-medium text-text-primary hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 md:w-auto"
      >
        <Download className="h-4 w-4" />
        Download Paper PDF
      </button>
    </div>
  );
};

export default AbstractSection;
