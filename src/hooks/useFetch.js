import { useEffect, useState } from "react";

import axiosInstance from "@/services/axiosInterceptors";
import { useAccessToken } from "../../context/AccessTokenContext";
import { generateApiUrl } from "@/components/ApiUr";

function useFetch(defaultUrl = null) {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState([]);
  const [error, setError] = useState(null);
  const accessToken = useAccessToken();

  const load = async ({
    url = null,
    method,
    data = null,
    params = null,
    suppress404Toast = false
  }) => {
    if (!url && !defaultUrl) {
      return;
    }

    try {
      setError(null);
      setIsLoading(true);

      const response = await axiosInstance({
        method: method || "get",
        url: generateApiUrl(defaultUrl || url),
        data,
        params,
        headers: {
          Authorization: `Bearer ${accessToken.accessToken}`,
          "Accept-Language": "fa",
          suppress404Toast: suppress404Toast
        }
      });
      setResponse(response);
    } catch (err) {
      setError(err);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, response, error, load };
}
export default useFetch;
