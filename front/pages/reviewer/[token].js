import { useMutation, useQuery } from '@hooks';
import { Button, Logo } from '@components';
import { useRouter } from 'next/router';
import { respondInvitation } from '@api/public';

const Page = () => {
  const r = useRouter();
  const token = r.query?.token;

  const { data: invitation, isError, isPending } = useQuery(`/public/reviewer-invitation/${token}`);

  const acceptMutation = useMutation(() => respondInvitation(token, 'accepted'), {
    successCallback: (data) => {
      const next = data?.next;
      if (next === 'login') {
        r.push('/login').catch(() => {});
      } else {
        r.push(`/reviewer/setup/${token}`).catch(() => {});
      }
    },
  });

  const declineMutation = useMutation(() => respondInvitation(token, 'declined'), {
    redirectOnSuccess: '/',
  });

  if (invitation?.status === 'accepted') {
    r.replace(`/reviewer/setup/${token}`).catch(() => {});
    return null;
  }

  const conference = invitation?.conference;

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white p-8">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-text-primary">Invitation Invalid</h1>
          <p className="mt-2 text-sm text-text-secondary">
            This invitation is no longer valid or has expired.
          </p>
          <Button className="button primary mt-6" onClick={() => r.push('/')}>
            Go Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <div className="relative flex flex-1 flex-col items-center justify-center bg-white p-8">
        <div className="absolute left-6 top-6">
          <Logo />
        </div>
        <div className="w-full max-w-[480px]">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-text-primary">Reviewer Invitation</h1>
            {conference ? (
              <p className="mt-2 text-sm text-text-secondary">
                You have been invited to review for <strong>{conference.name}</strong>
                {conference.acronym ? ` (${conference.acronym})` : ''}.
              </p>
            ) : (
              <p className="mt-2 text-sm text-text-secondary">Loading invitation details...</p>
            )}
          </div>
          <div className="space-y-4 rounded border border-border-primary bg-content-bg p-4">
            <p className="text-sm text-text-secondary">
              Please accept or decline this invitation. If you accept and you don't have an account,
              you will be prompted to complete it.
            </p>
            <div className="flex gap-3">
              <Button
                className="button full primary flex-1 justify-center"
                disabled={acceptMutation.isPending || declineMutation.isPending || isPending}
                onClick={() => acceptMutation.mutate()}
              >
                {acceptMutation.isPending ? 'Accepting...' : 'Accept'}
              </Button>
              <Button
                className="button full flex-1 justify-center border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                disabled={acceptMutation.isPending || declineMutation.isPending || isPending}
                onClick={() => declineMutation.mutate()}
              >
                {declineMutation.isPending ? 'Declining...' : 'Decline'}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:flex flex-1 relative overflow-hidden">
        <img
          src="/images/conference.jpg"
          alt="conference"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent"></div>
      </div>
    </div>
  );
};

export default Page;
