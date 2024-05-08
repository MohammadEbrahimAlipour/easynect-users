import tw from "tailwind-styled-components";

// files
import ZoomInIcon from "@/assets/icons/zoom-in.svg";
import ZoomOutIcon from "@/assets/icons/zoom-out.svg";

export default function ZoomController({ onChange, scale }) {
  const handleZoomIn = () => {
    if (scale > 4) return;
    console.log("scale", scale);
    onChange(scale + 1);
  };

  const handleZoomOut = () => {
    if (scale < 2) return;

    onChange(scale - 1);
  };

  return (
    <Wrapper>
      <Button onClick={handleZoomIn}>
        <ZoomInIcon />
      </Button>
      <Scale>{scale}00%</Scale>
      <Button onClick={handleZoomOut}>
        <ZoomOutIcon />
      </Button>
    </Wrapper>
  );
}

const Wrapper = tw.div`
  flex
  flex-col
  fixed
  bottom-1/2
  translate-y-1/2
  bg-gray-300/75
  right-0
  rounded-l-lg
  backdrop-blur-sm
  text-gray-600
  py-2
  z-10
  select-none	
`;

const Button = tw.div`
  w-12
  cursor-pointer
`;

const Scale = tw.div`
  text-center  
`;
