import React, { useState, useRef } from "react";
import { UploadFile } from "../Icons";

const File = ({
  mediaData,
  is_square,
  handleInputChange,
  setLivePreviewTitle,
  setLivePreviewDesc,
  setFile
}) => {
  const [fileName, setFileName] = useState("برای انتخاب فایل کلیک کنید.");
  const fileInputRef = useRef();

  const handleFileInputClick = () => {
    // Trigger the hidden file input click event
    fileInputRef.current.click();
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      setFile(file); // Pass the file object to the parent component via a new prop
    } else {
      setFileName("");
      setFile(null); // Clear the file if none is selected
    }
  };
  return (
    <div className="mt-10 flex flex-col w-full">
      <label htmlFor="title" className="mb-2">
        عنوان
      </label>
      <input
        required
        htmlFor="title"
        name="title"
        placeholder={mediaData?.title}
        onChange={(e) => {
          handleInputChange(e);
          setLivePreviewTitle(e.target.value);
        }}
        className="border-2 rounded-md text-sm py-1 px-1 mb-1"
      />

      <label className="my-2">توضیحات:</label>
      <input
        id="icon"
        type="text"
        name="description"
        onChange={(e) => {
          handleInputChange(e);
          setLivePreviewDesc(e.target.value);
        }}
        className={`border-2 rounded-md text-sm py-1 px-1 ${
          is_square ? "" : "disabled:opacity-60"
        }`}
        placeholder={mediaData.description}
        disabled={!is_square}
      />

      <label className="my-2">آپلود فایل:</label>

      <div className="w-full border-2 rounded-lg flex flex-row-reverse justify-between py-1 items-center px-1 overflow-hidden">
        <div className="file-uploader bg-black py-1 w-[15%] rounded-lg flex justify-center items-center overflow-hidden">
          <input
            required
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
          <span
            onClick={handleFileInputClick}
            //   className="border-2 rounded-md text-sm py-1 px-1"
          >
            <UploadFile />
            {/* {fileName ? fileName : <UploadFile />} */}
          </span>
        </div>
        <p className="text-muted text-sm">{fileName}</p>
      </div>
    </div>
  );
};

export default File;
