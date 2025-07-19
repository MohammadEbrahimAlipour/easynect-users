import Footer from '@/components/Footer'
import HeaderTwo from '@/components/HeaderTwo'
import Layout from '@/components/Layout'
import axiosInstance from '@/services/axiosInterceptors';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useAccessToken } from '../../../../context/AccessTokenContext';
import CatalogCard from '@/components/card/pages/CatalogCard';
import { API_ROUTES } from '@/services/api';
import DraggableCategoryCard from '@/components/dnd/DraggableCategoryCard';
import DndContextProvider from '@/components/dnd/DndContext';


export default function Menu() {
    const router = useRouter();
    const slug = router.query.slug || [];
    const [catalog_id, category_id] = slug || [];
    const [items, setItems] = useState([]);
    const accessToken = useAccessToken();
    const moveCard = (fromIndex, toIndex) => {
        const updated = [...items];
        const [moved] = updated.splice(fromIndex, 1);
        updated.splice(toIndex, 0, moved);
        setItems(updated);
    };
    const handleGetCategoryItems = () => {
        const apiUrl = API_ROUTES.CATEGORY_ITEM_GET(catalog_id, category_id);
        axiosInstance
            .get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${accessToken.accessToken}`,
                    "accept-language": "fa", // Include the access token in the headers
                    suppress404Toast: true,
                },
            })
            .then((response) => {

                setItems(response.data);


            })
            .catch((error) => {

                if (error.response && error.response.status === 401) {
                    router.push("/registration/signIn/loginUser");
                } else {
                    console.error("Error fetching data:", error);
                }
            });
    }

    useEffect(() => {
        const fetchData = async () => {
            await handleGetCategoryItems();
        };
        if (catalog_id, category_id) fetchData();
    }, [catalog_id, category_id]);

    return (
        <>
            <HeaderTwo />
            <Layout>
                <div>

                    <DndContextProvider>
                        {items.map((item, index) => (

                            <DraggableCategoryCard
                                // onClick={() => router.push(`/app/menu`)}
                                key={item.id}
                                item={item}
                                index={index}
                                moveCard={moveCard}
                                // onEdit={(id) => openModal('edit', { category_id: item.id })}
                                // onClose={(id) => openModal('delete', { category_id: item.id })}
                                onClose={(id) => console.log(id)}
                                onEdit={(id) => console.log(id)}
                            />
                        ))}
                    </DndContextProvider>



                </div>
            </Layout>
            <Footer />

        </>
    )
}
