import { cancelReviewerInvitation } from '@api/organizer';
import { ActionModal, Button } from '@components';
import { useDisclosure, useMutation } from '@hooks';
import { useRouter } from 'next/router';

const PendingActionsCell = ({ row, table }) => {
  const { isOpen, show, hide } = useDisclosure();

  const router = useRouter();
  const { id } = router.query;
  const status = row.original.status;

  const cancelMutation = useMutation(() => cancelReviewerInvitation(id, row.original.id), {
    successCallback: () => {
      hide();
      if (table.options.meta?.refetch) {
        table.options.meta.refetch();
      }
    },
  });

  if (status !== 'pending') {
    return <span className="text-gray-400">N/A</span>;
  }

  return (
    <>
      <Button
        onClick={show}
        className="rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 disabled:opacity-50"
      >
        Cancel
      </Button>
      <ActionModal
        isOpen={isOpen}
        hide={hide}
        title="Cancel Invitation"
        confirmText="Yes, Cancel"
        onConfirm={() => cancelMutation.mutate()}
        isLoading={cancelMutation.isLoading}
        variant="danger"
      >
        Are you sure you want to cancel this invitation? This action cannot be undone.
      </ActionModal>
    </>
  );
};

export default PendingActionsCell;
