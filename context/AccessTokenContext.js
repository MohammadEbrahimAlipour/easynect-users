import { createContext, useContext, useEffect, useState } from "react";

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

  useEffect(() => {
    if (accessToken) {
      // Check if the code is running in a browser environment before using localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("accessToken", accessToken);
      }

      // added code for clearimg accessToken after 6 hours
      // Set a timeout to clear the access token after 6 hours
      const timeoutId = setTimeout(() => {
        setAccessToken(null); // Clear the access token
        if (typeof window !== "undefined") {
          localStorage.removeItem("accessToken"); // Remove from local storage
        }
      }, 6 * 60 * 60 * 1000); // 6 hours in milliseconds

      // Cleanup the timeout when component unmounts or when access token changes
      return () => clearTimeout(timeoutId);
      // end of added code
    } else {
      // Check if the code is running in a browser environment before using localStorage
      if (typeof window !== "undefined") {
        localStorage.removeItem("accessToken");
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
