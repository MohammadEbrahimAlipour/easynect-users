import React, { useEffect, useRef, useState } from "react";
import tw from "tailwind-styled-components";
import UploadFileIcon from "@/assets/icons/upload.svg";

const isFile = (item) => item instanceof File;

export default function GalleryUploader({
  gallery,
  onChoose,
  handleRouterBack,
  handleApiSubmit,
  handleDeleteFromApi, 
}) {
  const [images, setImages] = useState([]);
  const fileInputRef = useRef();

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files || []);
    setImages((prev) => [...prev, ...selectedFiles]);
    onChoose?.(selectedFiles);
    fileInputRef.current.value = "";
  };

  const removeImage = async (item, index) => {
    // اگر از API آمده بود => DELETE to API
    if (!isFile(item) && item.id) {
      await handleDeleteFromApi(item.id); 
      // (تو این تابع باید DELETE رو بزنی: /api/v1/pages/{page_id}/gallery/{gallery_id}/ )
    }

    // حذف از state
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(()=>{
    if(gallery){
      setImages(gallery);
    }
  },[gallery])
  console.log(gallery,images, 'gallery')
  return (
    <Wrapper>
      <div className="flex justify-between items-center mb-6">
        <Label>گالری تصاویر</Label>

        <div className="text-sm flex items-center gap-2 justify-center">
          <span
            onClick={handleRouterBack}
            className="me-2 border-[1px] border-black px-4 py-1 rounded-lg"
          >
            انصراف
          </span>

          <button
            onClick={() => handleApiSubmit(images)}
            type="submit"
            className="bg-dark text-white px-4 py-1 rounded-lg border-[1px] border-black"
          >
            ذخیره
          </button>
        </div>
      </div>

      <InputWrapper onClick={handleFileInputClick}>
        <Input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          multiple
          accept="image/*"
        />
        <IconWrapper>
          <Icon />
        </IconWrapper>
        <Placeholder>برای انتخاب چند تصویر کلیک کنید</Placeholder>
      </InputWrapper>

      <Gallery>
        {images?.map((item, index) => {
          const preview = isFile(item)
            ? URL.createObjectURL(item)
            : item.pic_url;
          return (
            <Thumbnail key={index}>
              <img
                src={preview}
                alt="preview"
                className="object-cover w-full h-full"
              />
              <RemoveButton onClick={() => removeImage(item, index)}>
                ×
              </RemoveButton>
            </Thumbnail>
          );
        })}
      </Gallery>
    </Wrapper>
  );
}

// styled components
const Wrapper = tw.div``;

const Label = tw.p`
  text-muted
  whitespace-nowrap
  my-2
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
  cursor-pointer
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

const Gallery = tw.div`
  grid
  grid-cols-3
  md:grid-cols-4
  gap-2
  mt-4
`;

const Thumbnail = tw.div`
  relative
  aspect-square
  rounded-md
  overflow-hidden
  border
`;

const RemoveButton = tw.button`
  absolute
  top-1
  right-1
  bg-black
  text-white
  rounded-full
  w-5
  h-5
  text-xs
  flex
  items-center
  justify-center
  hover:bg-red-600
`;
