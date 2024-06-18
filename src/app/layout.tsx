import './globals.scss';
import { Metadata } from 'next';
import localFont from 'next/font/local';
import { EB_Garamond } from 'next/font/google';
import BackToTopCom from './components/common/back-to-top-com';
import { Providers } from '@/redux/provider';
import Script from 'next/script';
import AppSession from '../libs/Sessions/AppSession';
import ErrorBoundary from '@/ui/error-boundary';
import ErrorPageArea from './error';
import LoadingArea from './loading';
import { Suspense } from 'react';

const gordita = localFont({
  src: [
    {
      path: '../../public/assets/fonts/gordita/gordita_medium-webfont.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/assets/fonts/gordita/gordita_medium-webfont.woff',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/assets/fonts/gordita/gordita_regular-webfont.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/assets/fonts/gordita/gordita_regular-webfont.woff',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--gorditas-font',
});

const garamond = EB_Garamond({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--eb_garamond-font',
});

export const metadata: Metadata = {
  title: 'ATS Erajaya',
  description: "Erajaya's Recruitment Information System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="./favicon.ico" sizes="any" />
        <link rel="stylesheet" href="@/assets/css/font-awesome/all.min.css" />
        <Script src="./node_modules/reflect-metadata/Reflect.js"></Script>
        <Script
          src="https://www.google.com/recaptcha/enterprise.js"
          async
          defer
        ></Script>
      </head>
      <body
        suppressHydrationWarning={true}
        className={`${gordita.variable} ${garamond.variable} `}
      >
        <ErrorBoundary fallback={<ErrorPageArea />}>
          <Providers>
            <AppSession>
              <Suspense fallback={<LoadingArea />}>{children}</Suspense>
            </AppSession>
          </Providers>
        </ErrorBoundary>
        <BackToTopCom />

        <Script src="./node_modules/reflect-metadata/Reflect.js"></Script>
      </body>
    </html>
  );
}
