import { useEffect, useMemo, useRef, useState } from "react";
import jsQR from "jsqr";
import tw from "tailwind-styled-components";
import { CloseIconSmall, TickSuccess } from "../Icons";

export default function QrReader({ result, setResult }) {
  const [error, setError] = useState(false);

  const canvasRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      navigator.mediaDevices
        .getUserMedia({ video: { facingMode: "environment" } })
        .then((stream) => {
          videoRef.current.srcObject = stream;
          videoRef.current.setAttribute("playsinline", true);
          videoRef.current.play();
        });
    }
  }, [videoRef]);

  const tick = () => {
    console.log("tick");
    if (canvasRef.current) {
      const video = videoRef.current;
      const context = canvasRef.current.getContext("2d");
      const height = video.videoHeight;
      const width = video.videoWidth;

      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        canvasRef.current.height = height;
        canvasRef.current.width = width;

        context.drawImage(video, 0, 0, width, height);
        const imageData = context.getImageData(0, 0, width, height);
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: "dontInvert"
        });

        if (code) {
          setResult(code.data);
        } else {
          requestAnimationFrame(tick);
          setError(true);
        }
      }
    }
  };

  const videoPlayed = () => {
    requestAnimationFrame(tick);
  };

  return (
    <div>
      <Canvas ref={canvasRef}></Canvas>
      <VideoPreview ref={videoRef} onLoadedData={videoPlayed} />
      <div className="flex items-center justify-start mt-2">
        {/* <p>{result}</p> */}
        <span className="me-2 ">
          {result !== null ? <TickSuccess /> : <CloseIconSmall />}
        </span>
        <p>{error && "qr code کارت خود را اسکن کنید."}</p>
      </div>
    </div>
  );
}

const Canvas = tw.canvas`
  hidden
`;

const VideoPreview = tw.video`

`;
