import Footer from '@/components/Footer'
import HeaderTwo from '@/components/HeaderTwo'
import Layout from '@/components/Layout'
import axiosInstance from '@/services/axiosInterceptors';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useAccessToken } from '../../../../context/AccessTokenContext';
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
  const accessToken = useAccessToken();

  const [refresh, setRefresh] = useState(false);

  // 🔹 آیتم‌های همین کتگوری
  const [items, setItems] = useState([]);

  // 🔹 آیتم‌های موجود کل کاتالوگ
  const [existingItems, setExistingItems] = useState([]);
  const [loadingExisting, setLoadingExisting] = useState(false);
  const [search, setSearch] = useState('');
  const [modalItemExisting, setModalItemExisting] = useState(false)
  const {
    title,
    setTitle,
    content,
    setContent,
    imageFile,
    setImageFile,
    error,
    catalogCreated,
    setCatalogCreated
  } = useCatalogStates();

  const { isModalOpen, mode, targetData, openModal, closeModal } = useModalStore();

  const {
    handleCreateItem,
    handleEditModalItems,
    handleDeleteModalItems
  } = useCatalogsApi(
    title,
    catalog_id,
    null,
    imageFile,
    targetData,
    content,
    accessToken,
    null,
    null,
    setRefresh,
    refresh
  );

  const { moveCard } = useCatalogActions(
    items,
    setItems,
    setImageFile,
    null,
  );

  // ===============================
  // گرفتن آیتم‌های همین کتگوری
  // ===============================

  const handleGetCategoryItems = async () => {
    try {
      const apiUrl = API_ROUTES.CATEGORY_ITEM_GET(catalog_id, category_id);

      const response = await axiosInstance.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken.accessToken}`,
          "accept-language": "fa",
        },
      });

      setItems(response.data);
      setRefresh(false);

    } catch (error) {
      if (error.response?.status === 401) {
        router.push("/registration/signIn/loginUser");
      }
    }
  };

  useEffect(() => {
    if (catalog_id && category_id) {
      handleGetCategoryItems();
    }
  }, [catalog_id, category_id, refresh]);

  // ===============================
  // گرفتن آیتم‌های موجود
  // ===============================

  const handleGetExistingItems = async () => {
    try {
      setLoadingExisting(true);

      const apiUrl = API_ROUTES.CATALOG_ITEM(catalog_id);

      const response = await axiosInstance.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken.accessToken}`,
          "accept-language": "fa",
        },
      });

      setExistingItems(response.data);

    } catch (error) {
      console.error("خطا در گرفتن آیتم‌های موجود:", error);
    } finally {
      setLoadingExisting(false);
    }
  };

  useEffect(() => {
  
      handleGetExistingItems();
  }, []);

  // ===============================
  // افزودن آیتم موجود به کتگوری
  // ===============================

  const handleAddExistingItem = async (itemId) => {
    try {

      const apiUrl = API_ROUTES.ADD_EXISTING_ITEM_TO_CATEGORY(
        catalog_id,
        category_id,
        itemId
      );

      await axiosInstance.post(
        apiUrl,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken.accessToken}`,
            "accept-language": "fa",
          },
        }
      );

      setRefresh(true);
      closeModal();

    } catch (error) {
      console.error("خطا در افزودن آیتم موجود:", error);
    }
  };

  // ===============================
  // Confirm edit/delete
  // ===============================

  const handleConfirm = () => {
    if (mode === 'edit') {
      handleEditModalItems();
    }
    if (mode === 'delete') {
      handleDeleteModalItems();
    }
    closeModal();
  };

  console.log(existingItems, 'existingItems')
  return (
    <>
      <HeaderTwo />
      <Layout>

        <h1>آیتم های مربوط به کتگوری</h1>

        <DndContextProvider>
          <div className='max-h-[70vh] overflow-y-auto'>

            {items.map((item, index) => (
              <DraggableCategoryCard
                key={item.id}
                item={item}
                index={index}
                moveCard={moveCard}
                onEdit={() => openModal('edit', { category_id: item.id })}
                onClose={() => openModal('delete', { category_id: item.id })}
                showHighlight
              />
            ))}

          </div>

          <IconButton
            color="primary"
            onClick={() => openModal('selectAddType')}
            sx={{
              width: '100%',
              background: 'white',
              borderRadius: 5,
              marginTop: 2
            }}
          >
            <AddIcon sx={{ color: '#D1AB48' }} />
          </IconButton>

        </DndContextProvider>

      </Layout>

      <Footer />

      <CatalogDialogs
        // create
        catalogCreated={catalogCreated}
        setCatalogCreated={setCatalogCreated}
        handleCreateCategoryOrItem={handleCreateItem}
modalItemExisting={modalItemExisting}
setModalItemExisting={setModalItemExisting}
        // edit/delete
        isModalOpen={isModalOpen}
        mode={mode}
        closeModal={closeModal}
        handleConfirm={handleConfirm}
        item_id={targetData?.category_id}
        catalog_id={catalog_id}
        category_id={category_id}

        // form
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        handleFileChange={(file) => setImageFile(file)}
        error={error}

        // existing
        existingItems={existingItems}
        loadingExisting={loadingExisting}
        search={search}
        setSearch={setSearch}
        items={items}
        handleAddExistingItem={handleAddExistingItem}
      />

    </>
  );
}
