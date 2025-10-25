import { store } from '@auth';
import { extractError } from '@functions';
import { axios, router, toaster } from '@lib';
import { decode } from 'jsonwebtoken';

const login = async (data) => {
  try {
    const { token } = await axios.post('login', data);

    // Decode token to get user role
    const decoded = decode(token);
    if (!decoded || !decoded.role) {
      throw new Error('Error! We cannot log you in at the moment');
    }

    const { role } = decoded;

    console.log(role);

    // Store token and navigate
    store.dispatch({ type: 'SET', jwt: token });
    toaster.success('Login successful');
    router.push(`/${role}`);
  } catch (err) {
    const { message } = extractError(err);
    if (message) {
      toaster.error(message);
    }
  }
};

export default login;
