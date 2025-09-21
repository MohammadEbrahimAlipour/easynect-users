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
  theme,
}) => {
  const accessToken = useAccessToken();

  const [hasAcount, setHasAcount] = useState(false);
  const [username, setUsername] = useState("");

  const [formData, setFormData] = useState({
    name: "",
  });

  const { t } = useTranslation();

  const handleChange = (e, item) => {
    const { name, value } = e.target;

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
    const fieldsToSend = leadFormData
      .filter((field) => field.is_active && formData[field.title] !== undefined)
      .map((field) => {
        const value = formData[field.title];
        return {
          title: field.title,
          value: value,
          field_type: field.type,
        };
      });

    const formDataToSend = {
      name: formData.name,
      fields: fieldsToSend,
    };

    if (pageId) {
      try {
        const apiUrl = generateApiUrl(`/api/v1/contacts/lead_capture/${pageId}`);
        const response = await axios.post(apiUrl, formDataToSend, {
          headers: {
            Authorization: `Bearer ${accessToken.accessToken}`,
            "Accept-Language": "fa",
          },
        });

        if (response.status === 204) {
          toast.success(t("lead_form.toast.success"));
          setHasLeadForm(false);
        }
      } catch (error) {
        toast.error(
          error?.response?.data?.detail || "Error: An error occurred."
        );
      }
    }
  };

  const handleSubmitWithUsername = async (e) => {
    e.preventDefault();
    const formDataToSend = { username };

    if (pageId) {
      try {
        const apiUrl = API_ROUTES.LEAD_CONNECTIONS(pageId);
        const response = await axiosInstance.post(apiUrl, formDataToSend, {
          headers: {
            Authorization: `Bearer ${accessToken.accessToken}`,
            "Accept-Language": "fa",
          },
        });

        if (response.status === 204) {
          toast.success(t("lead_form.toast.success"));
          setHasLeadForm(false);
        }
      } catch (error) {
        toast.error(
          error?.response?.data?.detail || "Error: An error occurred."
        );
      }
    }
  };

  const getItemContentByI18n = (item) => {
    const { title, placeholder, i18n } = item;
    if (!language || !i18n || !i18n[language]) return { title, placeholder };

    const { title: i18nTitle, placeholder: i18nPlaceholder } = i18n[language];
    return { title: i18nTitle || title, placeholder: i18nPlaceholder || placeholder };
  };

  return (
    <div>
      {leadFormData ? (
        <BottomSheetWrapper
          className="p-2 px-4"
          open={open}
          onClose={onClose}
          style={{ backgroundColor: theme.background, color: theme.cardText }}
        >
          <h3
            className="mt-4 font-bold"
            style={{ color: theme.headerText }}
          >
            {!hasAcount
              ? t("lead_form.please_enter_your_data")
              : t("lead_form.please_enter_your_username")}
          </h3>

          <p className="mt-5" style={{ color: theme.cardText }}>
            {!hasAcount ? (
              <span
                onClick={() => setHasAcount(true)}
                style={{ cursor: "pointer", color: theme.borderColor }}
              >
                {t("lead_form.if_you_have_account_click_here")}
              </span>
            ) : (
              <span
                onClick={() => setHasAcount(false)}
                className="flex justify-start items-center gap-1 cursor-pointer"
                style={{ color: theme.borderColor }}
              >
                <ArrowRight />
                {t("lead_form.back_to_lead_form")}
              </span>
            )}
          </p>

          {hasAcount ? (
            <form onSubmit={handleSubmitWithUsername}>
              <div
                className="rounded-lg mb-4 border-2 box-border overflow-hidden mt-5"
                style={{
                  backgroundColor: theme.cardBackground,
                  borderColor: theme.borderColor,
                }}
              >
                <div className="flex justify-start items-center py-3">
                  <label
                    htmlFor="username"
                    className="font-medium text-sm border-e-2 me-2 pe-2 ps-4"
                    style={{ color: theme.cardText, borderColor: theme.borderColor }}
                  >
                    {t("lead_form.username")}
                  </label>
                  <input
                    required
                    id="username"
                    name="username"
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder={t("lead_form.username_placeholder")}
                    className="outline-0 py-1 text-sm font-medium flex-1"
                    style={{
                      backgroundColor: theme.cardBackground,
                      color: theme.cardText,
                    }}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="flex items-center justify-center w-full py-3 leading-0 rounded-lg mt-5 mb-5"
                style={{
                  backgroundColor: theme.borderColor,
                  color: theme.background,
                }}
              >
                {t("lead_form.save")}
              </button>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="py-5">
              <div
                className="rounded-lg mb-4 border-2 box-border overflow-hidden"
                style={{
                  backgroundColor: theme.cardBackground,
                  borderColor: theme.borderColor,
                }}
              >
                <div className="flex justify-start items-center py-3">
                  <label
                    htmlFor="data_inp"
                    className="font-medium text-sm border-e-2 me-2 pe-2 ps-4"
                    style={{ color: theme.cardText, borderColor: theme.borderColor }}
                  >
                    {t("lead_form.first_name")}
                  </label>
                  <input
                    required
                    id="data_inp"
                    name="name"
                    onChange={handleChange}
                    placeholder={t("lead_form.first_name_placeholder")}
                    className="outline-0 py-1 text-sm font-medium flex-1"
                    style={{
                      backgroundColor: theme.cardBackground,
                      color: theme.cardText,
                    }}
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
                      className="rounded-lg mb-4 border-2 box-border overflow-hidden"
                      style={{
                        backgroundColor: theme.cardBackground,
                        borderColor: theme.borderColor,
                      }}
                    >
                      <div className="flex justify-start items-center py-3">
                        <label
                          htmlFor={`input_${item.id}`}
                          className="font-medium text-sm border-e-2 me-2 pe-2 ps-4"
                          style={{ color: theme.cardText, borderColor: theme.borderColor }}
                        >
                          {title}
                        </label>
                        <input
                          id={`input_${item.id}`}
                          name={item.title}
                          onChange={(e) => handleChange(e, item)}
                          placeholder={placeholder}
                          className="outline-0 py-1 text-sm font-medium flex-1"
                          style={{
                            backgroundColor: theme.cardBackground,
                            color: theme.cardText,
                          }}
                          value={
                            item.type === "link" &&
                            item.base_url &&
                            formData[item.title]
                              ? formData[item.title].replace(item.base_url, "")
                              : formData[item.title] || ""
                          }
                        />
                      </div>
                    </div>
                  );
                })}

              <button
                type="submit"
                className="flex items-center justify-center w-full py-3 leading-0 rounded-lg mt-7"
                style={{
                  backgroundColor: theme.borderColor,
                  color: theme.background,
                }}
              >
                {t("lead_form.save")}
              </button>
            </form>
          )}
        </BottomSheetWrapper>
      ) : (
        <LoadingState />
      )}
    </div>
  );
};

export default LeadForm;
