import "@dexhunterio/swaps/lib/assets/style.css";
import "src/global.css";
import 'src/locales/i18n';

// ...................................

import { NextPage } from "next";
import { AppProps } from "next/app";
import createCache, { EmotionCache } from "@emotion/cache";
import { ReactNode } from "react";
import { CacheProvider } from "@emotion/react";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import ThemeProvider from "src/theme";
import { LocalizationProvider } from 'src/locales';
import { MotionLazy } from "src/components/animate/motion-lazy";
import { ToastContainer } from "src/components/toast";
import ModalContainer from "src/components/modal";
import SnackbarContainer from "src/components/snackbar";
import { SettingsProvider } from "src/components/settings";
// ...................................

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: NextPageWithLayout;
}
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createCache({ key: "css", prepend: true });

// ...................................
export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const getLayout = Component.getLayout ?? ((page: ReactNode) => page);

  // ...................................

  return (
    <CacheProvider value={emotionCache}>
      <SessionProvider>
        <LocalizationProvider>
          <SettingsProvider
            defaultSettings={{
              themeMode: "light", // 'light' | 'dark'
              themeDirection: "ltr", //  'rtl' | 'ltr'
              themeContrast: "default", // 'default' | 'bold'
              themeLayout: "vertical", // 'vertical' | 'horizontal' | 'mini'
              themeColorPresets: "default", // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
              themeStretch: false,
              editing: false
            }}
          >
            <Head>
              <meta
                name="viewport"
                content="initial-scale=1, width=device-width"
              />
            </Head>
            <ThemeProvider>
              <MotionLazy>{getLayout(<Component {...pageProps} />)}</MotionLazy>
              <ToastContainer />
              <SnackbarContainer />
              <ModalContainer />
            </ThemeProvider>
          </SettingsProvider>
        </LocalizationProvider>
      </SessionProvider>
    </CacheProvider>
  );
}