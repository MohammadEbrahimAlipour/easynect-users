// axiosInstance.js
import axios from "axios";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  // you can add base URL and other default configuration here if needed
});
// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    // Set default accept-language if not already provided
    if (!config.headers["accept-language"]) {
      config.headers["accept-language"] = "fa"; // default language
    }

    // Set default Content-Type if not already provided
    if (!config.headers["Content-Type"]) {
      config.headers["Content-Type"] = "application/json"; // default Content-Type
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    // Your existing interceptor code for successful responses...
    return response;
  },
  function (error) {
    // Handle network errors or other exceptions not directly related to HTTP response
    if (!error.response) {
      toast.error("خطای شبکه"); // Generic message for network errors in Persian
    } else {
      // If set to true, this specific call will suppress the toast error for 404
      if (
        error.config &&
        error.config.suppress404Toast &&
        error.response &&
        error.response.status === 404
      ) {
        return Promise.reject(error); // Reject the promise without making a toast
      }

      // Error from backend, use error detail if available
      const errorMessage = error.response.data?.detail || "ارور ناشناخته"; // Persian for "Unknown error"
      toast.error(errorMessage);
      // Check if the error status is 401 (Unauthorized)
      if (error.response.status === 401) {
        // Redirect the user to the login page
        // You can replace '/registration/signIn/loginUser' with your actual login page URL
        window.location.replace("/registration/signIn/loginUser");
      } else if (error.response && error.response.status === 404) {
        router.push("/404");
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
