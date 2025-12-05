import { setPassword } from '@api/public';
import { Password } from '@components/Fields';
import { Field, Form, HookForm, Submit } from '@components/HookForm';
import { Logo } from '@components';
import { useRouter } from 'next/router';
import { initialValues, validationSchema } from '@models/setup-password';
import { toaster } from '@lib';

const Page = () => {
  const r = useRouter();
  const token = r.query?.token;

  const handleSubmit = async (values) => {
    await setPassword(token, { password: values.password });
    toaster.success('Password updated');
    r.push('/login').catch(() => {});
  };

  return (
    <div className="flex min-h-screen">
      <div className="relative flex flex-1 flex-col items-center justify-center bg-white p-8">
        <div className="absolute left-6 top-6">
          <Logo />
        </div>
        <div className="w-full max-w-[360px]">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-text-primary">Set Your Password</h1>
            <p className="mt-2 text-sm text-text-secondary">
              Create a new password to activate your reviewer account.
            </p>
          </div>
          <HookForm
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={handleSubmit}
          >
            <Form className="space-y-4">
              <Field as={Password} autoFocus={true} label="New password" name="password" />
              <Field as={Password} label="Confirm password" name="confirm" />
              <Submit className="button full primary">Save Password</Submit>
            </Form>
          </HookForm>
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
