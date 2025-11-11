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
      {/* Right side: show a full-cover conference image (fills the entire right panel). */}
      <div className="hidden lg:flex flex-1 border-l border-border-primary bg-sidebar-bg relative overflow-hidden">
        {/* Image is served from /images/conference.jpg (place file at front/public/images/conference.jpg) */}
        <img
          src="/images/conference.jpg"
          alt="conference"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default Page;
