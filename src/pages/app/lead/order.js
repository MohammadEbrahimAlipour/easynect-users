import Faq from '@/components/editProfile/Faq'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Layout from '@/components/Layout'
import { API_ROUTES } from '@/services/api'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useAccessToken } from '../../../../context/AccessTokenContext'
import axiosInstance from '@/services/axiosInterceptors'
import CardFormLead from '@/components/card/pages/CardFormLead'
import { IconButton } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import { toast } from "react-toastify";
import HeaderTwo from '@/components/HeaderTwo'

export default function Order() {
    const router = useRouter();
    const accessToken = useAccessToken()
    const id = router.query.id;
    const form_id = router.query.form_id;
    const [data, setData] = useState([]);
    const handleApiSubmit = async () => {
        if (!form_id) {
            toast.error('فرم سفارش وجود ندارد');
            setData({
                "fields": [
                    {
                        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                        "title": "string",
                        "is_required": true,
                        "order": 0,
                        "placeholder": "string",
                        "s3_icon_url": "string",
                        "type": "link"
                    }
                ],
                "note": "string",
                "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
            })
            return;
        }
        const apiUrl = API_ROUTES.FORM_LEAD(id, form_id);
        try {
            const response = await axiosInstance.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${accessToken.accessToken}`,
                    // Don't set Content-Type manually
                },
            });

            setData(response.data);


        } catch (error) {
            console.error('Error uploading data:', error);
            toast.error('ارسال اطلاعات با مشکل مواجه شد');


        }
    }
    const handleDeleteModal = (field_id) => {
        const apiUrl = API_ROUTES.DELETE_FORM_LEAD(id, form_id, field_id);
        console.log(apiUrl, 'apiUrl')
        axiosInstance
            .delete(apiUrl, {
                headers: {
                    Authorization: `Bearer ${accessToken.accessToken}`,
                    "accept-language": "fa",
                    suppress404Toast: true,
                },
            })
            .then((response) => {
                console.log(response.data, 'response');
                toast.success('فیلد با موفقیت حذف شد');

            })
            .catch((error) => {
                console.log(error)
                toast.error('حذف فیلد با مشکل مواجه شد');
            });
    };

    const handleEditModal = async (field_id, title) => {
        console.log(field_id, title, 'field_id, title')
        const apiUrl = API_ROUTES.DELETE_FORM_LEAD(id, form_id, field_id);
        console.log(apiUrl, 'apiUrl')
        axiosInstance
            .patch(apiUrl, { title: title }, {
                headers: {
                    Authorization: `Bearer ${accessToken.accessToken}`,
                    "accept-language": "fa",
                    suppress404Toast: true,
                },
            })
            .then((response) => {
                console.log(response.data, 'response');
                toast.success('فیلد با موفقیت بروزرسانی شد');

            })
            .catch((error) => {
                console.log(error)
                toast.error('بروزرسانی فیلد با مشکل مواجه شد');
            });
    }
   useEffect(() => {
  if (id && form_id) {
    handleApiSubmit();
  }
}, [id, form_id]);

    console.log(data, 'datas')
    return (
        <main>
            <HeaderTwo />
            <Layout className="!px-4 !pt-6">
                <CardFormLead data={data} handleDeleteModal={handleDeleteModal} handleEditModal={handleEditModal} />
                <IconButton color="primary" onClick={() => router.push(`/app/lead/createdOrder?type=${data?.fields?.length}&id=${id}&formId=${form_id}`)} aria-label="add" sx={{ width: '100%', background: 'white', borderRadius: 5, marginTop: 2, justifyContent: 'center', alignItems: 'center' }}>
                    <AddIcon sx={{ color: '#D1AB48' }} />
                </IconButton>
            </Layout>
            <Footer />
        </main>
    )
}
