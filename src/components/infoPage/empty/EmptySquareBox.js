import { CloseIcon, PlusSignPageView } from "@/components/Icons";
import React, { useState, useEffect, useRef } from "react";

const EmptySquareBox = () => {
  const [boxType, setBoxType] = useState("");
  const [showAddPopUp, setShowAddPopUp] = useState(false);
  const [showAddSquareOnePopUp, setShowAddSquareOnePopUp] = useState(false);
  const [showRecPopUp, setShowRecPopUp] = useState(false);

  console.log("boxType", boxType);

  const HandleSquareType = () => {
    setBoxType("squareBox");
    setShowAddPopUp(false);
  };

  const HandleRecType = () => {
    setBoxType("recBox");
    setShowAddPopUp(false);
  };

  const HandleShowAddPopUp = () => {
    setShowAddPopUp(true);
  };

  return (
    <>
      {boxType === "squareBox" ? (
        <>
          {/* square box */}
          <div className="grid grid-cols-2 gap-5 mb-4  relative ">
            {/* square box popup */}
            <span
              className={`absolute bg-white w-full shadow-2xl border rounded-md py-2 px-5
          transition-all duration-300
          ${showAddSquareOnePopUp ? "" : "opacity-0 pointer-events-none"}`}
            >
              <div
                onClick={() => setShowAddSquareOnePopUp(false)}
                className="mb-2 "
              >
                <CloseIcon />
              </div>
              test
            </span>

            <div
              onClick={setShowAddSquareOnePopUp}
              className="px-4 py-3 border-2 rounded-2xl overflow-hidden h-[140px] bg-graySubmit shadow-customInset
        flex justify-center items-center
        "
            >
              <PlusSignPageView />
            </div>
            <div
              className="px-4 py-3 border-2 rounded-2xl overflow-hidden bg-graySubmit shadow-customInset
        
        flex justify-center items-center"
            >
              <PlusSignPageView />
            </div>
          </div>
        </>
      ) : null}

      {/* rectangle */}
      {boxType === "recBox" ? (
        <>
          <div className="bg-graySubmit shadow-customInset relative rounded-md py-3 flex justify-center items-center mb-4">
            <span
              className={`absolute bg-white w-full shadow-2xl border rounded-md py-2 px-5
          transition-all duration-300
          ${showRecPopUp ? "" : "opacity-0 pointer-events-none"}`}
            >
              <div onClick={() => setShowRecPopUp(false)} className="mb-2 ">
                <CloseIcon />
              </div>
              test
            </span>

            <span onClick={() => setShowRecPopUp(true)}>
              <PlusSignPageView />
            </span>
          </div>
        </>
      ) : null}

      {/* add data */}
      <div className="bg-graySubmit relative rounded-md py-1 flex justify-center items-center">
        {/* popUp */}
        <div
          className={`absolute bg-white border shadow-2xl rounded-md px-6 py-3 items-center justify-center  transition-all duration-300 ${
            showAddPopUp ? "" : "opacity-0 pointer-events-none"
          }`}
        >
          {/* close BTN */}
          <div className="mb-3" onClick={() => setShowAddPopUp(false)}>
            <CloseIcon />
          </div>

          <div className="flex flex-col">
            <button
              onClick={HandleSquareType}
              className="text-sm border border-dark rounded-md px-2 py-1 text-dark font-ravi mb-2"
            >
              باکس مربع ای
            </button>
            <button
              onClick={HandleRecType}
              className="text-sm border border-dark rounded-md px-2 py-1 text-dark font-ravi"
            >
              باکس مستطیل
            </button>
          </div>
        </div>

        {/* add pop up  */}
        <span onClick={HandleShowAddPopUp}>
          <PlusSignPageView />
        </span>
      </div>
    </>
  );
};

export default EmptySquareBox;
