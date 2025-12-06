import { queryClientConfig } from '@constants/query-client';
import { QueryClient } from '@tanstack/react-query';

// Create a singleton queryClient instance that can be imported anywhere
export const queryClient = new QueryClient(queryClientConfig);

export default queryClient;
