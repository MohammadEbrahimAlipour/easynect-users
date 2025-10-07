import Footer from '@/components/Footer'
import HeaderTwo from '@/components/HeaderTwo'
import Layout from '@/components/Layout'
import { API_ROUTES } from '@/services/api';
import React, { useEffect, useState } from 'react'
import { useAccessToken } from '../../../../context/AccessTokenContext';
import axiosInstance from '@/services/axiosInterceptors';
import { useRouter } from 'next/router';
import TabsCards from '@/components/tabs';
import { Box, IconButton, TextField, Typography } from '@mui/material';
import CatalogDialog from '@/components/dialog/CustomDialog';
import { useModalStore } from '@/store/modalStore';
import CatalogCard from '@/components/card/pages/CatalogCard';
import AddIcon from '@mui/icons-material/Add';
import HeaderTwoCustom from '@/components/HeaderTwoCustom';
import FileUploader from '@/components/fileUploader/FileUploader';

export default function Menu() {
  const router = useRouter();
  const { id } = router.query;
  const accessToken = useAccessToken();
  const [cardData, setCardData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [idFromServer, setIdFromServer] = useState(null);
  const [pageDataDontExist, setPageDAtaDontExist] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [title, setTitle] = useState('');
  const { isModalOpen, mode, targetData, closeModal } = useModalStore();
  const [catalog, setCatalog] = useState(false);
  const [catalogId, setCatalogId] = useState('')
  const [tabValue, setabValue] = useState(1);
  const [catalogCreated, setCatalogCreated] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [items, setItems] = useState([]);
  const [newCatalog, setNewCatalog] = useState(false);

  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState('');

  console.log(imageFile, 'imageFile')
  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsDataURL(file); // Reads the file as data URL (base64)

      reader.onload = () => {
        const base64 = reader.result.split(',')[1]; // Remove "data:image/png;base64," part
        resolve(base64);
      };

      reader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (file) {
      // const base64String = await convertFileToBase64(file);

      setImageFile(file);
    }
  };


  const handleClose = () => { setPageDAtaDontExist(false) }
  const moveCard = (fromIndex, toIndex) => {
    const updated = [...items];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    setItems(updated);
  };
  const columnConfig = [
    { label: 'کتگوری', value: 1, API: API_ROUTES.CATALOGS_CATEGORY, id: catalogId },
    { label: 'آیتم ها', value: 2, API: API_ROUTES.CATALOG_ITEM, id: catalogId },

  ]
  const handleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleConfirm = () => {
    if (mode === 'edit') {
      handleEditModal();
    } else if (mode === 'delete') {
      handleDeleteModal();
    }
    closeModal();
  };

  const postCardsRequest = () => {
    const apiUrl = API_ROUTES.CATALOG_DEPONDS_PAGE(id);

    axiosInstance
      .get(apiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken.accessToken}`,
          "accept-language": "fa", // Include the access token in the headers
          suppress404Toast: true,
        },
      })
      .then((response) => {
        // setCardData(response.data);
        // Set the card data directly if it's an array
        setItems([response.data]);

        setIsLoading(false);
        // Save the id from the server in the state variable
        if (response.data && response.data.length > 0) {
          setIdFromServer(response.data[0].id);
        }
      })
      .catch((error) => {
        setIsLoading(false);

        if (error.response && error.response.status === 404) {
          setPageDAtaDontExist(true); // Assuming you have this state and its setter declared
        } else if (error.response && error.response.status === 401) {
          router.push("/registration/signIn/loginUser");
        } else {
          console.error("Error fetching data:", error);
        }
      });
  };

  const handleCreateCataloge = async () => {
    const apiUrl = API_ROUTES.CATALOG_DEPONDS_PAGE(id);

    axiosInstance
      .post(apiUrl, {
        "title": title
      }, {
        headers: {
          Authorization: `Bearer ${accessToken.accessToken}`,
          "accept-language": "fa", // Include the access token in the headers
          suppress404Toast: true,
        },
      })
      .then((response) => {
        // setCardData(response.data);
        // Set the card data directly if it's an array
        setCardData(response.data);
        setRefresh(true);
        setIsLoading(false);
        // Save the id from the server in the state variable
        if (response.data && response.data.length > 0) {
          setIdFromServer(response.data[0].id);
        }
      })
      .catch((error) => {
        setIsLoading(false);
      });
  }
  const handleCreateCategoryOrItem = async () => {
    const apiUrl =
      tabValue === 1 ? API_ROUTES.CATEGORY_CREATED(catalogId) : API_ROUTES.ITEM_CREATED(catalogId);

    const formData = new FormData();
    formData.append('title', title);

    if (tabValue === 1) {
      // Category mode
      if (imageFile) {
        formData.append('icon', imageFile);
      }
    } else {
      // Item mode
      if (imageFile) {
        formData.append('banner', imageFile);
      }
      formData.append('description', content);
    }

    setIsLoading(true);

    try {
      const response = await axiosInstance.post(apiUrl, formData, {
        headers: {
          Authorization: `Bearer ${accessToken.accessToken}`,
          // Don't set Content-Type manually
        },
      });

      setCardData(response.data);
      setIsLoading(false);
      setRefresh(true)

      if (response.data && response.data.length > 0) {
        setIdFromServer(response.data[0].id);
        setCatalogCreated(false)
      }
    } catch (error) {
      setIsLoading(false);
      console.error('Error uploading data:', error);
      setCatalogCreated(false)
    }
  };


  const handleEditModal = async () => {
    const apiUrl =
      tabValue === 1
        ? API_ROUTES.CATALOG_UPDATE(catalogId, targetData.category_id)
        : API_ROUTES.CATALOG_UPDATE_ITEM(catalogId, targetData.category_id);

    const formData = new FormData();
    formData.append('title', title);

    if (tabValue === 1) {
      // دسته‌بندی (category)
      if (imageFile) {
        formData.append('icon', imageFile);
      }
    } else {
      // آیتم (item)
      if (imageFile) {
        formData.append('banner', imageFile);
      }
      formData.append('description', content);
    }

    try {
      const response = await axiosInstance.patch(apiUrl, formData, {
        headers: {
          Authorization: `Bearer ${accessToken.accessToken}`,
          // 🚫 Content-Type را دستی ست نکن
        },
      });

      console.log(response.data, 'response');
      setRefresh(true);
    } catch (error) {
      console.log(error);
    }
  };


  const handleCategoryInfo = (id) => {
    const apiUrl = API_ROUTES.CATALOGS_CATEGORY(id);
    console.log(apiUrl, 'apiUrl')
    axiosInstance
      .get(apiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken.accessToken}`,
          "accept-language": "fa",
          suppress404Toast: true,
        },
      })
      .then((response) => {
        console.log(response.data, 'response lalalay lalay lay')
        setItems(response.data);
        setRefresh(true);
      })
      .catch((error) => {
        console.log(error)
      });
  };
  const handleDeleteModal = () => {
    const apiUrl = tabValue == 1 ? API_ROUTES.CATALOG_REMOVE(catalogId, targetData.category_id) : API_ROUTES.CATALOG_REMOVE_ITEM(catalogId, targetData.category_id);
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
        console.log(response.data, 'response')
        setRefresh(true);

      })
      .catch((error) => {
        console.log(error)
      });
  };
  useEffect(() => {
    const fetchData = async () => {
      await postCardsRequest();
    };
    fetchData();
  }, [id, catalog]);
  console.log(items, 'card')
  return (
    <>
      <HeaderTwoCustom catalog={catalog} setCatalog={setCatalog} />
      <Layout>
        <div>
          {catalog && <TabsCards refresh={refresh} setRefresh={setRefresh} columnConfig={columnConfig} items={items} moveCard={moveCard} setItems={setItems} value={tabValue}
            setValue={setabValue} handleAddModal={() => setCatalogCreated(true)} />}
          {!catalog && <h1 className='pr-5 py-5'>کاتالوگ ها</h1>}
          {!catalog &&
            items.map((value, key) => (
              <CatalogCard
                invoice_form_id={value.invoice_form_id} id={value.id} card_title={value.title} key={key} handleClick={() => {
                  setCatalog(true)
                  setCatalogId(value.id);
                  handleCategoryInfo(value.id)
                }
                } />
            ))}
          {!catalog && items.length == 0 &&
            <IconButton color="primary" onClick={() => setNewCatalog(true)} aria-label="add" sx={{ width: '100%', background: 'white', borderRadius: 5, marginTop: items ? 2 : 8, justifyContent: 'center', alignItems: 'center' }}>
              <AddIcon sx={{ color: '#D1AB48' }} />
            </IconButton>
          }

        </div>
      </Layout>
      <Footer />
      <CatalogDialog
        header="جدید کاتالوگ"
        open={newCatalog}
        onClose={() => setNewCatalog(false)}
        onConfirm={handleCreateCataloge}
      >
        <TextField
          placeholder="نام"
          name="title"
          fullWidth
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </CatalogDialog>
      <CatalogDialog
        header={tabValue == 1 ? "جدید کاتالوگ" : "آیتم جدید"}
        open={catalogCreated}
        onClose={() => setCatalogCreated(false)}
        onConfirm={handleCreateCategoryOrItem}
      >
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            placeholder="نام"
            name="title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {tabValue != 1 &&
            <TextField
              placeholder="محتوا"
              variant="outlined"
              multiline
              rows={3}
              fullWidth
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />}

          <FileUploader onFileSelect={handleFileChange} />

          {error && <Typography color="error">{error}</Typography>}
        </Box>
      </CatalogDialog>
      <CatalogDialog
        header={tabValue == 1 ? "ویرایش کاتالوگ" : "ویرایش آیتم"}
        open={isModalOpen && mode === 'edit'}
        onClose={closeModal}
        onConfirm={handleConfirm}
      >
        <Box display="flex" flexDirection="column" gap={2}>

          <TextField
            
            placeholder="نام"
            name="title"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            variant="outlined"
          />
          {tabValue != 1 &&
            <TextField
              placeholder="محتوا"
              variant="outlined"
              multiline
              rows={3}
              fullWidth
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />}

          <FileUploader onFileSelect={handleFileChange} />
          {error && <Typography color="error">{error}</Typography>}
        </Box>
      </CatalogDialog>
      <CatalogDialog
        header="حذف کاتالوگ"
        open={isModalOpen && mode === 'delete'}
        onClose={closeModal}
        onConfirm={handleConfirm}
      >
        <Typography
          fullWidth
          variant="p"
          component="p"
        >
          آیا از حذف این کاتالوگ اطمینان دارید؟
        </Typography>
      </CatalogDialog>
    </>
  )
}
