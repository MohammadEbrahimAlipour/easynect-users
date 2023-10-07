import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { PlusSign } from "@/components/Icons";
import Layout from "@/components/Layout";
import ProfileCardEmpty from "@/components/ProfileCardEmpty";
import ProfileCardExist from "@/components/ProfileCardExist";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { generateApiUrl } from "@/components/ApiUr";
import axios from "axios";
import { useAccessToken } from "../../context/AccessTokenContext";
import LoadingState from "@/components/LoadingState";

const ProfileCard = () => {
  const [cardExist, setCardExist] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cardData, setCardData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const accessToken = useAccessToken();
  const [idFromServer, setIdFromServer] = useState(null);

  // Fetch card data from the API
  useEffect(() => {
    // Replace with your API endpoint
    const apiUrl = generateApiUrl("/api/v1/pages/");

    axios
      .get(apiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken.accessToken}`,
          "accept-language": "fa" // Include the access token in the headers
        }
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
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, [accessToken.accessToken]);

  return (
    <>
      <Header />
      <Layout className="">
        {isLoading ? (
          <LoadingState />
        ) : cardData.length ? (
          <>
            <div className="w-full">
              <div className="w-full flex flex-col justify-center items-center">
                {cardData.map((card) => (
                  <ProfileCardExist
                    key={card.id}
                    cardData={card}
                    className="carousel-slide"
                    carouselData={cardData} // Pass carouselData to the component
                    idFromServer={idFromServer}
                  />
                ))}
              </div>
            </div>

            <Link
              href="/createCard"
              className="flex items-center justify-center w-full
                  border-[1px] py-3 leading-0 rounded-lg mt-8"
            >
              <span className="me-1">
                <PlusSign className=" w-[18px] leading-0 " />
              </span>
              کارت جدید
            </Link>
          </>
        ) : (
          <ProfileCardEmpty />
        )}
      </Layout>
      <Footer />
    </>
  );
};

export default ProfileCard;
