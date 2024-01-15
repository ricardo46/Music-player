import { AllSongsProvider } from "@/Contexts/AllSongsContext";
import "../styles/globals.css";
import Layout from "@/components/Layout/Layout";
import { LayoutSubmitRequestProvider } from "@/Contexts/LayoutContext";
import { SongsPlayingProvider } from "@/Contexts/SongsPlayingContext";
import { UserProvider } from "@/Contexts/UserContext";

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <LayoutSubmitRequestProvider>
        <AllSongsProvider>
          <UserProvider>
            <SongsPlayingProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </SongsPlayingProvider>
          </UserProvider>
        </AllSongsProvider>
      </LayoutSubmitRequestProvider>
    </>
  );
}
