import { UploadFile } from "@/components/Icons";
import UploadInput from "@/components/UploadInput";
import React, { useState, useRef } from "react";

const CreateFile = ({
  mediaData,
  showTooltip,
  handleTouchStart,
  handleTouchEnd,
  is_square,
  handleInputChange,
  setLivePreviewTitle,
  setLivePreviewDesc,
  setFile,
}) => {
  return (
    <div className="mt-10 flex flex-col w-full">
      <label htmlFor="title" className="mb-2">
        عنوان
      </label>
      <input
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
      <UploadInput
        onChoose={(file) => {
          setFile(file);
        }}
      />
    </div>
  );
};

export default CreateFile;
