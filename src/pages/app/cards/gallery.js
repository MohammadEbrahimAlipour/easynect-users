import Faq from '@/components/editProfile/Faq'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Layout from '@/components/Layout'
import { API_ROUTES } from '@/services/api'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useAccessToken } from '../../../../context/AccessTokenContext'
import axiosInstance from '@/services/axiosInterceptors'
import { toast } from "react-toastify";
import GalleryUploader from '@/components/editProfile/GalleryUploader'
import { generateApiUrl } from '@/components/ApiUr'
import axios from 'axios'

export default function Gallery() {
    const router = useRouter();
    const accessToken = useAccessToken()
    const id = router.query?.id;

    const handleRouterBack = () => {
        window.history.back();
    }
    const handleApiSubmit = async (images) => {
        if (!images || images.length === 0) {
            toast.error("لطفاً حداقل یک تصویر انتخاب کنید");
            return;
        }

        const apiUrl = API_ROUTES.CONTENTS_GALLERY(id);
        const formData = new FormData();

        images.forEach((file) => {
            formData.append("gallery", file); // اسم دقیقا همون که API گفته
        });

        try {
            const response = await axiosInstance.post(apiUrl, formData, {
                headers: {
                    Authorization: `Bearer ${accessToken.accessToken}`,
                    "Accept-Language": "fa",
                },
            });

            toast.success("با موفقیت ذخیره شد", {
                position: "top-center",
                autoClose: 2500,
            });

            setTimeout(() => {
                window.history.back();
            }, 2500);

        } catch (error) {
            console.error("Error uploading data:", error);
            toast.error("ارسال اطلاعات با مشکل مواجه شد");
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            const apiUrl = generateApiUrl(`/api/v1/page_view/${id}`);

            const response = await axios.get(apiUrl, {
                headers: {
                    "Accept-Language": "fa", // Language header
                },
            });

            const { data } = response;
            console.log(data, 's')
        }
        fetchData();

    }, [])
    return (
        <main>
            <Header />
            <Layout className="!px-4 !pt-6">
                <GalleryUploader handleApiSubmit={handleApiSubmit} handleRouterBack={handleRouterBack} />

            </Layout>
            <Footer />
        </main>
    )
}
