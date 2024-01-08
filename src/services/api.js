// services/api.js
import { generateApiUrl } from "@/components/ApiUr";
import axiosInstance from "./axiosInterceptors";

// login api (filling token here)
export const loginUser = async (formData) => {
  try {
    const apiUrl = generateApiUrl("/api/v1/login/");
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      "accept-language": "fa"
    };
    const formBody = new URLSearchParams(formData);

    const response = await axiosInstance.post(apiUrl, formBody, { headers });

    if (response.status === 200) {
      const data = response.data;
      const accessToken = data.access_token;
      return accessToken;
    }

    // Log unexpected status codes
    console.error("Unexpected status code during login:", response.status);

    return null; // or throw an error based on your application logic
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error during login:", error);
    throw error; // Rethrow the error for further handling if needed
  }
};
