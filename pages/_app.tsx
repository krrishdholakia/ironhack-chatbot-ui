import { SessionProvider, signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';

import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';

import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

type AuthProps = {
  children: JSX.Element;
};

function Auth({ children }: AuthProps): JSX.Element | null {
  const { status, data: session } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated' || session?.error) {
      void signIn('keycloak');
    }
  }, [session, status]);

  if (status !== 'authenticated') {
    return null;
  }

  return children;
}

function App({ Component, pageProps }: AppProps) {
  const { session } = pageProps;
  const queryClient = new QueryClient();

  return (
    <div className={inter.className}>
      <Toaster />
      <QueryClientProvider client={queryClient}>
        <SessionProvider session={session}>
          <Auth>
            <Component {...pageProps} />
          </Auth>
        </SessionProvider>
      </QueryClientProvider>
    </div>
  );
}

export default appWithTranslation(App);
