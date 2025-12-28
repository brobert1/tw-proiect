import ModalHeader from './PaperDetailsModal/ModalHeader';
import PaperInfoSection from './PaperDetailsModal/PaperInfoSection';
import PdfPreviewSection from './PaperDetailsModal/PdfPreviewSection';
import ReviewsCarousel from './PaperDetailsModal/ReviewsCarousel';

const PaperDetailsModal = ({ open, onClose, paper }) => {
  if (!open || !paper) return null;

  const topics = typeof paper.topics === 'string' ? JSON.parse(paper.topics) : paper.topics || [];
  const coAuthors =
    typeof paper.co_authors === 'string' ? JSON.parse(paper.co_authors) : paper.co_authors || [];
  const reviews = paper.reviews || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl">
        <ModalHeader paper={paper} onClose={onClose} />
        <div className="flex-1 overflow-y-auto">
          <div className="grid gap-6 p-6 lg:grid-cols-5">
            <div className="space-y-6 lg:col-span-2">
              <PaperInfoSection paper={paper} coAuthors={coAuthors} topics={topics} />
              {reviews.length > 0 && <ReviewsCarousel reviews={reviews} />}
            </div>
            <PdfPreviewSection fileUrl={paper.file_url} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaperDetailsModal;
