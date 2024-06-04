import { useState } from "react";
import Image from "next/image";
import Cropper from "react-easy-crop";
import { Box, Slider, Typography } from "@mui/material";

import getCroppedImg from "@/utils/crop";
import BottomSheetWrapper from "./bottomSheet/BottomSheetWrapper";
import tw from "tailwind-styled-components";

export default function CropImageBottomSheet({
  image,
  onClose = null,
  open,
  onCrop,
  aspect = 1,
  showGrid = true,
  cropShape = "rect",
}) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleCrop = async () => {
    try {
      const croppedImage = await getCroppedImg(
        image,
        croppedAreaPixels,
        rotation
      );
      onCrop(croppedImage);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <BottomSheetWrapper
      onClose={onClose}
      open={open}
      fullScreen={true}
      fullWidth={true}
    >
      <Wrapper>
        <CropperWrapper>
          <Cropper
            image={image}
            crop={crop}
            rotation={rotation}
            zoom={zoom}
            aspect={aspect}
            onCropChange={setCrop}
            onRotationChange={setRotation}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            showGrid={showGrid}
            cropShape={cropShape}
          />
        </CropperWrapper>
        <Controllers>
          <SliderContainer>
            <SliderLabel>زوم</SliderLabel>
            <CustomSlider
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              aria-labelledby="Zoom"
              onChange={(e, zoom) => setZoom(zoom)}
            />
          </SliderContainer>
          <SliderContainer>
            <SliderLabel>چرخش</SliderLabel>
            <CustomSlider
              value={rotation}
              min={0}
              max={360}
              step={1}
              aria-labelledby="Rotation"
              onChange={(e, rotation) => setRotation(rotation)}
            />
          </SliderContainer>
        </Controllers>
        <Buttons>
          <Button onClick={handleCrop}>تایید</Button>
          {onClose !== null && (
            <CancelButton onClick={onClose}>بستن</CancelButton>
          )}
        </Buttons>
      </Wrapper>
    </BottomSheetWrapper>
  );
}

const Wrapper = tw.div`
  flex
  flex-col
  h-full
`;

const CropperWrapper = tw.div`
  w-full
  flex-1
  relative
`;

const Controllers = tw.div`
  flex
  flex-col
  gap-5
  py-6
  px-2
`;

const SliderContainer = tw(Box)`
  flex
  items-center
  pr-2
  pl-4
`;

const SliderLabel = tw.div`
  min-w-[60px]
`;

const CustomSlider = tw(Slider)`
  py-[0]
`;

const Buttons = tw.div`
  flex
  gap-2
  mb-4
  mx-2
`;

const Button = tw.button`
  flex-1
  py-3
  rounded-xl
  border-2
  border-black
  bg-black
  text-white
`;

const CancelButton = tw(Button)`
  text-black
  bg-transparent
`;
