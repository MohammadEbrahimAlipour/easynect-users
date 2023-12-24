// Define a function to generate the dynamic API URL
export const generateApiUrl = (endpoint) => {
  // Replace this base URL with your dynamic logic if needed
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_SERVER;
  // const baseUrl = "http://188.121.115.0:8000";
  // const baseUrl = "https://a01f-83-123-72-196.ngrok-free.app";
  return `${baseUrl}${endpoint}`;
};
