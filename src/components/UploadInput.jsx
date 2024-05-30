import { useRef, useState } from "react";
import tw from "tailwind-styled-components";

// assets
import UploadFileIcon from "@/assets/icons/upload.svg";

export default function UploadInput({
  onChoose,
  labelText = null,
  className = "",
  uploadPercentage = null,
}) {
  const [fileName, setFileName] = useState(null);
  const fileInputRef = useRef();

  const handleFileInputClick = () => {
    if (uploadPercentage !== null) return;

    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    console.log("change", event.target);
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      onChoose(file);
    }

    fileInputRef.current.value = "";
  };

  return (
    <Wrapper className={className}>
      {labelText && <Label>{labelText}</Label>}
      <InputWrapper onClick={handleFileInputClick}>
        <Input type="file" ref={fileInputRef} onChange={handleFileChange} />
        <IconWrapper $uploading={uploadPercentage !== null}>
          {uploadPercentage !== null ? (
            <>
              <Percentage>{uploadPercentage}%</Percentage>
              <Loader />
            </>
          ) : (
            <Icon />
          )}
        </IconWrapper>
        <Placeholder>
          {fileName ? fileName : "برای انتخاب فایل کلیک کنید"}
        </Placeholder>
      </InputWrapper>
    </Wrapper>
  );
}

const Wrapper = tw.div`
  
`;

const InputWrapper = tw.div`
  w-full
  border-2
  rounded-lg
  flex
  flex-row-reverse
  justify-between
  py-1
  items-center
  px-1
  overflow-hidden
`;

const Input = tw.input`
  hidden
`;

const IconWrapper = tw.div`
  py-1
  bg-black
  rounded-md
  px-1
  relative

  ${({ $uploading }) =>
    $uploading &&
    `
    rounded-full 
    scale-110
  `}
`;

const Icon = tw(UploadFileIcon)`
  w-8
  text-white
`;

const Placeholder = tw.div`
  text-muted
  text-sm
  px-3
  whitespace-nowrap
  truncate
`;

const Label = tw.p`
  text-muted
  whitespace-nowrap
  my-2
`;

const Percentage = tw.div`
  text-white
  text-xs
  w-8
  h-8
  overflow-hidden
  text-center
  leading-9
  scale-[90%]
`;

const Loader = tw.div`
  top-0
  left-0
  absolute
  border-4
  border-t-4
  border-gray-300
  border-t-blue-500
  rounded-full
  w-10
  h-10
  animate-spin
`;
