"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAccessToken } from "../../../../../../../context/AccessTokenContext";
import axiosInstance from "@/services/axiosInterceptors";
import { API_ROUTES } from "@/services/api";
import Head from "next/head";
import Header from "@/components/Header";
import Layout from "@/components/Layout";
import Footer from "@/components/Footer";

const InvoicePage = () => {
  const router = useRouter();
  const { catalog_id, invoice_id } = router.query;
  const accessToken = useAccessToken();

  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (!catalog_id || !invoice_id || !accessToken?.accessToken) return;

    const fetchInvoice = async () => {
      try {
        setLoading(true);

        const apiUrl = API_ROUTES.GET_INVOICES_CATALOG_ID_INVOICE_ID(
          catalog_id,
          invoice_id
        );

        const res = await axiosInstance.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${accessToken.accessToken}`,
            "accept-language": "fa",
            suppress404Toast: true,
          },
        });

        setInvoice(res.data);
      } catch (error) {
        console.error("❌ خطا در دریافت فاکتور:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [catalog_id, invoice_id, accessToken]);

  const handleToggleDone = async () => {
    if (!invoice || !accessToken?.accessToken) return;

    try {
      setUpdating(true);

      const apiUrl =
        API_ROUTES.PATCH_INVOICES_CATALOG_ID_INVOICE_ID_IS_DONE(
          catalog_id,
          invoice_id
        );

      const res = await axiosInstance.patch(
        apiUrl,
        {
          note: invoice.note,
          is_done: !invoice.is_done,
          items: invoice.items,
          fields: invoice.fields,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken.accessToken}`,
            "accept-language": "fa",
            suppress404Toast: true,
          },
        }
      );


    } catch (error) {
      console.error("❌ خطا در بروزرسانی فاکتور:", error);
    } finally {
      setUpdating(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64 text-gray-600">
        در حال بارگذاری...
      </div>
    );

  if (!invoice)
    return (
      <div className="p-6 text-center text-red-500">فاکتور یافت نشد.</div>
    );

  return (
    <>
      <Head>
        <title>ایزی‌نکت - جزئیات فاکتور</title>
      </Head>
      <Header />
      <Layout className="!px-9 py-10">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8">
          <div className="flex items-center justify-between mb-6 border-b pb-4">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              جزئیات فاکتور
            </h1>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                invoice.is_done
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {invoice.is_done ? "انجام شده" : "در انتظار"}
            </span>
          </div>

          {/* یادداشت */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
              یادداشت
            </h2>
            <p className="text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg leading-relaxed">
              {invoice.note || "ندارد"}
            </p>
          </div>

          {/* آیتم‌ها */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
              آیتم‌ها
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {invoice.items?.map((item) => (
                <div
                  key={item.id}
                  className="border rounded-xl p-4 flex items-start gap-4 hover:shadow-md transition"
                >
                  <img
                    src={item.banner}
                    alt={item.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="text-gray-800 dark:text-gray-100 font-semibold text-lg">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">
                      {item.description}
                    </p>
                    <span className="text-sm text-blue-500">
                      تعداد: {item.count}
                    </span>
                  </div>
                </div>
              )) || <p>موردی وجود ندارد</p>}
            </div>
          </div>

          {/* فیلدها */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
              فیلدها
            </h2>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
              {invoice.fields?.length ? (
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  {invoice.fields.map((field) => (
                    <li
                      key={field.id}
                      className="flex justify-between py-2 text-gray-700 dark:text-gray-300"
                    >
                      <span className="font-medium">{field.title}</span>
                      <span>{field.value}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">هیچ فیلدی ثبت نشده است.</p>
              )}
            </div>
          </div>

          {/* دکمه تغییر وضعیت */}
          <div className="flex justify-end mt-8">
            <button
              onClick={handleToggleDone}
              disabled={updating}
              className={`px-5 py-2 rounded-lg font-semibold text-white transition ${
                updating
                  ? "bg-gray-400"
                  : "bg-blue-600 hover:bg-blue-700 active:scale-95"
              }`}
            >
              {updating ? "در حال بروزرسانی..." : "تغییر وضعیت فاکتور"}
            </button>
          </div>
        </div>
      </Layout>
      <Footer />
    </>
  );
};

export default InvoicePage;
