import React, { useState } from "react";
import BottomSheetWrapper from "../bottomSheet/BottomSheetWrapper";
import LoadingState from "../LoadingState";
import axios from "axios";
import { toast } from "react-toastify";
import { useAccessToken } from "../../../context/AccessTokenContext";
import { generateApiUrl } from "../ApiUr";
import { ArrowRight } from "../Icons";
import { API_ROUTES } from "@/services/api";
import axiosInstance from "@/services/axiosInterceptors";
import { useTranslation } from "react-i18next";

const LeadForm = ({
  open,
  onClose,
  leadFormData,
  pageId,
  setHasLeadForm,
  language,
}) => {
  const accessToken = useAccessToken();

  const [hasAcount, setHasAcount] = useState(false);
  const [username, setUsername] = useState("");

  const [formData, setFormData] = useState({
    name: "", // Add other fields if necessary
  });

  const { t } = useTranslation();

  const handleChange = (e, item) => {
    const { name, value } = e.target;

    // If the field is a link and has a base URL, prepend it to the value
    const fieldValue =
      item && item.type === "link" && item.base_url
        ? `${item.base_url}${value}`
        : value;

    setFormData((prev) => ({
      ...prev,
      [name]: fieldValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Filter out fields with undefined values
    const fieldsToSend = leadFormData
      .filter((field) => field.is_active && formData[field.title] !== undefined)
      .map((field) => {
        // The check for base_url and 'link' type is included when constructing the payload for submission
        const value = formData[field.title];

        return {
          title: field.title,
          value: value,
          field_type: field.type,
        };
      });

    // Construct the payload to be sent
    const formDataToSend = {
      name: formData.name,
      fields: fieldsToSend,
    };

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
            "Accept-Language": "fa",
          },
        };

        // Send PATCH request using Axios, add the formDataToSend
        const response = await axios.post(apiUrl, formDataToSend);

        if (response.status === 204) {
          toast.success(t("lead_form.toast.success"));
          setHasLeadForm(false);
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

  const handleSubmitWithUsername = async (e) => {
    e.preventDefault();

    const formDataToSend = {
      username: username,
    };

    if (pageId) {
      try {
        const apiUrl = API_ROUTES.LEAD_CONNECTIONS(pageId);

        const config = {
          headers: {
            Authorization: `Bearer ${accessToken.accessToken}`,
            "Accept-Language": "fa",
          },
        };

        const response = await axiosInstance.post(apiUrl, formDataToSend);

        if (response.status === 204) {
          toast.success(t("lead_form.toast.success"));
          setHasLeadForm(false);
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

  const getItemContentByI18n = (item) => {
    const { title, placeholder, i18n } = item;

    if (!language || !i18n || !i18n[language]) {
      return { title, placeholder };
    }

    const { title: i18nTitle, placeholder: i18nPlaceholder } = i18n[language];

    return {
      title: i18nTitle || title,
      placeholder: i18nPlaceholder || placeholder,
    };
  };

  return (
    <div>
      {leadFormData ? (
        <BottomSheetWrapper
          className={"p-2 px-4"}
          open={open}
          onClose={onClose}
        >
          <h3 className="mt-4 font-bold">
            {!hasAcount ? (
              <span>{t("lead_form.please_enter_your_data")}</span>
            ) : (
              <span>{t("lead_form.please_enter_your_username")}</span>
            )}
          </h3>
          <p className=" mt-5">
            {!hasAcount ? (
              <span onClick={() => setHasAcount(true)}>
                {t("lead_form.if_you_have_account_click_here")}
              </span>
            ) : (
              <span
                onClick={() => setHasAcount(false)}
                className="flex justify-start items-center gap-1"
              >
                <span>
                  <ArrowRight />
                </span>
                {t("lead_form.back_to_lead_form")}
              </span>
            )}
          </p>

          <>
            {hasAcount && (
              <>
                <form onSubmit={handleSubmitWithUsername}>
                  <div className="bg-lightMenu rounded-lg  mb-4 border-2 box-border overflow-hidden mt-5">
                    <div className="flex justify-start items-center py-3">
                      <label
                        className="font-medium text-sm border-e-2 text-muted me-2 pe-2 ps-4"
                        htmlFor="username"
                      >
                        {t("lead_form.username")}
                      </label>
                      <input
                        required={true}
                        id="username"
                        name="username"
                        // value={formData.name}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder={t("lead_form.username_placeholder")}
                        className="bg-lightMenu outline-0 py-1 text-sm font-medium "
                      />
                    </div>
                  </div>
                  {/* button */}
                  <button
                    type="submit"
                    className="flex items-center justify-center w-full
                        bg-dark text-white py-3 leading-0 rounded-lg mt-5 mb-5"
                  >
                    {t("lead_form.save")}
                  </button>
                </form>
              </>
            )}
            {/* code input field */}

            {!hasAcount && (
              <form onSubmit={handleSubmit} className="py-5">
                {/* inputs */}

                {/* name */}
                <div className="bg-lightMenu rounded-lg  mb-4 border-2 box-border overflow-hidden">
                  <div className="flex justify-start items-center py-3">
                    <label
                      className="font-medium text-sm border-e-2 text-muted me-2 pe-2 ps-4"
                      htmlFor="data_inp"
                    >
                      {t("lead_form.first_name")}
                    </label>
                    <input
                      required={true}
                      id="data_inp"
                      name="name"
                      // value={formData.name}
                      onChange={handleChange}
                      placeholder={t("lead_form.first_name_placeholder")}
                      className="bg-lightMenu outline-0 py-1 text-sm font-medium "
                    />
                  </div>
                </div>

                {leadFormData
                  .filter((item) => item.is_active)
                  .map((item) => {
                    const { title, placeholder } = getItemContentByI18n(item);

                    return (
                      <div
                        key={item.id}
                        className="bg-lightMenu rounded-lg mb-4 border-2 box-border overflow-hidden"
                      >
                        <div className="flex justify-start items-center py-3">
                          <label
                            className="font-medium text-sm border-e-2 text-muted me-2 pe-2 ps-4"
                            htmlFor={`input_${item.id}`}
                          >
                            {title}
                          </label>
                          <input
                            id={`input_${item.id}`}
                            name={item.title}
                            onChange={(e) => handleChange(e, item)}
                            placeholder={placeholder}
                            className="bg-lightMenu outline-0 py-1 text-sm font-medium"
                            value={
                              item.type === "link" &&
                              item.base_url &&
                              formData[item.title]
                                ? formData[item.title].replace(
                                    item.base_url,
                                    ""
                                  )
                                : formData[item.title] || ""
                            }
                          />
                        </div>
                      </div>
                    );
                  })}

                {/* button */}
                <button
                  type="submit"
                  className="flex items-center justify-center w-full
                      bg-dark text-white py-3 leading-0 rounded-lg mt-7"
                >
                  {t("lead_form.save")}
                </button>
              </form>
            )}
          </>
        </BottomSheetWrapper>
      ) : (
        <LoadingState />
      )}
    </div>
  );
};

export default LeadForm;
