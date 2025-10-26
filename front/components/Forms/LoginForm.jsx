import { login } from '@api/identity';
import { Email, Password } from '@components/Fields';
import { Field, HookForm } from '@components/HookForm';
import { initialValues, validationSchema } from '@models/login';
import { Button, Link } from '@components';

const LoginForm = () => {
  const handleSubmit = async (values) => {
    await login(values);
  };

  return (
    <HookForm
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-text-primary">
            Email
          </label>
          <Field as={Email} autoFocus={true} name="email" placeholder="johndoe@example.com" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="text-sm font-medium text-text-primary">
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-sm font-medium text-text-primary hover:underline"
            >
              Forgot your password?
            </Link>
          </div>
          <Field as={Password} name="password" />
        </div>
        <Button
          type="submit"
          className="w-full rounded-md bg-gray-800 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-900"
        >
          Login
        </Button>
      </div>
    </HookForm>
  );
};

export default LoginForm;
