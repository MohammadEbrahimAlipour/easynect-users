import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAccessToken } from "../../context/AccessTokenContext";
import LoadingState from "@/components/LoadingState";

const HomePage = () => {
  const router = useRouter();
  const accessToken = useAccessToken();

  const [isVisitorFirstTime, setIsVisitorFirstTime] = useState(false);

  useEffect(() => {
    // Check if the user is a first-time visitor
    if (
      typeof window !== "undefined" &&
      !localStorage.getItem("visitedBefore")
    ) {
      // User is a first-time visitor
      // Set a flag in local storage to indicate that the user has visited
      localStorage.setItem("visitedBefore", "true");
      setIsVisitorFirstTime(true);
    }
  }, []);

  useEffect(() => {
    // Check if isVisitorFirstTime changes and is false
    if (!isVisitorFirstTime) {
      // Check if access token exists
      if (accessToken.accessToken) {
        // Redirect to "/profile" if access token exists
        router.push("/app/cards/profileCard");
      } else {
        // Redirect to "/loginUser" if access token doesn't exist
        router.push("/registration/signIn/loginUser");
      }
    }
  }, [isVisitorFirstTime, router, accessToken.accessToken]);

  useEffect(() => {
    // Check if isVisitorFirstTime changes and is true
    if (isVisitorFirstTime) {
      // Navigate to the "/registerUser" page
      router.push("/startHere/infoLanding");
    }
  }, [isVisitorFirstTime, router]);

  return (
    <>
      <Head>
        <title>Easynect</title>
        <meta name="description" content="Powered by Easynect" />
      </Head>

      <LoadingState />
    </>
  );
};

export default HomePage;
