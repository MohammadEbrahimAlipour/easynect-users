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
    generateApiUrl(`/api/v1/connections/make_connections_by_lead/${pageId}`),
  // Cataloge

  CATALOG_DEPONDS_PAGE: (id) => generateApiUrl(`/api/v1/catalogs/page/${id}`),

  CATALOGS_CATEGORY: (catalog_id) => generateApiUrl(`/api/v1/catalogs/${catalog_id}/category/`),

  CATALOG_RECORDER: (catalog_id) => generateApiUrl(`/api/v1/${catalog_id}/category/reorder/`),

  CATALOG_REMOVE: (catalog_id, category_id) => generateApiUrl(`/api/v1/catalogs/${catalog_id}/category/${category_id}`),

  CATALOG_UPDATE: (catalog_id, category_id) => generateApiUrl(`/api/v1/catalogs/${catalog_id}/category/${category_id}`),

  GET_INVOICE: (id) => generateApiUrl(`/api/v1/catalogs/${catalog_id}/invoices/`),

  POST_INVOICE_FORM: (id) => generateApiUrl(`/api/v1/catalogs/${catalog_id}/invoices/form/`),

  ADD_INVOICE_FORM_FIELD: (Cid, form_id) => generateApiUrl(`/api/v1/catalogs/${Cid}/invoices/form/${form_id}`),
  CREATE_NEW_INVOICE_USER: (Cid, form_id) => generateApiUrl(`/api/v1/catalogs/customers/${Cid}/invoices/${form_id}`),

  // items
  CATALOG_ITEM: (catalog_id) => generateApiUrl(`/api/v1/catalogs/${catalog_id}/items/`),

  CATALOG_UPDATE_ITEM: (catalog_id, category_id) => generateApiUrl(`/api/v1/catalogs/${catalog_id}/items/${category_id}`),

  CATALOG_REMOVE_ITEM: (catalog_id, category_id) => generateApiUrl(`/api/v1/catalogs/${catalog_id}/items/${category_id}/`),

  CATALOG_DEPONDS_ITEM: (catalog_id) => generateApiUrl(`/api/v1/catalogs/${catalog_id}/items/`),
  // category item

  CATEGORY_ITEM_GET: (catalog_id, category_id) => generateApiUrl(`/api/v1/catalogs/${catalog_id}/category/${category_id}/`),

  CATEGORY_CREATED: (catalog_id) => generateApiUrl(`/api/v1/catalogs/${catalog_id}/category/`),

  ITEM_CREATED: (catalog_id) => generateApiUrl(`/api/v1/catalogs/${catalog_id}/items/`),


  ITEMS_GET: (catalog_id, item_id) => generateApiUrl(`/api/v1/catalogs/${catalog_id}/items/${item_id}`),
  ITEM_UPDATE_HIGHLIGHTED: (catalog_id, category_id, item_id) => generateApiUrl(`/api/v1/catalogs/${catalog_id}/category/${category_id}/is_highlighted/${item_id}/`),

  // lead capture store
  LEAD_CAPTURE_STORE: () => generateApiUrl(`/api/v1/lead_capture_store/`),

  LEAD_CAPTURE_STORE_ID: (id) => generateApiUrl(`/api/v1/lead_capture_store/${id}`),
  // contents
  CONTENTS_FAQ: (pageId) => generateApiUrl(`/api/v1/contents/page/${pageId}/faqs/`),
  DELETE_FAQ: (page_id, faq_id) => generateApiUrl(`/api/v1/contents/page/${page_id}/faqs/${faq_id}`),
  //pages
  CONTENTS_GALLERY: (pageId) => generateApiUrl(`/api/v1/pages/${pageId}/gallery/create/`),
  GET_GALLERY: (page_id) => generateApiUrl(`/api/v1/pages/${page_id}/gallery/`),
  ADD_GALLERY: (page_id) => generateApiUrl(`/api/v1/pages/${page_id}/gallery/`),
  DELETE_FROM_GALLERY :(page_id, gallery_id) => generateApiUrl(`/api/v1/pages/${page_id}/gallery/${gallery_id}/`),

  // form lead
  FORM_LEAD: (catalog_id, form_id) => generateApiUrl(`/api/v1/catalogs/${catalog_id}/invoices/form/${form_id}`),
  DELETE_FORM_LEAD: (catalog_id, form_id, field_id) => generateApiUrl(`/api/v1/catalogs/${catalog_id}/invoices/form/${form_id}/${field_id}`),
  ADD_INVOICE_FORM_FIELD: (catalog_id, form_id) => generateApiUrl(`/api/v1/catalogs/${catalog_id}/invoices/form/${form_id}`),
  ADD_CUSTOM_FROM_INVOICE: (catalog_id, form_id) => generateApiUrl(`/api/v1/catalogs/customers/${catalog_id}/invoices/${form_id}`),
  UPDATE_FORM_LEAD: (catalog_id, form_id, field_id) => generateApiUrl(`/api/v1/catalogs/${catalog_id}/invoices/form/${form_id}/field/${field_id}`)
  ,
  // analytics

  ANALYTICS_CATALOG_ITEMS_TOTAL_TAP: (catalog_id) => generateApiUrl(`/api/v1/analytics/catalogs/get_catalog_items_total_tap/${catalog_id}`),
  ANALYTICS_CATALOG_TOTAL_VIEW: (catalog_id) => generateApiUrl(`/api/v1/analytics/catalogs/get_catalog_items_total_tap/${catalog_id}`),
  ANALYTICS_VIEW_BASES_DATE_RANGE: (catalog_id) => generateApiUrl(`/api/v1/analytics/catalogs/get_catalog_view_based_on_date_range/${catalog_id}`),
  ANALYTICS_ITEM_TAB_BASES_DATE_RANGE: (catalog_id) => generateApiUrl(`/api/v1/analytics/catalogs/get_list_items_taps_based_on_date_range/${catalog_id}`),
  ANALYSTICS_POST_CATALOG: (catalog_id) => generateApiUrl(`/api/v1/analytics/catalogs/view/${catalog_id}`),
  ANALYSTICS_POST_ITEMS: (item_id) => generateApiUrl(`/api/v1/analytics/catalogs/items/tap/${item_id}`),

  //theme 
  CREATE_THEME: (page_id) => generateApiUrl(`/api/v1/pages/${page_id}/theme/`),
  GET_THEME: (page_id) => generateApiUrl(`/api/v1/pages/${page_id}/theme/`),
  // ثبت سفارش
  GET_ORDER: (catalog_id) => generateApiUrl(`/api/v1/catalogs/customer/${catalog_id}/`),
  RECORD_FORM_ORDER: (catalog_id, form_id) => generateApiUrl(`/api/v1/catalogs/customer/${catalog_id}/invoice/${form_id}`)
  // subs
  ,GET_PLANS: () => generateApiUrl('/api/v1/subs/plans'),
  GET_SUBSCRIPTION: (sub_id) => generateApiUrl(`/api/v1/subs/${sub_id}`),
  RENEW_SUB: (sub_id) => generateApiUrl(`/api/v1/subs/${sub_id}`),

  //invoices
  GET_INVOICES_CATALOG_ID: (catalog_id) => generateApiUrl(`/api/v1/catalogs/${catalog_id}/invoices/`),
  GET_INVOICES_CATALOG_ID_INVOICE_ID: (catalog_id, invoice_id) => generateApiUrl(`/api/v1/catalogs/${catalog_id}/invoices/${invoice_id}/`),
  PATCH_INVOICES_CATALOG_ID_INVOICE_ID_IS_DONE: (catalog_id, invoice_id) => generateApiUrl(`/api/v1/catalogs/${catalog_id}/invoices/${invoice_id}/is_done/`)
};
