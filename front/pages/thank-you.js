import { Link } from '@components';
import { Mail, ArrowLeft } from 'lucide-react';

const Page = () => {
  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:flex flex-1 relative overflow-hidden">
        <img
          src="/images/conferenceSignUp.jpg"
          alt="conference signup"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent"></div>
      </div>
      <div className="relative flex flex-1 flex-col items-center justify-center bg-white p-8">
        <div className="w-full max-w-[400px] text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Mail className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-2xl font-semibold text-text-primary">Check your email</h1>
          <p className="mt-4 text-text-secondary">
            We've sent a verification link to your email address. Please click the link to verify
            your account and complete your registration.
          </p>
          <div className="mt-8 rounded-lg bg-gray-50 p-4 text-left text-sm text-text-secondary">
            <p className="font-medium text-text-primary mb-2">What happens next?</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">1.</span>
                <span>Check your inbox for the verification email</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">2.</span>
                <span>Click the "Verify Email" button in the email</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">3.</span>
                <span>Start browsing conferences and submitting papers!</span>
              </li>
            </ul>
          </div>
          <p className="mt-6 text-sm text-text-secondary">
            Didn't receive the email? Check your spam folder or{' '}
            <Link href="/signup" className="font-medium text-primary hover:underline">
              try again
            </Link>
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
