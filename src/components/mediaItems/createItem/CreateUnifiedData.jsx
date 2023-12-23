import { InfoIcon } from "@/components/Icons";
import React, { useState, useRef } from "react";

const CreateUnifiedData = ({
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
        defaultValue={mediaData.title}
        onChange={(e) => {
          handleInputChange(e);
          setLivePreviewTitle(e.target.value);
        }}
        className="border-2 rounded-md text-sm py-1 px-1 mb-3 font-ravi"
      />
      <span className="flex justify-between items-center relative">
        <label htmlFor="icon" className="mb-2">
          اطلاعات را وارد کنید:
        </label>

        <span
          className={`absolute z-10 w-[140px] left-[22px] -top-6 bg-dark text-white
rounded-md overflow-hidden text-xs p-2 opacity-0 transform scale-0 transition-opacity duration-700 
${showTooltip ? "opacity-100 scale-100" : "opacity-0 scale-0"}`}
        >
          <p className="mb-1">{mediaData.content_store.hint_title}:</p>
          <p>{mediaData.content_store.hint}</p>
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
        className="border-2 rounded-md text-sm py-1 px-1 font-ravi"
        defaultValue={mediaData.content_val}
      />

      <>
        <label
          htmlFor="desc"
          className={`my-3 ${is_square ? "" : "text-muted"}`}
        >
          توضیحات:
        </label>

        <input
          id="desc"
          type="text"
          name="description"
          onChange={(e) => {
            handleInputChange(e);
            setLivePreviewDesc(e.target.value);
          }}
          className={`border-2 rounded-md text-sm py-1 px-1 font-ravi ${
            is_square ? "" : "disabled:opacity-60"
          }`}
          defaultValue={mediaData.description}
          disabled={!is_square}
        />
      </>
    </div>
  );
};

export default CreateUnifiedData;
