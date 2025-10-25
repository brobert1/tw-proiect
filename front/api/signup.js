import { extractError } from '@functions';
import { axios, router, toaster } from '@lib';

const signup = async (data) => {
  try {
    // Execute main action
    await axios.post('signup', data);

    // Notify user and other actions
    toaster.success('Your account has been created successfully');
    router.push('/login');
  } catch (err) {
    const { message } = extractError(err);
    if (message) {
      toaster.error(message);
    }
  }
};

export default signup;
