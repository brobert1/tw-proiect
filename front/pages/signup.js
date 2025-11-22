import { Link, Logo } from '@components';
import { SignupForm } from '@components/Forms';

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
        <div className="absolute right-6 top-6">
          <Logo />
        </div>
        <div className="w-full max-w-[360px]">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-text-primary">Create a new account</h1>
            <p className="mt-2 text-sm text-text-secondary">
              Enter your details below to create your account
            </p>
          </div>
          <div className="space-y-6">
            <SignupForm />
            <p className="flex items-center justify-center gap-2 text-center text-sm text-text-secondary">
              Already have an account?
              <Link href="/login" className="font-medium text-text-primary hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
