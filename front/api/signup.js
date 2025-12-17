import { extractError } from '@functions';
import { axios, router, toaster } from '@lib';

const signup = async (data) => {
  try {
    await axios.post('signup', data);

    router.push('/thank-you');
  } catch (err) {
    const { message } = extractError(err);
    if (message) {
      toaster.error(message);
    }
  }
};

export default signup;
