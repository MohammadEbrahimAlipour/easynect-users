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

export const AccessTokenProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(() => {
    // Check if the code is running in a browser environment before using localStorage
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("accessToken");
      return storedToken || null;
    }
    return null; // Return null if not in a browser environment
  });

  const router = useRouter();

  // Check if the user has a valid access token
  useEffect(() => {
    if (!accessToken) {
      // Redirect to the "/userLogin" page
      router.push("/loginUser");
    }
  }, [accessToken, router]);

  useEffect(() => {
    if (accessToken) {
      // Check if the code is running in a browser environment before using localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("accessToken", accessToken);
      }

      // Set up an Axios interceptor to handle 401 errors and redirect to login
      const interceptor = axios.interceptors.response.use(
        (response) => {
          return response;
        },
        (error) => {
          if (error.response && error.response.status === 401) {
            // Redirect to "/loginUser"
            if (typeof window !== "undefined") {
              window.location.href = "/loginUser";
            }
          }
          return Promise.reject(error);
        }
      );

      // Cleanup the interceptor when component unmounts
      return () => {
        axios.interceptors.response.eject(interceptor);
      };
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
