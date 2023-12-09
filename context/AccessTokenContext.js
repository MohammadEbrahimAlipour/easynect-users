import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios"; // Import Axios for HTTP requests
import { useRouter } from "next/router";

const AccessTokenContext = createContext();

export const useAccessToken = () => {
  const context = useContext(AccessTokenContext);
  if (!context) {
    throw new Error(
      "useAccessToken must be used within an AccessTokenProvider"
    );
  }
  return context;
};

export const AccessTokenProvider = ({ children, protectedRoutes }) => {
  const [accessToken, setAccessToken] = useState(() => {
    // Check if the code is running in a browser environment before using localStorage
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("accessToken");
      return storedToken || null;
    }
    return null; // Return null if not in a browser environment
  });

  const isProtectedRoute = (pathname) => {
    return /^\/app(\/.*)?$/.test(pathname);
  };

  const router = useRouter();

  useEffect(() => {
    if (!accessToken && isProtectedRoute(router.pathname)) {
      router.push('/loginUser');
    }
  }, [accessToken, router.pathname]);

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
        (response) => response, // Just pass through the response
        (error) => {
          if (error.response && error.response.status === 401) {
            setAccessToken(null); // Clear invalid token
            if (isProtectedRoute(router.pathname)) {
              router.push('/loginUser');
            }
          }
          return Promise.reject(error);
        }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [router]); // router should be in the dependency array to ensure proper redirecting

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
      } else {
        localStorage.removeItem('accessToken');
      }
    }
  }, [accessToken]);

  const contextValue = {
    accessToken,
    setAccessToken
  };

  return (
    <AccessTokenContext.Provider value={contextValue}>
      {children}
    </AccessTokenContext.Provider>
  );
};
