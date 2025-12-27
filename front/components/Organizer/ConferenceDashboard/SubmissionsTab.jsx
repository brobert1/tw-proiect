import { useState } from 'react';
import { useDebounce, useDisclosure, useQuery } from '@hooks';
import SubmissionsFilters from './SubmissionsFilters';
import SubmissionsTable from './SubmissionsTable';
import ManageSubmissionModal from './ManageSubmissionModal';

const SubmissionsTab = ({ conferenceId }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const debouncedSearch = useDebounce(searchQuery, 500);

  const { isOpen, show, hide } = useDisclosure();
  const [selectedPaper, setSelectedPaper] = useState(null);

  const { data, status } = useQuery(`organizer/conferences/${conferenceId}/submissions`, {
    search: debouncedSearch,
    status: statusFilter,
  });

  const submissions = data?.submissions || [];
  const submissionDeadline = data?.submissionDeadline;
  const reviewDeadline = data?.reviewDeadline;

  const handleManageClick = (submission) => {
    const paperDetails = {
      ...submission,
      fileUrl: submission.file_url,
      mainAuthor: submission.author_name,
      coAuthors: submission.co_authors || [],
    };

    setSelectedPaper(paperDetails);
    show();
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <SubmissionsFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
      />
      <SubmissionsTable data={submissions} status={status} onManageClick={handleManageClick} />
      <ManageSubmissionModal
        open={isOpen}
        onClose={hide}
        paper={selectedPaper}
        conferenceId={conferenceId}
        submissionDeadline={submissionDeadline}
        reviewDeadline={reviewDeadline}
      />
    </div>
  );
};

export default SubmissionsTab;
