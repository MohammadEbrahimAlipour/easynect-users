import React, { useMemo } from "react";
import { InfoIcon } from "../Icons";

const UnifiedData = ({
  mediaData,
  showTooltip,
  handleTouchStart,
  handleTouchEnd,
  is_square,
  handleInputChange,
  setLivePreviewTitle,
  setLivePreviewDesc
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
        className="border-2 rounded-md text-sm py-1 px-1 mb-3"
      />
      <span className="flex justify-between items-center relative">
        <label htmlFor="icon" className="mb-2">
          {mediaData.title}
        </label>

        <span
          className={`absolute z-10 w-[140px] left-[22px] -top-6 bg-dark text-white
  rounded-md overflow-hidden text-xs p-2 opacity-0 transform scale-0 transition-opacity duration-700 
  ${showTooltip ? "opacity-100 scale-100" : "opacity-0 scale-0"}`}
        >
          {mediaData.hint_title}:
          <span className="block mt-1">{mediaData.hint}</span>
        </span>
        <span
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseEnter={handleTouchStart}
          onMouseLeave={handleTouchEnd}
          onMouseDown={handleTouchStart}
          onMouseUp={handleTouchEnd}
        >
          <InfoIcon />
        </span>
      </span>

      <input
        id="icon"
        type="text"
        name="content_val"
        onChange={(e) => {
          handleInputChange(e);
        }}
        className="border-2 rounded-md text-sm py-1 px-1"
        placeholder={mediaData.placeholder}
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
    </div>
  );
};

export default UnifiedData;
