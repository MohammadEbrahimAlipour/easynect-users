// services/api.js
import { generateApiUrl } from "@/components/ApiUr";

export const API_ROUTES = {
  // registration
  LOGIN: generateApiUrl(`/api/v1/login/`),

  // cards
  CARDS_PROFILE_CARD_PAGES: generateApiUrl(`/api/v1/pages/`),
  CARDS_EDIT_PROFILE_INFO_PAGES: (id) => generateApiUrl(`/api/v1/pages/${id}`),
  CARDS_MEDIASELECTION_CONTENTS_PAGE: (id) =>
    generateApiUrl(`/api/v1/contents/page/${id}`),

  CARDS_CONTENTADDITEM_CONTENT_STORE: generateApiUrl(`/api/v1/contents_store/`),

  CARDS_MEDIASETTINGHORZ_CONTENTS_STORE: (id) =>
    generateApiUrl(`/api/v1/contents_store/${id}`),

  CARDS_EDITMEDIASETTINGHORZ_CONTENTS: (id) =>
    generateApiUrl(`/api/v1/contents/${id}`),

  CARDS_CREATECARD_PAGES: generateApiUrl("/api/v1/pages/"),

  // contacts
  CONTACTS_PAGES: generateApiUrl(`/api/v1/contacts/pages/`),

  CONTACTS_UNIFIED: (pageID, skip, limit) =>
    generateApiUrl(
      `/api/v1/contacts/page/unified/${pageID}?skip=${skip}&limit=${limit}`
    ),

  // stats
  STATS_ANALYTICS_PAGES: generateApiUrl("/api/v1/analytics/pages/"),

  //   main page
  MAIN_PAGE_QRCODE_INFO: generateApiUrl("/api/v1/pages/qrcode_info/"),

  // profile
  PROFILE_CHANGE_PASSWORD: generateApiUrl("/api/v1/users/change_password/"),

  // invoices
  INVOICES_INVOICE_LIST: generateApiUrl("/api/v1/invoice/"),

  // lead
  LEAD_LEADS: (id) => generateApiUrl(`/api/v1/leads/${id}`),

  LEAD_CONNECTIONS: (pageId) =>
    generateApiUrl(`/api/v1/connections/make_connections_by_lead/${pageId}`)
};
