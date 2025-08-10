import React, { useState } from "react";
import tw from "tailwind-styled-components";
import { toast } from "react-toastify";

export default function VideoEmbedUploader({ onAdd, handleApiSubmit, handleRouterBack }) {
  const [videoUrl, setVideoUrl] = useState("");
  const [embedList, setEmbedList] = useState([]);

  const handleAddVideo = () => {
    if (isValidEmbedUrl(videoUrl)) {
      const newList = [...embedList, videoUrl];
      setEmbedList(newList);
      setVideoUrl("");
      onAdd?.(videoUrl); // optional callback
    } else {
      toast.error("لینک وارد شده معتبر نیست. لطفاً از لینک‌های embeddable استفاده کنید.", {
        position: 'top-center',
        autoClose: 2500,
      });
    }
  };

  const isValidEmbedUrl = (url) => {
    return url.startsWith("https://www.youtube.com/embed/") ||
      url.startsWith("https://player.vimeo.com/video/");
    // You can extend this with regex for more platforms
  };

  const removeVideo = (index) => {
    setEmbedList((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Wrapper>
      <div className="flex justify-between items-center mb-6">

        <Label>لینک ویدیو (Embed)</Label>
        <div className="text-sm flex items-center gap-2 justify-center">
          <span
            onClick={handleRouterBack}
            className="me-2 border-[1px] border-black px-4 py-1 rounded-lg"
          >
            انصراف
          </span>
          <button
            onClick={async () => { handleApiSubmit(faqs) }} // This function should handle the API submission
            type="submit" // This makes it a submit button
            className="bg-dark text-white px-4 py-1 rounded-lg border-[1px] border-black"
          >
            ذخیره
          </button>
        </div>
      </div>

      <InputWrapper>
        <Input
          type="text"
          value={videoUrl}
          placeholder="مثال: https://www.youtube.com/embed/xyz"
          onChange={(e) => setVideoUrl(e.target.value)}
        />
        <AddButton onClick={handleAddVideo}>افزودن</AddButton>
      </InputWrapper>

      <VideoList>
        {embedList.map((url, index) => (
          <VideoItem key={index}>
            <iframe
              src={url}
              title={`video-${index}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
            <RemoveButton onClick={() => removeVideo(index)}>×</RemoveButton>
          </VideoItem>
        ))}
      </VideoList>
    </Wrapper>
  );
}

// Styled Components
const Wrapper = tw.div``;

const Label = tw.p`
  text-muted
  whitespace-nowrap
  my-2
`;

const InputWrapper = tw.div`
  flex
  gap-2
  mb-4
`;

const Input = tw.input`
  flex-1
  border-2
  rounded-lg
  px-3
  py-2
  text-sm
  focus:outline-none
`;

const AddButton = tw.button`
  bg-[#D1AB48]
  text-white
  px-4
  py-2
  rounded-lg
  hover:bg-yellow-700
  transition
`;

const VideoList = tw.div`
  grid
  grid-cols-1
  md:grid-cols-2
  gap-4
`;

const VideoItem = tw.div`
  relative
  aspect-video
  border
  rounded-md
  overflow-hidden
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
