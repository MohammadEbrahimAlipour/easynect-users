import Footer from '@/components/Footer'
import HeaderTwo from '@/components/HeaderTwo'
import Layout from '@/components/Layout'
import { API_ROUTES } from '@/services/api';
import React, { useEffect, useState } from 'react'
import { useAccessToken } from '../../../../context/AccessTokenContext';
import axiosInstance from '@/services/axiosInterceptors';
import CardPage from '@/components/card/pages';
import { useRouter } from 'next/router';
import TabsCards from '@/components/tabs';
import CategoryCard from '@/components/card/catit/Category';
import DraggableCategoryCard from '@/components/dnd/DraggableCategoryCard';
import DndContextProvider from '@/components/dnd/DndContext';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from '@mui/material';
import CatalogDialog from '@/components/dialog/CustomDialog';
import { useModalStore } from '@/store/modalStore';
import CatalogCard from '@/components/card/pages/CatalogCard';

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

  const [items, setItems] = useState([]);

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
  const handleFileChange = async(event) => {
    const file = event.target.files?.[0];
    if (file) {
      const base64String = await convertFileToBase64(file);

      setImageFile(base64String);
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
    const apiUrl = tabValue == 1 ? API_ROUTES.CATEGORY_CREATED(catalogId) : API_ROUTES.ITEM_CREATED(catalogId);
    const data = tabValue == 1 ? {
      title: title,
      icon: imageFile
    } : {
      title: title,
      banner: imageFile,
      description : content

    };
    console.log(data, 'data')
    axiosInstance
      .post(apiUrl, data, {
        headers: {
          Authorization: `Bearer ${accessToken.accessToken}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        // setCardData(response.data);
        // Set the card data directly if it's an array
        setCardData(response.data);

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

  const handleEditModal = () => {
    const apiUrl = tabValue == 1 ? API_ROUTES.CATALOG_UPDATE(catalogId, targetData.category_id) : API_ROUTES.CATALOG_UPDATE_ITEM(catalogId, targetData.category_id);
    const data = tabValue == 1 ? {
      title: title,
      icon: imageFile
    } : {
      title: title,
      banner: imageFile,
      description : content

    };
    console.log(data, 'apiUrl')
    axiosInstance
      .patch(apiUrl, data, {
        headers: {
          Authorization: `Bearer ${accessToken.accessToken}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log(response.data, 'response')
      })
      .catch((error) => {
        console.log(error)
      });
  };

  const handleCategoryInfo = (id) => {
    const apiUrl = API_ROUTES.CATALOGS_CATEGORY(id);
    console.log(apiUrl, 'apiUrl')
    axiosInstance
      .get(apiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken.accessToken}`,
          "accept-language": "fa", // Include the access token in the headers
          suppress404Toast: true,
        },
      })
      .then((response) => {
        console.log(response.data, 'response lalalay lalay lay')
        setItems(response.data)
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
          "accept-language": "fa", // Include the access token in the headers
          suppress404Toast: true,
        },
      })
      .then((response) => {
        console.log(response.data, 'response')
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
  }, [id]);
  console.log(cardData, 'card')
  return (
    <>
      <HeaderTwo />
      <Layout>
        <div>
          {catalog && <TabsCards columnConfig={columnConfig} items={items} moveCard={moveCard} setItems={setItems} value={tabValue}
            setValue={setabValue} handleAddModal={() => setCatalogCreated(true)} />}
          {!catalog && <h1 className='pr-5 py-5'>کاتالوگ ها</h1>}
          {!catalog &&
            items.map((value, key) => (
              <CatalogCard id={value.id} card_title={value.title} key={key} handleClick={() => {
                setCatalog(true)
                setCatalogId(value.id);
                handleCategoryInfo(value.id)
              }
              } />
            ))}


        </div>
      </Layout>
      <Footer />
      <CatalogDialog
        header="اولین کاتالوگ"
        open={pageDataDontExist}
        onClose={handleClose}
        onConfirm={handleCreateCataloge}
      >
        <TextField
          label="Title"
          name="title"
          variant="outlined"
          fullWidth
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
            label="Title"
            name="title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {tabValue != 1 && 
          <TextField
            label="content"
            variant="outlined"
            multiline
            rows={3}
            fullWidth
            value={content}
            onChange={(e) => setContent(e.target.value)}
          /> }
          <input
            accept="image/*"
            type="file"
            onChange={handleFileChange}
          />
          {error && <Typography color="error">{error}</Typography>}
        </Box>
      </CatalogDialog>
      <CatalogDialog
        header= { tabValue == 1 ? "ویرایش کاتالوگ" : "ویرایش آیتم"}
        open={isModalOpen && mode === 'edit'}
        onClose={closeModal}
        onConfirm={handleConfirm}
      >
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Title"
            name="title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {tabValue != 1 && 
          <TextField
            label="content"
            variant="outlined"
            multiline
            rows={3}
            fullWidth
            value={content}
            onChange={(e) => setContent(e.target.value)}
          /> }
          <input
            accept="image/*"
            type="file"
            onChange={handleFileChange}
          />
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
