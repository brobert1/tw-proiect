import { ErrorBoundary, Toaster } from '@components';
import { queryClient } from '@lib';
import { sitename } from '@site.config';
import { QueryClientProvider } from '@tanstack/react-query';
import Head from 'next/head';
import '../css/index.css';

const Root = (props) => {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>{sitename}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
      </Head>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
        <Toaster />
      </ErrorBoundary>
    </>
  );
};

export default Root;
