import { API_ROUTES } from '@/services/api';
import axiosInstance from '@/services/axiosInterceptors';
import React from 'react'

export default function useCatalogsApi(title, catalogId, tabValue, imageFile, targetData, content, accessToken, setCardData, setIsLoading, setIdFromServer, setRefresh, refresh) {
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
                setRefresh(true)

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
            description: content

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
                setRefresh(true)

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
            description: content

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
    const handleEditModalItems = () => {
        const apiUrl = API_ROUTES.CATALOG_UPDATE_ITEM(catalogId, targetData.category_id);
        const data = {
            title: title,
            banner: imageFile,
            description: content

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
                setRefresh(true)

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
                setRefresh(true)

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
    const handleDeleteModalItems = () => {
        const apiUrl = API_ROUTES.CATALOG_REMOVE_ITEM(catalogId, targetData.category_id);
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
                setRefresh(true)

            })
            .catch((error) => {
                console.log(error)
            });
    };
    const handleCreateItem = async () => {
        const apiUrl =
            API_ROUTES.ITEM_CREATED(catalogId);

        const formData = new FormData();
        formData.append('title', title);

        // Item mode
        if (imageFile) {
            formData.append('banner', imageFile);
        }
        formData.append('description', content);
        axiosInstance
            .post(apiUrl, formData, {
                headers: {
                    Authorization: `Bearer ${accessToken.accessToken}`,
                },
            })
            .then((response) => {
                // setCardData(response.data);
                // Set the card data directly if it's an array
                setCardData(response.data);
                setRefresh(true)

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
    return (
        {
            handleCreateCataloge,
            handleCreateCategoryOrItem,
            handleEditModal,
            handleCategoryInfo,
            handleDeleteModal,
            handleEditModalItems,
            handleDeleteModalItems,
            handleCreateItem
        }
    )
}
