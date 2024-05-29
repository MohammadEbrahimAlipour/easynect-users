import "@/styles/globals.css";
import "../styles/carousel.css";
// import "../styles/profileCarousel.css";
import Head from "next/head";
import raviFontLocal from "@next/font/local";
import { AccessTokenProvider } from "../../context/AccessTokenContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "swiper/css";
import ErrorBoundary from "@/components/Errors/ErrorBoundary";
import "react-indiana-drag-scroll/dist/style.css";
import { appWithTranslation } from "next-i18next";

const raviFont = raviFontLocal({
  src: "../RaviPro/Ravi Variable/Webfonts/woff2/Ravi-VF.woff2",
  variable: "--font-rav",
});

const protectedRoutes = [/\/app\/.*/];

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180 152x152 167x167 76x76"
          href="/apple-touch-icon.png"
        />
      </Head>

      <main
        className={`${raviFont.variable} font-ravi mx-auto w-screen container:w-[414px]`}
      >
        <ErrorBoundary>
          <AccessTokenProvider protectedRoutes={protectedRoutes}>
            {/* <DndProvider backend={HTML5Backend}> */}
            <Component {...pageProps} />
            {/* </DndProvider> */}
          </AccessTokenProvider>
        </ErrorBoundary>
      </main>

      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default appWithTranslation(App);
