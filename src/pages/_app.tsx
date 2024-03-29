import { SWRConfig } from "swr";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { ToastContainer } from "react-toastify";

// css
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";
import "../styles/toast.css";

// component
import Layout from "@src/components/Layout";

// type
import type { AppProps } from "next/app";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function MyApp({ Component, pageProps }: AppProps) {
  return (
    //@ts-ignore
    <SWRConfig value={{ fetcher }}>
      <SessionProvider>
        {/* theme-provider */}
        <ThemeProvider attribute="class">
          {/* 전체 레이아웃 */}
          <Layout>
            <Component {...pageProps} />
          </Layout>

          {/* 토스트 메시지 */}
          <ToastContainer
            position="top-center"
            autoClose={1500}
            theme="dark"
            closeOnClick
            limit={3}
          />
        </ThemeProvider>
      </SessionProvider>
    </SWRConfig>
  );
}

export default MyApp;
