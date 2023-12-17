import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { PlusSign } from "@/components/Icons";
import Layout from "@/components/Layout";
import ProfileCardEmpty from "@/components/ProfileCardEmpty";
import ProfileCardExist from "@/components/ProfileCardExist";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { generateApiUrl } from "@/components/ApiUr";
import axios from "axios";
import { useAccessToken } from "../../../../context/AccessTokenContext";
import LoadingState from "@/components/LoadingState";
import ProfileCardCarousel from "@/components/ProfileCardCarousel";
import tw from "tailwind-styled-components";

const ProfileCard = () => {
  const [cardExist, setCardExist] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cardData, setCardData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const accessToken = useAccessToken();
  const [idFromServer, setIdFromServer] = useState(null);
  const [isTouching, setIsTouching] = useState(false);
  const [cardXPosition, setCardXPosition] = useState(0);
  const [onTouchXPosition, setOnTouchXPosition] = useState(0);
  const [cards, setCards] = useState([
    {
      id: 1,
      isFallen: false,
    },
    {
      id: 2,
      isFallen: false,
    },
    {
      id: 3,
      isFallen: false,
    },
  ]);

  const cardWrapperRef = useRef(null);

  // Fetch card data from the API
  useEffect(() => {
    // Replace with your API endpoint
    const apiUrl = generateApiUrl("/api/v1/pages/");

    axios
      .get(apiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken.accessToken}`,
          "accept-language": "fa", // Include the access token in the headers
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
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, [accessToken.accessToken]);

  const handleMouseMove = (e) => {
    if (!isTouching) return;

    const { clientX } = e.touches[0];
    const { width } = cardWrapperRef.current.getBoundingClientRect();
    const mouseXTopOfWrapper = clientX - onTouchXPosition;

    const threshold = 0.1;

    if (
      mouseXTopOfWrapper > width * threshold ||
      mouseXTopOfWrapper < -(width * threshold)
    ) {
      setCards((previousCards) => {
        const newCards = [...previousCards];
        newCards[previousCards.length - 1].isFallen = true;
        return newCards;
      });

      setCards((previousCards) => {
        const newCards = [...previousCards];

        const newId = cards[0].id - 1 + Math.random() * 1000;

        newCards.unshift({
          id: newId,
          isFallen: false,
        });

        return newCards;
      });

      setTimeout(() => {
        setCards((previousCards) => {
          const newCards = [...previousCards];
          newCards.pop();

          return newCards;
        });
      }, 300);

      setIsTouching(false);
      return;
    }

    setCardXPosition(mouseXTopOfWrapper);
  };

  const handleOnTouch = (e) => {
    const { clientX } = e.touches[0];
    setIsTouching(true);
    setOnTouchXPosition(clientX);
    setCardXPosition(0);
  };

  const handleOnTouchEnd = () => {
    setIsTouching(false);
    setCardXPosition(0);
    setOnTouchXPosition(0);
  };

  const getLastCardXPosition = (isFallen) => {
    if (isFallen) {
      return `${cardXPosition < 0 ? "-" : ""}120%`;
    }

    if (isTouching) {
      return `${cardXPosition}px`;
    }

    return 0;
  };

  return (
    <>
      <Header cardData={cardData} />
      <Layout>
        {false ? (
          <LoadingState />
        ) : true ? (
          <>
            <CardWrapper
              onTouchStart={handleOnTouch}
              onTouchEnd={handleOnTouchEnd}
              onTouchMove={handleMouseMove}
              ref={cardWrapperRef}
            >
              {cards
                .slice(cards.length - 3, cards.length)
                .map(({ isFallen, id }, index) => (
                  <Card
                    key={id}
                    $isCardFallen={isFallen}
                    style={
                      2 === index && {
                        "--tw-translate-x": `${getLastCardXPosition(isFallen)}`,
                      }
                    }
                  >
                    CARD {id}
                  </Card>
                ))}
            </CardWrapper>

            <Link
              href="/src/pages/createCard"
              className="flex items-center justify-center w-full
                  border-[1px] py-3 leading-0 rounded-lg mt-8"
            >
              <span className="me-1">
                <PlusSign className=" w-[18px] leading-0 " />
              </span>
              کارت جدید
            </Link>
            {isTouching && "mouse-down"}
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

const CardWrapper = tw.div`
  relative
  h-80 
  select-none
  group
`;

const Card = tw.div`
  rounded-xl
  bg-white
  h-64
  shadow-[0px_4px_64px_0px_rgba(0,0,0,0.10)]
  w-full
  absolute
  flex
  justify-center
  items-center
  bottom-0
  transition 
  duration-300 
  ease-out
  translate-y-0

  first:scale-[.8]
  first:-translate-y-24
  first:shadow-[0px_4px_64px_0px_rgba(0,0,0,0.05)]

  [&:nth-child(2)]:scale-90
  [&:nth-child(2)]:-translate-y-12
  [&:nth-child(2)]:shadow-[0px_4px_64px_0px_rgba(0,0,0,0.05)]

  ${({ $isCardFallen }) =>
    $isCardFallen &&
    `
    opacity-0 
    pointer-events-none
  `}
`;
