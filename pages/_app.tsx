import "../styles/globals.css";
import Layout from "@/components/Layout/Layout";
import { LayoutSubmitRequestProvider } from "@/Contexts/LayoutContext";
import { UserProvider } from "@/Contexts/UserContext";

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <LayoutSubmitRequestProvider>
        <UserProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </UserProvider>
      </LayoutSubmitRequestProvider>
    </>
  );
}
