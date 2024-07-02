import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { CardsCardIcon, CardsWifiIcon, PlusSign } from "@/components/Icons";
import Layout from "@/components/Layout";
import ProfileCardEmpty from "@/components/ProfileCardEmpty";
import Link from "next/link";
import React, { useState, useEffect, useRef, useMemo } from "react";
import { useAccessToken } from "../../../../context/AccessTokenContext";
import tw from "tailwind-styled-components";
import BottomSheetShareById from "@/components/bottomSheet/cards/BottomSheetShareById";
import BottomSheetMore from "@/components/bottomSheet/cards/BottomSheetMore";
import { useRouter } from "next/router";
import { API_ROUTES } from "@/services/api";
import axiosInstance from "@/services/axiosInterceptors";
import Head from "next/head";
import Image from "next/image";
import { generateApiUrl } from "@/components/ApiUr";

const ProfileCard = () => {
  const [cardData, setCardData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const accessToken = useAccessToken();
  const [idFromServer, setIdFromServer] = useState(null);
  const [isTouching, setIsTouching] = useState(false);
  const [cardXPosition, setCardXPosition] = useState(0);
  const [onTouchXPosition, setOnTouchXPosition] = useState(0);
  const [clickedCardId, setClickedCardId] = useState({});
  const [moreSheetDetails, setMoreSheetDetails] = useState({});
  const [showSheet, setShowSheet] = useState(false); //share options
  const [showSheetMore, setShowSheetMore] = useState(false); //more options
  const [cards, setCards] = useState([]);

  const [pageDataDontExist, setPageDAtaDontExist] = useState(false);

  const router = useRouter();
  const cardWrapperRef = useRef(null);

  const finalCardsNumber = useMemo(() => {
    const cardsNumber = cards.length;
    return cardsNumber <= 3 ? cardsNumber : 3;
  }, [cards.length]);

  const handleClickedCardId = (id, card_title) => {
    setClickedCardId({
      id: id,
      card_title: card_title,
    });
    setShowSheet(true);
  };
  const handleSeeMoreOptions = (id, card_title) => {
    setMoreSheetDetails({
      id: id,
      card_title: card_title,
    });
    setShowSheetMore(true);
  };

  const handleUsernameRedirect = (username) => {
    router.push(`/${username}`);
  };

  // Fetch card data from the API
  useEffect(() => {
    // Replace with your API endpoint
    getCardsRequest();
  }, [accessToken.accessToken]);

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
    // Assuming cardData is your state which has data fetched from the API.
    setCards(
      cardData.map((apiCard) => ({
        isFallen: false,
        id: apiCard.id,
        card_title: apiCard.card_title,
        username: apiCard.username,
        job_title: apiCard.job_title,
        page_url: apiCard.page_url,
        profile_s3_url: apiCard.profile_s3_url,
        user_first_name: apiCard.user_first_name,
        user_last_name: apiCard.user_last_name,
      }))
    );
  }, [cardData]);

  const handleMouseMove = (e) => {
    if (!isTouching) return;

    let clientX;
    if (e.type === "touchmove") {
      clientX = e.touches[0].clientX;
    } else if (e.type === "mousemove") {
      clientX = e.clientX;
    }

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

      setTimeout(() => {
        setCards((previousCards) => {
          const newCards = [...previousCards];
          const lastCard = newCards.pop();
          lastCard.isFallen = false;
          newCards.unshift(lastCard);
          return newCards;
        });
      }, 300);

      setIsTouching(false);
      return;
    }

    setCardXPosition(mouseXTopOfWrapper);
  };

  const handleOnTouch = (e) => {
    let clientX;
    if (e.type === "touchstart") {
      clientX = e.touches[0].clientX;
    } else {
      clientX = e.clientX;
    }
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

  const handlePageDelete = () => {
    setShowSheetMore(false);
    getCardsRequest();
  };

  return (
    <>
      <Head>
        <title>ایزی‌نکت - کارت ها</title>
        <meta name="easynect business card" content="Powered by Easynect" />
      </Head>
      <Header cardData={cardData} />
      <Layout className="overflow-x-hidden min-h-fit">
        {!pageDataDontExist ? (
          <div>
            <CardWrapper
              onTouchStart={handleOnTouch}
              onTouchEnd={handleOnTouchEnd}
              onTouchMove={handleMouseMove}
              onMouseDown={handleOnTouch}
              onMouseUp={handleOnTouchEnd}
              onMouseMove={handleMouseMove}
              ref={cardWrapperRef}
            >
              {cards
                .slice(cards.length - finalCardsNumber, cards.length)
                .map(
                  (
                    {
                      isFallen,
                      id,
                      card_title,
                      job_title,
                      profile_s3_url,
                      username,
                    },
                    index
                  ) => (
                    <Card
                      key={id}
                      $isCardFallen={isFallen}
                      style={
                        2 === index && {
                          "--tw-translate-x": `${getLastCardXPosition(
                            isFallen
                          )}`,
                        }
                      }
                    >
                      <div className="w-full px-5 h-full py-5 ">
                        <div className="relative">
                          {/* two items left side */}
                          <div className=" absolute left-5 top-5">
                            {/* circle */}
                            <div className="w-[28px] h-[28px] bg-black rounded-full flex justify-center items-center ">
                              <CardsWifiIcon />
                            </div>

                            <div
                              className="w-[28px] h-[24px] bg-white rounded-md mt-3 flex flex-col
                                 justify-start"
                            >
                              <div className="w-full h-[40%] rounded-se-md rounded-ss-md">
                                <CardsCardIcon />
                              </div>
                            </div>
                          </div>

                          {/* profile items right side */}
                          <div className="">
                            {/* profile photo */}
                            <div
                              onClick={() => handleUsernameRedirect(username)}
                              className="w-[80px] h-[80px] rounded-full opacity-90 mb-4 overflow-hidden"
                            >
                              <Image
                                priority={true}
                                className="rounded-full object-cover w-full h-full pointer-events-none"
                                src={`${profile_s3_url}?${new Date().getTime()}`}
                                width={80}
                                height={80}
                                alt={username}
                              />
                            </div>
                            {/* box under profile */}
                            <div
                              onClick={() => handleUsernameRedirect(username)}
                              className="mb-2 text-xl font-semibold cursor-pointer"
                            >
                              <p className="text-right custom_ltr ">
                                @{username}
                              </p>
                            </div>
                            {/* smaller line */}
                            <div className="text-xs text-muted mb-3">
                              <p className="text-right">{job_title}</p>
                            </div>
                          </div>
                        </div>

                        {/* bottom section */}
                        <div className="pb-5 border-t-[1px] w-full">
                          <div className="grid grid-cols-12">
                            <div className="mt-5 mx-4 flex justify-start gap-3 items-center col-span-10">
                              {/* box right 1 */}
                              <Link
                                href={`/app/cards/editProfileInfo?id=${id}`}
                                passHref
                                className="w-[28%] h-[32px] border-2 rounded-md flex justify-center items-center"
                              >
                                <div>
                                  <p className="text-xs ">ویرایش</p>
                                </div>
                              </Link>

                              {/* box right 3 */}
                              <Link
                                href={`/app/stats/personsStats?selectedIdFromCard=${id}`}
                                className="w-[22%] h-[32px] border-2 rounded-md flex justify-center items-center"
                              >
                                <p className="text-xs">آمار</p>
                              </Link>
                            </div>
                            {/* left side more icon */}
                            <button
                              className="border-2 w-[32px] h-[32px] rounded-md col-span-2 mt-5
                              flex justify-center items-center font-ravi"
                              onClick={() =>
                                handleSeeMoreOptions(id, card_title)
                              }
                            >
                              ...
                            </button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  )
                )}
            </CardWrapper>

            <Link
              href="/app/cards/createCard"
              className="flex items-center justify-center w-full
                  border-[1px] py-3 leading-0 rounded-lg mt-10 "
            >
              <span className="me-1">
                <PlusSign className=" w-[18px] leading-0 " />
              </span>
              کارت جدید
            </Link>
          </div>
        ) : (
          <ProfileCardEmpty />
        )}
      </Layout>
      <Footer />

      {/* bottom sheet */}
      <BottomSheetShareById
        showSheet={showSheet}
        setShowSheet={setShowSheet}
        clickedCardId={clickedCardId}
      />

      {/* Bottom sheet more */}
      <BottomSheetMore
        showSheetMore={showSheetMore}
        setShowSheetMore={setShowSheetMore}
        moreSheetDetails={moreSheetDetails}
        onDelete={handlePageDelete}
      />
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

  overflow-hidden 

  

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
