import React from "react";

const BottomSheet = ({ showSubMenu, handleSubMenuClose, childeren }) => {
  return (
    <>
      {/* sub menu Accessory */}
      {/* <div className="relative"> */}
      {showSubMenu && (
        <div className="!z-100 ]">
          {/* Submenu content */}
          <div
            className="fixed bottom-0 right-0 left-0 mx-2 space-y-1 shadow-sm rounded-ss-2xl rounded-se-2xl text-center
             bg-white py-7"
          >
            <div className="w-full flex justify-center pb-6">
              <button
                onClick={handleSubMenuClose}
                id="closeBTN"
                className="w-[36px] h-[5px] rounded-2xl opacity-25 bg-muted"
              />
            </div>

            {childeren}
          </div>
        </div>
      )}
      {/* </div> */}
    </>
  );
};

export default BottomSheet;
