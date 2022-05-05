import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "next-themes";
import { useRouter } from "next/router";

// layout
import Layout from "@src/components/Layout";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    //@ts-ignore
    <SWRConfig value={{ fetcher }}>
      {/* theme-provider */}
      <ThemeProvider attribute="class">
        {/* 전체 레이아웃 */}
        <Layout
          nonResposive={router.asPath.includes("/write")}
          hasHeader={!router.asPath.includes("/write")}
        >
          <Component {...pageProps} />
        </Layout>
        {/* 토스트 메시지 */}
        <ToastContainer
          position="top-right"
          autoClose={2000}
          theme="dark"
          closeOnClick
        />
      </ThemeProvider>
    </SWRConfig>
  );
}

export default MyApp;
