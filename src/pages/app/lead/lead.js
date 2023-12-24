import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Layout from "@/components/Layout";
import React, { useState, useEffect, Fragment } from "react";
import { useAccessToken } from "../../../../context/AccessTokenContext";
import { generateApiUrl } from "@/components/ApiUr";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import Image from "next/image";
import Link from "next/link";

import {
  CloseIcon,
  DeleteIconLead,
  PlusSign,
  TickSuccess,
  Tickicon
} from "@/components/Icons";
import LoadingState from "@/components/LoadingState";
import HeaderTwo from "@/components/HeaderTwo";

const Lead = () => {
  const [leadData, setLeadData] = useState([]);
  const accessToken = useAccessToken();
  const [noData, setNoData] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const apiUrl = generateApiUrl(`/api/v1/leads/${id}`);
    // Make an Axios GET request to fetch user data

    if (id) {
      axios
        .get(apiUrl, {
          headers: {
            Authorization: `Bearer ${accessToken.accessToken}`, // Add your access token here
            "Accept-Language": "fa" // Language header
          }
        })
        .then((response) => {
          // Handle the data once it's received
          setLeadData(response.data);
          setNoData(false);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          if (error.response) {
            // Handle the 404 status specifically
            if (error.response.status === 404) {
              setNoData(true);
              // No toast displayed for 404 errors
            } else if (error.response.data && error.response.data.detail) {
              // Check if the error response contains a more specific message
              const errorMessage = error.response.data.detail;
              toast.error(errorMessage);
            } else {
              // Handle any other errors without specific status codes
              toast.error("Error: An unexpected error occurred.");
            }
          } else {
            // Handle cases where the error response is not available
            toast.error("Error: Could not connect to the API.");
          }
        });
    }
  }, [accessToken.accessToken, id]);

  const handleDeleteUser = (leadId) => {
    const apiUrl = generateApiUrl(`/api/v1/leads/form_fields/${leadId}`);

    // Set the request headers, including the Authorization header with the token
    const headers = {
      Authorization: `Bearer ${accessToken.accessToken}`, // Assuming accessToken is the token value
      "Accept-Language": "fa"
    };

    // Make an Axios DELETE request to delete the user
    axios
      .delete(apiUrl, { headers }) // Pass the headers in the request
      .then((response) => {
        // Handle the successful deletion (e.g., update the UI)
        console.log("User deleted successfully.");
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.detail
        ) {
          const errorMessage = error.response.data.detail;
          toast.error(errorMessage);
        } else {
          // If there is no specific error message, display a generic one
          toast.error("Error: An error occurred.");
        }
      });
  };
  return (
    <>
      <HeaderTwo />
      <Layout>
        <h3 className="font-semibold mb-6">فرم لید</h3>
        {/* to check if data exist handle noData */}

        {noData !== undefined && !noData && (
          <Fragment>
            {/* each item */}
            {leadData.fields !== undefined ? (
              <>
                {leadData.fields.map((item) => (
                  <div
                    key={item.id}
                    className="bg-lightMenu rounded-lg mb-2 border-2 box-border overflow-hidden"
                  >
                    <div className="grid grid-cols-12 justify-start items-center py-3">
                      {/* title */}
                      <p className="col-span-3 font-medium text-sm border-e-2  ps-2 truncate">
                        {item.title}
                      </p>

                      {/* placeholder */}
                      <span className="col-span-6 ms-1 bg-lightMenu flex  justify-between items-center me-3 w-full overflow-hidden">
                        <p className="font-medium text-sm">
                          {item.placeholder}
                        </p>
                      </span>

                      {/* is active */}
                      <span className="col-span-2 ms-2">
                        {leadData.is_active ? <TickSuccess /> : <Tickicon />}
                      </span>
                      {/* delete */}
                      <button
                        onClick={() => handleDeleteUser(item.id)}
                        className="col-span-1"
                      >
                        <DeleteIconLead />
                      </button>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <LoadingState />
            )}
          </Fragment>
        )}

        {/* add item field */}
        <h3 className="font-semibold mb-2 mt-7">ساخت لید</h3>

        {/* add item botton */}
        <Link
          href={`/lead/createLead?id=${leadData.id}`}
          className="bg-lightMenu rounded-lg mb-2 border-2 box-border overflow-hidden
          py-3 font-ravi w-full flex justify-center items-center font-medium"
        >
          اظافه کردن
          <span className="ms-1">
            <PlusSign />
          </span>
        </Link>
      </Layout>
      <Footer />
    </>
  );
};

export default Lead;
