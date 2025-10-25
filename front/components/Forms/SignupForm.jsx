import { signup } from '@api/identity';
import { Email, Input, Password } from '@components/Fields';
import { Field, Form, HookForm, Submit } from '@components/HookForm';
import { initialValues, validationSchema } from '@models/signup';

const SignupForm = () => {
  const handleSubmit = async (values) => {
    await signup(values);
  };

  return (
    <HookForm
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      <Form className="space-y-4">
        <Field as={Input} autoFocus={true} label="Your name" name="name" />
        <Field as={Email} label="Your email" name="email" />
        <Field as={Password} label="Your password" name="password" />
        <Submit className="button full primary">Signup</Submit>
      </Form>
    </HookForm>
  );
};

export default SignupForm;
