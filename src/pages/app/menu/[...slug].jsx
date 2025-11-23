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
import { useModalStore } from '@/store/modalStore';
import CatalogDialogs from '@/components/menu/CatalogDialogs';
import useCatalogStates from '@/hooks/catalogs/useCatalogStates';
import useCatalogsApi from '@/hooks/catalogs/useCatalogsApi';
import useCatalogActions from '@/hooks/catalogs/useCatalogActions';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';


export default function Menu() {
    const router = useRouter();
    const slug = router.query.slug || [];
    const [catalog_id, category_id] = slug || [];
    const [refresh, setRefresh] = useState(false);

    const {
        setCardData,
        setIsLoading,
        setIdFromServer,
        pageDataDontExist,
        setPageDAtaDontExist,
        title,
        setTitle,
        catalog,
        setCatalog,
        catalogId,
        setCatalogId,
        tabValue,
        setabValue,
        catalogCreated,
        setCatalogCreated,
        items,
        setItems,
        content,
        setContent,
        imageFile,
        setImageFile,
        error
    } = useCatalogStates();
    const accessToken = useAccessToken();
    const openModal = useModalStore((s) => s.openModal);
    const { isModalOpen, mode, targetData, closeModal } = useModalStore();
    const { convertFileToBase64,
        handleFileChange,
        handleClose,
        moveCard } = useCatalogActions(items, setItems, setImageFile, setPageDAtaDontExist,)

    console.log(imageFile, 'imageFile')
    const { handleCreateItem,
        handleEditModalItems,
        handleDeleteModalItems } = useCatalogsApi(title, catalog_id, tabValue, imageFile, targetData, content, accessToken, setCardData, setIsLoading, setIdFromServer, setRefresh, refresh);
    const handleConfirm = () => {
        if (mode === 'edit') {
            handleEditModalItems();
        } else if (mode === 'delete') {
            handleDeleteModalItems();
        }
        closeModal();
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
                setRefresh(false);

            })
            .catch((error) => {

                if (error.response && error.response.status === 401) {
                    router.push("/registration/signIn/loginUser");
                } else {
                    console.error("Error fetching data:", error);
                }
            });
    }
    const handleToggleHighlight = async (itemId) => {
        try {
            const apiUrl = API_ROUTES.ITEM_UPDATE_HIGHLIGHTED(catalog_id, category_id, itemId);
            const res = await axiosInstance.get(
                apiUrl,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken.accessToken}`,
                        "accept-language": "fa",
                        suppress404Toast: true,
                    },
                }
            );

            // آیتم مورد نظر را در لیست بروزرسانی کن
            setItems((prev) =>
                prev.map((item) =>
                    item.id === itemId
                        ? { ...item, is_highlighted: !item.is_highlighted }
                        : item
                )
            );
        } catch (error) {
            console.error("❌ خطا در تغییر وضعیت هایلایت:", error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await handleGetCategoryItems();
        };
        if (catalog_id, category_id) fetchData();
    }, [catalog_id, category_id, refresh]);

    return (
        <>
            <HeaderTwo />
            <Layout>
                <div>
                    <h1>
                        آیتم های مربوط به کتگوری
                    </h1>
                    <DndContextProvider>
                        <div className='max-h-[70vh] overflow-y-auto'>
                            {items.map((item, index) => (

                                <DraggableCategoryCard
                                    key={item.id}
                                    item={item}
                                    index={index}
                                    moveCard={moveCard}
                                    onEdit={(id) => openModal('edit', { category_id: item.id })}
                                    onClose={(id) => openModal('delete', { category_id: item.id })}
                                    onToggleHighlight={handleToggleHighlight} // ✅ اضافه شد
                                    showHighlight={true}
                                />

                            ))}
                        </div>
                        <IconButton color="primary" onClick={() => { setCatalogCreated(true) }} aria-label="add" sx={{ width: '100%', background: 'white', borderRadius: 5, marginTop: items ? 2 : 8, justifyContent: 'center', alignItems: 'center' }}>
                            <AddIcon sx={{ color: '#D1AB48' }} />
                        </IconButton>
                    </DndContextProvider>



                </div>
            </Layout>
            <Footer />
            <CatalogDialogs
                item_id={targetData?.category_id}
                catalog_id={catalog_id}
                category_id={category_id}
                handleClose={handleClose}
                handleCreateCategoryOrItem={handleCreateItem}
                catalogCreated={catalogCreated}
                setCatalogCreated={setCatalogCreated}
                tabValue={tabValue}
                title={title}
                setTitle={setTitle}
                content={content}
                setContent={setContent}
                handleFileChange={handleFileChange}
                error={error}
                isModalOpen={isModalOpen}
                mode={mode}
                closeModal={closeModal}
                handleConfirm={handleConfirm}
            />
        </>
    )
}
