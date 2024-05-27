import { useRef, useState } from "react";
import tw from "tailwind-styled-components";

// assets
import UploadFileIcon from "@/assets/icons/upload.svg";

export default function UploadInput({
  onChoose,
  labelText = null,
  className = "",
}) {
  const [fileName, setFileName] = useState(null);
  const fileInputRef = useRef();

  const handleFileInputClick = () => {
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
        <IconWrapper>
          <Icon />
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
