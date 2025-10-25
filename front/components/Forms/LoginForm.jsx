import { login } from '@api/identity';
import { Email, Password } from '@components/Fields';
import { Field, HookForm } from '@components/HookForm';
import { initialValues, validationSchema } from '@models/login';
import { Button } from '@components/ui/button';

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
        <Field as={Email} autoFocus={true} label="Your email" name="email" />
        <Field as={Password} label="Your password" name="password" />
        <Button type="submit" variant="default" size="lg" className="w-full">
          Login
        </Button>
      </div>
    </HookForm>
  );
};

export default LoginForm;
