import React from "react";
import Image from "next/image";

const SquareData = ({ object, handleCountingItemClicks }) => {
  // condition to detect type of each squares data and redirect based on type
  // const handleSquareTypeDetection = (squareIndex) => {
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

  const handleSquareTypeDetection = async (squareIndex) => {
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
    <>
      <div className="grid grid-cols-12 mb-5 gap-5">
        {/* first square */}
        <div
          // onClick={() => handleSquareTypeDetection(0)} // adjusted for first square
          onClick={() => (async () => await handleSquareTypeDetection(0))()}
          className="col-span-6 relative"
        >
          {object?.data[0]?.sub_order === 1 ? (
            // exists
            <>
              <div className="px-4 py-3 border-2 rounded-2xl overflow-hidden  ">
                <div
                  className="bg-dark w-[45px] h-[45px] rounded-full mb-3
                  flex justify-center items-center overflow-hidden"
                >
                  <Image
                    src={
                      object?.data[0]?.sub_order === 1 &&
                      object?.data[0]?.s3_icon_url
                    }
                    alt={
                      (object?.data[0]?.sub_order === 1 &&
                        object?.data[0]?.title) ||
                      "social Link"
                    }
                    width={32}
                    height={32}
                    className="bg-white invert"
                  />
                </div>
                <p className="font-medium text-xs text-dark ">
                  {object?.data[0]?.sub_order === 1 && object?.data[0]?.title}
                </p>
                <p className="font-medium text-xs text-muted mt-2 mb-5 line-clamp-2">
                  {object?.data[0]?.sub_order === 1 &&
                    object?.data[0]?.description}
                  {/* empty space to keep the hight */}
                  {"\u00A0"}
                </p>
              </div>

              {/* two */}
            </>
          ) : // empty
          null}
        </div>

        {/* second square */}
        <div
          // onClick={() => handleSquareTypeDetection(1)} // adjusted for second square
          onClick={() => (async () => await handleSquareTypeDetection(1))()}
          className="col-span-6 relative"
        >
          {object?.data[0]?.sub_order === 2 ||
          object?.data[1]?.sub_order === 2 ? (
            // exists
            <>
              <div className="px-4 py-3 border-2 rounded-2xl overflow-hidden  ">
                <div
                  className="bg-dark w-[45px] h-[45px] rounded-full mb-3
                  flex justify-center items-center overflow-hidden"
                >
                  <Image
                    src={
                      object?.data[1]?.sub_order === 2
                        ? object?.data[1].s3_icon_url
                        : object?.data[0].s3_icon_url
                    }
                    alt={
                      object?.data[1]?.sub_order === 2
                        ? object?.data[1].s3_icon_url
                        : object?.data[0].title
                    }
                    width={32}
                    height={32}
                    className="bg-white invert"
                  />
                </div>
                <p className="font-medium text-xs text-dark ">
                  {object?.data[1]?.sub_order === 2
                    ? object?.data[1].title
                    : object?.data[0].title}
                </p>
                <p className="font-medium text-xs text-muted mt-2 mb-5 line-clamp-2">
                  {object?.data[1]?.sub_order === 2
                    ? object?.data[1].description
                    : object?.data[0].description}
                  {/* empty space to keep the hight */}
                  {"\u00A0"}
                </p>
              </div>

              {/* two */}
            </>
          ) : // empty
          null}
        </div>
      </div>
    </>
  );
};

export default SquareData;
