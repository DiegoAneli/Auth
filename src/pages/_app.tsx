import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import '../app/globals.css';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps & { pageProps: { session: any } }) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
