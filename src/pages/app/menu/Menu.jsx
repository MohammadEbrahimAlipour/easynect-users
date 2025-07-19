import Footer from '@/components/Footer'
import HeaderTwo from '@/components/HeaderTwo'
import Layout from '@/components/Layout'
import { API_ROUTES } from '@/services/api';
import React, { useEffect, useState } from 'react'
import { useAccessToken } from '../../../../context/AccessTokenContext';
import axiosInstance from '@/services/axiosInterceptors';
import CardPage from '@/components/card/pages';

export default function Menu() {
    const accessToken = useAccessToken();
    const [cardData, setCardData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [idFromServer, setIdFromServer] = useState(null);
    const [pageDataDontExist, setPageDAtaDontExist] = useState(false);


    const getCardsRequest = () => {
        const apiUrl = API_ROUTES.CARDS_PROFILE_CARD_PAGES;

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
                setCardData(response.data || []);

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
    useEffect(() => {
        const fetchData = async () => {
            await getCardsRequest();
        };
        fetchData();
    }, []);


    return (
        <>
            <HeaderTwo />
            <Layout>
                <div>
                    <h1 className='pr-5'>
                        صفحه ها
                    </h1>
                    {cardData.map((value, key) => (
                        <CardPage id={value.id} job_title={value.job_title} card_title={value.card_title} key={key} />
                    ))}
                </div>
            </Layout>
            <Footer />
        </>
    )
}
