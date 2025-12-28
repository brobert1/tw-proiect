import { checkAuth, withAuth } from '@auth';
import { Layout } from '@components';
import { AssignedPapersTable, ReviewPaperModal } from '@components/Reviewer';
import { useDisclosure, useQuery } from '@hooks';
import { useState } from 'react';

const Page = () => {
  const { data, status } = useQuery('/reviewer/assigned-papers');
  const { isOpen, show, hide } = useDisclosure();
  const [selectedPaper, setSelectedPaper] = useState(null);

  const handleReviewClick = (paper) => {
    setSelectedPaper(paper);
    show();
  };

  const handleCloseModal = () => {
    hide();
    setSelectedPaper(null);
  };

  return (
    <Layout title="Assigned Papers">
      <div className="rounded-lg border border-gray-200 bg-white">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">My Assigned Papers</h2>
          <p className="mt-1 text-sm text-gray-500">
            Papers assigned to you for review. Click &quot;Review&quot; to view details and submit
            your review.
          </p>
        </div>
        <div className="overflow-x-auto">
          <AssignedPapersTable data={data} status={status} onReviewClick={handleReviewClick} />
        </div>
      </div>
      <ReviewPaperModal open={isOpen} onClose={handleCloseModal} paper={selectedPaper} />
    </Layout>
  );
};

export async function getServerSideProps(context) {
  return await checkAuth(context);
}

export default withAuth(Page);
