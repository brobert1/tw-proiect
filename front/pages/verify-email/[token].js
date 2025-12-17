import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { store } from '@auth';
import { Link, Logo, Loading } from '@components';
import { axios } from '@lib';
import { CheckCircle, XCircle, ArrowRight } from 'lucide-react';

const Page = () => {
  const router = useRouter();
  const { token } = router.query;
  const [status, setStatus] = useState('loading');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!token) return;

    const verifyEmail = async () => {
      try {
        const response = await axios.get(`public/verify-email/${token}`);

        if (response.token) {
          store.dispatch({ type: 'SET', jwt: response.token });
        }

        setStatus('success');

        setTimeout(() => {
          router.push('/author');
        }, 2000);
      } catch (err) {
        setStatus('error');
        setErrorMessage(
          err.response?.data?.message ||
            'Failed to verify email. The link may be invalid or expired.'
        );
      }
    };

    verifyEmail();
  }, [token, router]);

  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:flex flex-1 relative overflow-hidden">
        <img
          src="/images/conferenceSignUp.jpg"
          alt="conference"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent"></div>
      </div>
      <div className="relative flex flex-1 flex-col items-center justify-center bg-white p-8">
        <div className="absolute right-6 top-6">
          <Logo />
        </div>
        <div className="w-full max-w-[400px] text-center">
          {status === 'loading' && (
            <>
              <Loading message="Verifying your email..." />
            </>
          )}
          {status === 'success' && (
            <>
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h1 className="text-2xl font-semibold text-text-primary">Email Verified!</h1>
              <p className="mt-4 text-text-secondary">
                Your email has been verified and you're now logged in. Redirecting you to your
                dashboard...
              </p>
              <div className="mt-6 flex items-center justify-center gap-2 text-sm text-primary">
                <span>Redirecting to dashboard</span>
                <ArrowRight className="h-4 w-4 animate-pulse" />
              </div>
            </>
          )}
          {status === 'error' && (
            <>
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                <XCircle className="h-8 w-8 text-red-600" />
              </div>
              <h1 className="text-2xl font-semibold text-text-primary">Verification Failed</h1>
              <p className="mt-4 text-text-secondary">{errorMessage}</p>
              <div className="mt-8 space-y-3">
                <Link
                  href="/signup"
                  className="block w-full rounded-lg bg-primary px-4 py-3 text-center text-sm font-medium text-white hover:bg-primary/90"
                >
                  Try signing up again
                </Link>
                <Link
                  href="/login"
                  className="block w-full rounded-lg border border-gray-200 px-4 py-3 text-center text-sm font-medium text-text-primary hover:bg-gray-50"
                >
                  Go to login
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
