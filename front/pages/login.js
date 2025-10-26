import { Link, Logo } from '@components';
import { LoginForm } from '@components/Forms';

const Page = () => {
  return (
    <div className="flex min-h-screen">
      <div className="relative flex flex-1 flex-col items-center justify-center bg-white p-8">
        <div className="absolute left-6 top-6">
          <Logo />
        </div>
        <div className="w-full max-w-[360px]">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-text-primary">Login to your account</h1>
            <p className="mt-2 text-sm text-text-secondary">
              Enter your email below to login to your account
            </p>
          </div>
          <div className="space-y-6">
            <LoginForm />
            <p className="text-center text-sm text-text-secondary">
              Don't have an account?
              <Link href="/signup" className="font-medium text-text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="hidden flex-1 items-center justify-center border-l border-border-primary bg-sidebar-bg lg:flex">
        <div className="flex h-64 w-64 items-center justify-center rounded-full bg-gray-200">
          <svg
            className="h-32 w-32 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Page;
