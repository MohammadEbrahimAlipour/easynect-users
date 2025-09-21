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
import { ThemeProvider, createTheme } from "@mui/material";

const protectedRoutes = [/\/app\/.*/];

const theme = createTheme({
  direction: 'rtl',
  typography: {
    fontFamily: 'Tahoma, Arial, sans-serif',
  },
  components: {
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        padding: '8px 8px',
        InputLabelProps: {
          shrink: false,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          padding: '12px',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#D1AB48',
            borderWidth: 2,
            padding: '12px',

          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#B8941F',
            padding: '12px',

          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#D1AB48',
            borderWidth: 2,
            padding: '12px',

          },
          '&.Mui-focused .MuiInputLabel-root': {
            opacity: 0.7,
            padding: '12px',

          },
        },
        input: {
          color: '#000',
          textAlign: 'right',
          direction: 'rtl',
          padding: '16.5px 16px',
          fontFamily: 'Tahoma, Arial, sans-serif',
          fontSize: '16px',
          lineHeight: '1.5',
          padding: '0px',

        },
        inputMultiline: {
          padding: '16.5px 16px',
          textAlign: 'right',
          direction: 'rtl',
          fontFamily: 'Tahoma, Arial, sans-serif',
          fontSize: '16px',
          lineHeight: '1.6',
          resize: 'vertical',
          padding: '0px',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          right: 16,
          left: 'unset',
          top: '20px',
          transform: 'translateY(-50%)',
          transformOrigin: 'center right',
          textAlign: 'right',
          color: '#D1AB48',
          backgroundColor: 'white',
          padding: '0 8px',
          fontFamily: 'Tahoma, Arial, sans-serif',
          fontSize: '16px',
          fontWeight: 500,
          '&.Mui-focused': {
            display: 'none',
          },
          '&.MuiInputLabel-shrink': {
            transform: 'translateY(-50%)',
            top: '20px',
            right: 16,
          },
        },
        outlined: {
          right: 16,
          left: 'unset',
          top: '20px',
          backgroundColor: 'white',
          padding: '0 8px',
          '&.Mui-focused': {
            transform: 'translateY(-50%)',
            top: '20px',
            backgroundColor: 'white',
          },
        },
      },
    },
  },
});

function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
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
        className={`mx-auto flex flex-col min-h-screen w-screen container:w-[414px]`}
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
    </ThemeProvider>
  );
}

export default appWithTranslation(App);