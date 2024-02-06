import { useEffect, useMemo, useRef, useState } from "react";
import jsQR from "jsqr";
import tw from "tailwind-styled-components";
import { CloseIconSmall, TickSuccess } from "../Icons";
import { QrScanner } from "@yudiel/react-qr-scanner";

// ** import css for tick svg
import styles from "./qrCss.module.css";

export default function QrReader({ result, setResult }) {
  const [error, setError] = useState(false);

  // const canvasRef = useRef(null);
  // const videoRef = useRef(null);

  // useEffect(() => {
  //   if (videoRef.current) {
  //     navigator.mediaDevices
  //       .getUserMedia({ video: { facingMode: "environment" } })
  //       .then((stream) => {
  //         videoRef.current.srcObject = stream;
  //         videoRef.current.setAttribute("playsinline", true);
  //         videoRef.current.play();
  //       });
  //   }
  // }, [videoRef]);

  // const tick = () => {
  //   console.log("tick");
  //   if (canvasRef.current) {
  //     const video = videoRef.current;
  //     const context = canvasRef.current.getContext("2d");
  //     const height = video.videoHeight;
  //     const width = video.videoWidth;

  //     if (video.readyState === video.HAVE_ENOUGH_DATA) {
  //       canvasRef.current.height = height;
  //       canvasRef.current.width = width;

  //       context.drawImage(video, 0, 0, width, height);
  //       const imageData = context.getImageData(0, 0, width, height);
  //       const code = jsQR(imageData.data, imageData.width, imageData.height, {
  //         inversionAttempts: "dontInvert"
  //       });

  //       if (code) {
  //         setResult(code.data);
  //       } else {
  //         requestAnimationFrame(tick);
  //         setError(true);
  //       }
  //     }
  //   }
  // };

  // const videoPlayed = () => {
  //   requestAnimationFrame(tick);
  // };

  console.log("result", result);

  useEffect(() => {
    // ComponentDidMount logic here ...

    return () => {
      // ComponentWillUnmount logic
      // This is where you should include the camera clean-up code
      if (typeof QrScanner.releaseCamera === "function") {
        // Release the camera resource, if such method is provided
        QrScanner.releaseCamera();
      }
    };
  }, []);

  return (
    <div className="w-full">
      {/* <Canvas ref={canvasRef}></Canvas> */}
      {result === null || result === "" ? (
        <QrScanner
          onDecode={(res) => setResult(res)}
          onError={(error) => console.log(error?.message)}
        />
      ) : (
        <div className="flex justify-center items-center mb-5">
          <svg
            viewBox="0 0 26 26"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.custom_svg}
          >
            <g
              stroke="currentColor"
              stroke-width="2"
              fill="none"
              fill-rule="evenodd"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                className={styles.circle}
                d="M13 1C6.372583 1 1 6.372583 1 13s5.372583 12 12 12 12-5.372583 12-12S19.627417 1 13 1z"
              />
              <path
                className={styles.tick}
                d="M6.5 13.5L10 17 l8.808621-8.308621"
              />
            </g>
          </svg>
        </div>
      )}
      <div className="flex items-center justify-start mt-2">
        {/* <p>{result}</p> */}
        <span className="me-2 ">
          {result !== null ? <TickSuccess /> : <CloseIconSmall />}
        </span>
        <p>
          {result !== null
            ? "کارت با موفقییت اسکن شد."
            : "qr code کارت خود را اسکن کنید."}
        </p>
      </div>
    </div>
  );
}

const Canvas = tw.canvas`
  hidden
`;

const VideoPreview = tw.video`

`;
