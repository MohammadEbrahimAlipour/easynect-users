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
  typography: {
    fontFamily: 'Ravi, Arial',
  },
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
  components: {
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          // رنگ پیش‌فرض border
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#D1AB48',
          },
          // در حالت hover
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#D1AB48',
          },
          // در حالت focus
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#D1AB48',
          },
        },
        input: {
          // رنگ متن داخل input
          color: '#000',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#D1AB48',
          '&.Mui-focused': {
            color: '#D1AB48',
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
