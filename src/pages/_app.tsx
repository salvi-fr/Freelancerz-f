import Head from 'next/head';
import Router from 'next/router';
import NProgress from 'nprogress';
import React, { Fragment } from 'react';
import { ThemeProvider } from 'styled-components';
import { AppProvider } from 'contexts/app/AppContext';
import { GlobalStyles } from 'utils/globalStyles';
import { theme } from 'utils/theme';
import { Provider } from 'react-redux'
import { Store } from 'redux/Store'
//Binding events.
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

NProgress.configure({ showSpinner: false });

const App = ({ Component, pageProps }: any) => {
  let Layout = Component.layout || Fragment;

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta
          property="og:url"
          content="https://www.healtheducat.rw/"
        />
        {/* thumbnail And title for social media */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="React Next JS Ecommerce Template" />
        <meta
          property="og:description"
          content="Study any topic, anytime. Choose from thousands of expert-led courses now."
        />
        <meta
          property="og:image"
          content="/logo.jpg"
        />

        {/* Google analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-SGG7GE7HZC"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-SGG7GE7HZC');
          `,
          }}
        ></script>
      </Head>
      <GlobalStyles />
      
      <AppProvider>
      <Provider store={Store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        </Provider>
      </AppProvider>
      
    </ThemeProvider>
  );
};

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// App.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default App;
