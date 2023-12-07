import Footer from "@/components/Footer";
import Layout from "@/components/Layout";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ArrowDownIconDark, DeleteIconLead } from "@/components/Icons";
import { useAccessToken } from "../../../context/AccessTokenContext";
import { generateApiUrl } from "@/components/ApiUr";
import { useRouter } from "next/router";
import HeaderTwo from "@/components/HeaderTwo";

const CreateLead = () => {
  const router = useRouter();
  const { id } = router.query;
  const [showList, setShowList] = useState(false);
  const accessToken = useAccessToken();
  const [leadOptions, setLeadOptions] = useState([]);
  const [selectedFields, setSelectedFields] = useState([]);
  const [inputValue, setInputValue] = useState(""); // State for input value

  const [inputValues, setInputValues] = useState({});

  // Function to handle change in input value for a specific field
  const handleInputChange = (index, value) => {
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [index]: value
    }));
  };

  useEffect(() => {
    const apiUrl = generateApiUrl(`/api/v1/lead_capture_store/`);
    // Make an Axios GET request to fetch user data
    axios
      .get(apiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken.accessToken}`, // Add your access token here
          "Accept-Language": "fa" // Language header
        }
      })
      .then((response) => {
        // Handle the data once it's received
        setLeadOptions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        // Check if the error response contains a message
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
  }, [accessToken.accessToken]);

  // Function to submit the form
  const handleSubmit = (event) => {
    event.preventDefault();

    // Get the values from the selectedFields array
    const fieldValues = selectedFields.map((field, index) => ({
      lead_capture_store_id: field.id,
      title:
        inputValues[index] !== undefined ? inputValues[index] : field.title,
      order: index + 1 //order here
    }));

    if (id) {
      // Make an Axios PATCH request to update user data based on user_id
      const apiUrl = generateApiUrl(`/api/v1/leads/form_fields/${id}`);
      axios
        .post(apiUrl, fieldValues, {
          headers: {
            Authorization: `Bearer ${accessToken.accessToken}`,
            "Accept-Language": "fa"
          }
        })
        .then((response) => {
          // Handle the response as needed (e.g., show a success message)
          console.log("User data updated successfully.");
          toast.success("updated successfully");
        })
        .catch((error) => {
          console.error("Error updating user data:", error);
          // Check if the error response contains a message
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
    }
  };

  const handleExtractId = (id, title) => {
    // Extracted ID and title
    const extractedField = { id, title };

    // Update the selected fields array
    setSelectedFields((prevFields) => [...prevFields, extractedField]);

    // Close the dropdown
    setShowList(false);
  };

  const handleDeleteField = (id) => {
    // Filter out the field with the specified ID
    const updatedFields = selectedFields.filter((field) => field.id !== id);

    // Update the selected fields array
    setSelectedFields(updatedFields);
  };

  //   const handleExtractId = (id, title) => {
  //     // Generate a unique ID using the current timestamp
  //     const uniqueId = new Date().getTime();

  //     // Extracted ID and title
  //     const extractedField = { id: uniqueId, title };

  //     // Update the selected fields array
  //     setSelectedFields((prevFields) => [...prevFields, extractedField]);

  //     // Close the dropdown
  //     setShowList(false);
  //   };

  //   const handleDeleteField = (id) => {
  //     // Update the selected fields array using functional update
  //     setSelectedFields((prevFields) =>
  //       prevFields.filter((field) => field.id !== id)
  //     );
  //   };

  console.log("selectedFields", selectedFields);
  console.log("leadOptions", leadOptions);

  return (
    <>
      <HeaderTwo />
      <Layout>
        <h3 className="font-semibold mb-6">ساخت فرم لید</h3>

        <form onSubmit={handleSubmit}>
          {selectedFields.map((field, index) => (
            <div
              key={field.title}
              className="bg-lightMenu rounded-lg  mb-3 border-2 box-border flex justify-between
              items-center"
            >
              <div className="flex justify-between w-full items-center  py-3">
                <div>
                  <label
                    className="font-medium text-sm border-e-2 text-muted me-2 pe-2 ps-4"
                    htmlFor={`create-${index}`}
                  >
                    {field.title}
                  </label>

                  {/* input to send */}
                  <input
                    id={`create-${index}`}
                    type="text"
                    placeholder="عنوان دلخواه خود را وارد کنید."
                    className="bg-lightMenu outline-0 font-medium "
                    name="title"
                    value={inputValues[index] || ""}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                  />
                </div>

                {/* delete field */}
                <span
                  onClick={() => handleDeleteField(field.id)}
                  className="me-4"
                >
                  <DeleteIconLead />
                </span>
              </div>
            </div>
          ))}

          {/* dropdown */}
          <div
            onClick={() => setShowList(!showList)}
            className="bg-lightMenu rounded-lg border-black mb-3 border py-3 px-4 box-border flex justify-between
              items-center relative
              "
          >
            <span>افزودن فیلد</span>
            <ArrowDownIconDark />

            {/* list dropdown */}

            <div
              className={`absolute w-full shadow-xl left-0 top-[45px] rounded-md 
            bg-white transition-all ease-in-out duration-300 max-h-[150px] overflow-y-scroll ${
              showList ? "" : "opacity-0 pointer-events-none"
            }`}
            >
              {leadOptions.map((option) => (
                <div
                  key={option.id}
                  onClick={() => handleExtractId(option.id, option.title)}
                  className="border-b w-full py-2 mx-5 text-right font-ravi"
                >
                  {option.title}
                </div>
              ))}
            </div>
          </div>

          {/* button */}
          <button
            type="submit"
            className="flex items-center justify-center w-full
                    bg-dark text-white py-3 leading-0 rounded-lg mt-7"
          >
            ذخیره تغییرات
          </button>
        </form>

        {/* each item */}
      </Layout>
      <Footer />
    </>
  );
};

export default CreateLead;
