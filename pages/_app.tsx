import { ChakraProvider } from '@chakra-ui/react';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';

import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';

import Auth from '../components/Auth';

import '@/styles/globals.css';
import theme from '@/theme';

const inter = Inter({ subsets: ['latin'] });

function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <div className={inter.className}>
      <Toaster />
      <QueryClientProvider client={queryClient}>
        <Auth>
          <ChakraProvider theme={theme}>
            <Component {...pageProps} />
          </ChakraProvider>
        </Auth>
      </QueryClientProvider>
    </div>
  );
}

export default appWithTranslation(App);
