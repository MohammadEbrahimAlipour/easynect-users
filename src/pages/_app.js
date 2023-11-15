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

const raviFont = raviFontLocal({
  src: "../RaviPro/Ravi Variable/Webfonts/woff2/Ravi-VF.woff2",
  variable: "--font-rav"
});

const protectedRoutes = [
  "/cards",
  "/changeEmail",
  "/changePassword",
  "/confirmEmailCode",
  "/contacts",
  "/contentAddItem",
  "/createCard",
  "/editMedias",
  "/editProfileInfo",
  "/forgotPassword",
  "/forgotPasswrodSuccessful",
  "/mediaSelection",
  "/mediaSettings",
  "/newEmailOtp",
  "/noticeSetting",
  "/personsStats",
  "/profile",
  "/profileCard",
  "/profileInfo"
];

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main
        className={`${raviFont.variable} font-ravi w-full flex justify-center`}
      >
        <div className=" 3xl:w-[414px] 2xl:w-[414px] lg:w-[414px]">
          <AccessTokenProvider protectedRoutes={protectedRoutes}>
            <Component {...pageProps} />
          </AccessTokenProvider>
        </div>
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
