import Faq from '@/components/editProfile/Faq'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Layout from '@/components/Layout'
import { API_ROUTES } from '@/services/api'
import { useRouter } from 'next/router'
import React from 'react'
import { useAccessToken } from '../../../../context/AccessTokenContext'
import axiosInstance from '@/services/axiosInterceptors'
import { toast } from "react-toastify";

export default function FaqCard() {
    const router = useRouter();
    const accessToken = useAccessToken()
    const id = router.query?.id;

    const handleRouterBack = () => {
        window.history.back();
    }
    const handleApiSubmit = async (faq) => {
        const apiUrl = API_ROUTES.CONTENTS_FAQ(id);
        try {
            const response = await axiosInstance.post(apiUrl, faq, {
                headers: {
                    Authorization: `Bearer ${accessToken.accessToken}`,
                    // Don't set Content-Type manually
                },
            });

            toast.success('با موفقیت ذخیره شد', {
                position: 'top-center',
                autoClose: 2500,
              });
              
              setTimeout(() => {
                window.history.back();
              }, 2500);
            //           


        } catch (error) {
            console.error('Error uploading data:', error);
            toast.error('ارسال اطلاعات با مشکل مواجه شد');

        }
    }
    return (
        <main>
            <Header />
            <Layout className="!px-4 !pt-6">
                <Faq handleApiSubmit={handleApiSubmit} handleRouterBack={handleRouterBack} />
            </Layout>
            <Footer />
        </main>
    )
}
