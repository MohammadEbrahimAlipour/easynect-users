import CardsCarousel from "@/components/CardsCarousel";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import axios from "axios";
import Layout from "@/components/Layout";
import React, { useState, useEffect } from "react";
import { useAccessToken } from "../../context/AccessTokenContext";
import { generateApiUrl } from "@/components/ApiUr";
import { Carousel } from "react-responsive-carousel";
import Slider from "react-slick";

const Cards = () => {
  const [cardExist, setCardExist] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cardData, setCardData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const accessToken = useAccessToken();
  const [idFromServer, setIdFromServer] = useState(null);

  const isCardSelected = cardData.id === idFromServer;

  const [centeredItemIndex, setCenteredItemIndex] = useState(0);

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "0",
    slidesToShow: 3, // Adjust the number of visible slides
    slidesToScroll: 1, // Adjust the number of slides to scroll
    vertical: true, // Enable vertical scrolling
    arrows: false,
    speed: 100,
    afterChange: (index) => {
      setCenteredItemIndex(index);
    }
  };

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

  console.log("cards", cardData);

  return (
    <>
      <Header />
      <Layout>
        <Slider {...settings}>
          {cardData.map((cardData) => (
            <CardsCarousel key={cardData.id} cardData={cardData} />
          ))}
        </Slider>
      </Layout>
      <Footer />
    </>
  );
};

export default Cards;
