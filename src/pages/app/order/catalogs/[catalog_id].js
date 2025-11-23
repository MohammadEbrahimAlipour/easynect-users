"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAccessToken } from "../../../../../context/AccessTokenContext";
import { API_ROUTES } from "@/services/api";
import Head from "next/head";
import Header from "@/components/Header";
import Layout from "@/components/Layout";
import Footer from "@/components/Footer";
import axiosInstance from "@/services/axiosInterceptors";

const CatalogPage = () => {
    const router = useRouter();
    const { catalog_id } = router.query;
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);
    const accessToken = useAccessToken();

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                if (!catalog_id) return;

                const apiUrl = API_ROUTES.GET_INVOICES_CATALOG_ID(catalog_id);

                const res = await axiosInstance.get(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${accessToken.accessToken}`,
                        "accept-language": "fa",
                        suppress404Toast: true,
                    },
                });

                setInvoices(res.data);
            } catch (error) {
                console.error("Error fetching pages:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchInvoices();
    }, [accessToken]);



    return (
        <>
            <Head>
                <title>ایزی‌نکت - پروفایل‌ها</title>
            </Head>
            <Header />
            <Layout className="!px-9 py-6">
                <div className="p-6">
                    <h1 className="text-xl font-bold mb-4">فاکتورها</h1>
                    {loading ? (
                        <p>در حال بارگذاری...</p>
                    ) : invoices.length === 0 ? (
                        <p>هیچ فاکتوری یافت نشد</p>
                    ) : (
                        invoices?.map((invoice) => (
                            <div
                                key={invoice.id}
                                className="border rounded-lg p-4 mb-3 flex justify-between items-center"
                            >
                                <div>
                                    <p>یادداشت: {invoice.note}</p>
                                    <p>
                                        وضعیت:{" "}
                                        {invoice.is_done ? (
                                            <span className="text-green-600">انجام شده</span>
                                        ) : (
                                            <span className="text-red-500">در انتظار</span>
                                        )}
                                    </p>
                                    <p>تاریخ: {new Date(invoice.created_at).toLocaleString("fa-IR")}</p>
                                </div>
                                <button
                                    onClick={() =>
                                        router.push(`/app/order/catalogs/${catalog_id}/invoices/${invoice.id}`)
                                    }
                                    className="text-blue-600 underline"
                                >
                                    مشاهده جزئیات
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </Layout >
            <Footer />
        </>
    );
};

export default CatalogPage;
