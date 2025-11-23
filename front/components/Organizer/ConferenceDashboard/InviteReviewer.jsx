import { useState } from 'react';
import { Button } from '@components';
import { inviteReviewer } from '@api/organizer';
import { useMutation } from '@hooks';

const InviteReviewer = ({ conferenceId, refetch }) => {
  const [email, setEmail] = useState('');

  const inviteReviewerMutation = useMutation((data) => inviteReviewer(conferenceId, data), {
    successCallback: async () => {
      setEmail('');
      await refetch();
    },
  });

  const handleInvite = () => {
    inviteReviewerMutation.mutate({ email });
  };

  return (
    <div className="rounded-lg border border-border-primary bg-white p-4 md:p-6">
      <h3 className="mb-4 text-base font-semibold text-text-primary md:mb-6">
        Invite New Reviewer
      </h3>
      <div className="flex flex-col gap-3 md:flex-row md:gap-4">
        <div className="flex-1">
          <label htmlFor="reviewerEmail" className="block text-sm font-medium text-text-primary">
            Reviewer Email
          </label>
          <input
            type="email"
            id="reviewerEmail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="prof@example.com"
            className="input mt-2 block w-full"
          />
        </div>
        <div className="flex md:items-end">
          <Button
            onClick={handleInvite}
            disabled={inviteReviewerMutation.isPending}
            className="w-full rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 md:w-auto"
          >
            Send Invitation
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InviteReviewer;
