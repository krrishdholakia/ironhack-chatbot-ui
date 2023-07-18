import { DocumentProps, Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';

import i18nextConfig from '../next-i18next.config';

type Props = DocumentProps & {
  // add custom document props
};

export default function Document(props: Props) {
  const currentLocale =
    props.__NEXT_DATA__.locale ?? i18nextConfig.i18n.defaultLocale;
  return (
    <Html lang={currentLocale}>
      <Head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-title"
          content="Ironhack ChatBot"
        ></meta>
      </Head>
      <body>
        <Main />
        <NextScript />
        <Script strategy="lazyOnload" src="/static/hotjar.js" />
      </body>
    </Html>
  );
}
