import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import Footer from "@/components/Footer";
import Link from "next/link";
import { PlusSignLight, TickSuccess, Tickicon } from "@/components/Icons";
import HeaderTwo from "@/components/HeaderTwo";
import axios from "axios"; // Import Axios for making HTTP requests
import { useAccessToken } from "../../../../../context/AccessTokenContext";
import { generateApiUrl } from "@/components/ApiUr";
import { useRouter } from "next/router";
import Head from "next/head";
import { API_ROUTES } from "@/services/api";
import PaymentTable from "@/components/payment/PaymentTable";

export async function getInvoiceList(yourToken) {
    try {
        const response = await axios.get(API_ROUTES.INVOICES_INVOICE_LIST, {
            headers: {
                Authorization: `Bearer ${yourToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("خطا در دریافت لیست فاکتورها:", error);
        throw error;
    }
}

const ProfileInvoices = () => {
    const { accessToken } = useAccessToken();
    const [info, setInfo] = useState();

    const fetchInvoices = async () => {
        try {
            const invoices = await getInvoiceList(accessToken);
            setInfo(invoices)
        } catch (err) {
            // مدیریت خطا
        }
    };
    useEffect(() => {
        fetchInvoices();
    }, [])
    return (
        <>
            <Head>
                <title>ایزی‌نکت - پروفایل</title>
                <meta name="easynect business card" content="Powered by Easynect" />
            </Head>
            <HeaderTwo />
            <Layout>
                <div>
                    <h2 className="text-lg font-bold mb-4 text-center">لیست پرداخت‌ها</h2>
                    <PaymentTable data={info}/>
                </div>
            </Layout>
            <Footer />
        </>
    );
};

export default ProfileInvoices;
