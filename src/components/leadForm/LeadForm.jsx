import React, { useState } from "react";
import BottomSheetWrapper from "../bottomSheet/BottomSheetWrapper";
import LoadingState from "../LoadingState";
import axios from "axios";
import { toast } from "react-toastify";
import { useAccessToken } from "../../../context/AccessTokenContext";
import { generateApiUrl } from "../ApiUr";

const LeadForm = ({ open, onClose, leadFormData, pageId }) => {
  const accessToken = useAccessToken();

  const [formData, setFormData] = useState({
    name: "" // Add other fields if necessary
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // // Assuming 'name' in your state is directly linked to the static 'name input'.
    // const formDataToSend = {
    //   name: formData.name,
    //   fields: leadFormData.map((field) => ({
    //     title: field.title,
    //     value: formData[field.title], // Accessing dynamic fields from formData based on title
    //     field_type: field.type
    //   }))
    // };

    // Filter out fields that have undefined values
    const fieldsToSend = leadFormData
      .filter((field) => formData[field.title] !== undefined)
      .map((field) => ({
        title: field.title,
        value: formData[field.title],
        field_type: field.type
      }));

    // Assuming 'name' in your state is directly linked to the static 'name input'.
    const formDataToSend = {
      name: formData.name,
      fields: fieldsToSend
    };

    console.log("formDataToSend", formDataToSend);

    if (pageId) {
      try {
        const apiUrl = generateApiUrl(
          `/api/v1/contacts/lead_capture/${pageId}`
        );

        const config = {
          headers: {
            Authorization: `Bearer ${accessToken.accessToken}`,
            // You don't need to set the Content-Type when using FormData
            // Axios will set the correct multipart/form-data boundary
            "Accept-Language": "fa"
          }
        };

        // Send PATCH request using Axios, add the formDataToSend
        const response = await axios.post(apiUrl, formDataToSend);

        if (response.status === 200) {
          toast.success("Content updated successfully");
        } else {
          console.error("Unexpected response status:", response.status);
        }
      } catch (error) {
        console.error("Error:", error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.detail
        ) {
          toast.error(error.response.data.detail);
        } else {
          toast.error("Error: An error occurred.");
        }
      }
    }
  };

  return (
    <div>
      {leadFormData ? (
        <BottomSheetWrapper open={open} onClose={onClose}>
          <h3 className="mt-4 font-bold">لطفا اطلاعات خود را وارد کنید</h3>

          {/* code input field */}
          <form onSubmit={handleSubmit} className="py-5">
            {/* inputs */}

            {/* name */}
            <div className="bg-lightMenu rounded-lg  mb-4 border-2 box-border overflow-hidden">
              <div className="flex justify-start items-center py-3">
                <label
                  className="font-medium text-sm border-e-2 text-muted me-2 pe-2 ps-4"
                  htmlFor="data_inp"
                >
                  نام
                </label>
                <input
                  required={true}
                  id="data_inp"
                  name="name"
                  // value={formData.name}
                  onChange={handleChange}
                  placeholder={"نام خود را وارد کنید."}
                  className="bg-lightMenu outline-0 py-1 text-sm font-medium "
                />
              </div>
            </div>

            {leadFormData
              .filter((item) => item.is_active)
              .map((item) => (
                <div
                  key={item.id}
                  className="bg-lightMenu rounded-lg mb-4 border-2 box-border overflow-hidden"
                >
                  <div className="flex justify-start items-center py-3">
                    <label
                      className="font-medium text-sm border-e-2 text-muted me-2 pe-2 ps-4"
                      htmlFor={`input_${item.id}`}
                    >
                      {item.title}
                    </label>
                    <input
                      id={`input_${item.id}`}
                      name={item.title}
                      onChange={handleChange}
                      value={formData[item.title] || ""}
                      placeholder={item.placeholder}
                      className="bg-lightMenu outline-0 py-1 text-sm font-medium"
                    />
                  </div>
                </div>
              ))}

            {/* button */}
            <button
              type="submit"
              href="/confrimEmailCode"
              className="flex items-center justify-center w-full
                      bg-dark text-white py-3 leading-0 rounded-lg mt-7"
            >
              تغییر ایمیل
            </button>
          </form>
        </BottomSheetWrapper>
      ) : (
        <LoadingState />
      )}
    </div>
  );
};

export default LeadForm;
