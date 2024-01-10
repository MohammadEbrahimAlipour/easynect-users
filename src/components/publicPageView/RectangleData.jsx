import React, { Fragment } from "react";
import Image from "next/image";

const RectangleData = ({ object, handleCountingItemClicks }) => {
  // const handleRecTypeDetection = (squareIndex) => {
  //   const squareData = object?.data[squareIndex];
  //   // Early return to handle any potential 'null' or 'undefined'
  //   if (!squareData) return;

  //   const isAnalyticsCounted = handleCountingItemClicks(squareData);
  //   if (isAnalyticsCounted) {
  //     handleCountingItemClicks(squareData);
  //   }

  //   if (squareData.type === "phone" && squareData.content_val) {
  //     const telLink = `tel:${squareData.content_val}`;
  //     window.location.href = telLink;
  //   } else if (squareData.type === "link" && squareData.content_val) {
  //     const externalLink = squareData.content_val;
  //     window.open(externalLink, "_blank", "noopener,noreferrer");
  //   } else if (squareData.type === "file" && squareData.content_val) {
  //     const fileLink = squareData.content_val;
  //     const a = document.createElement("a");
  //     a.href = fileLink;
  //     a.download = squareData.content_val.split("/").pop(); // Set a custom filename or fallback
  //     document.body.appendChild(a);
  //     a.click();
  //     document.body.removeChild(a);
  //   } else if (squareData.type === "email" && squareData.content_val) {
  //     const emailLink = `mailto:${squareData.content_val}`;
  //     window.location.href = emailLink;
  //   }
  // };

  const handleRecTypeDetection = async (squareIndex) => {
    const squareData = object?.data[squareIndex];

    // Early return to handle any potential 'null' or 'undefined'
    if (!squareData) return;

    try {
      const isAnalyticsCounted = await handleCountingItemClicks(squareData);
      if (!isAnalyticsCounted) {
        // If the analytics call was not successful, show a toast message and exit the function
        toast.error("There was an error processing your request.");
        return;
      }

      // Redirect based on the type of squareData
      if (squareData.type === "phone" && squareData.content_val) {
        const telLink = `tel:${squareData.content_val}`;
        window.location.href = telLink;
      } else if (squareData.type === "link" && squareData.content_val) {
        const externalLink = squareData.content_val;
        window.open(externalLink, "_blank", "noopener,noreferrer");
      } else if (squareData.type === "file" && squareData.content_val) {
        const fileLink = squareData.content_val;
        const a = document.createElement("a");
        a.href = fileLink;
        a.download = squareData.content_val.split("/").pop(); // Set a custom filename or fallback
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } else if (squareData.type === "email" && squareData.content_val) {
        const emailLink = `mailto:${squareData.content_val}`;
        window.location.href = emailLink;
      }
    } catch (error) {
      console.error("Error during square type detection:", error);
      // toast.error('There was an error redirecting to the requested resource.');
    }
  };

  return (
    <div
      onClick={() => (async () => await handleRecTypeDetection(0))()}
      className="grid grid-cols-12 mb-5 items-center text-xs py-3 border-2 rounded-2xl whitespace-nowrap overflow-hidden"
    >
      <>
        <div className="col-span-2  rounded-md flex justify-center items-center overflow-hidden">
          <Image
            src={object?.data[0]?.s3_icon_url}
            alt={object?.data[0]?.title}
            width={32}
            height={32}
            className="bg-white rounded-md invert p-1"
          />
        </div>
        <p className="col-span-3 font-semibold text-xs ms-1 overflow-hidden">
          {object?.data[0]?.title}
        </p>
      </>
    </div>
  );
};

export default RectangleData;
