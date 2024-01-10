import React, { Fragment, useState } from "react";
import BottomSheetWrapper from "../BottomSheetWrapper";
import AccessoryConnect from "@/components/AccessoryConnect";
import LoadingState from "@/components/LoadingState";
import Link from "next/link";

const BottomSheetMore = ({
  showSheetMore,
  setShowSheetMore,
  moreSheetDetails
}) => {
  const [showAccessory, setShowAccessory] = useState(false);
  const SubMenuOptions = ({ title, onClick, className = "" }) => {
    return (
      <div
        className={`${className} border-b-[1px] font-medium flex justify-center font-ravi`}
      >
        <button
          onClick={onClick}
          className={"block py-3 px-4 hover:bg-gray-100 font-ravi"}
        >
          {title}
        </button>
      </div>
    );
  };
  return (
    <>
      {moreSheetDetails !== null && (
        <>
          <BottomSheetWrapper
            open={showSheetMore}
            onClose={() => setShowSheetMore(false)}
          >
            <div>
              <ul
                className={`space-y-1  
        rounded-ss-2xl rounded-se-2xl z-20 text-center bg-white font-ravi`}
              >
                {/* title */}
                <li>
                  <SubMenuOptions
                    title={moreSheetDetails.card_title}
                    className="text-muted text-xs font-xs"
                  />
                </li>
                {/* options */}
                <li className="font-ravi">
                  <Link
                    href={`/app/lead/lead?id=${moreSheetDetails.id}`}
                    className=" border-b-[1px] font-medium flex justify-center font-ravi"
                  >
                    <button className="block py-3 px-4 hover:bg-gray-100 font-ravi">
                      فرم لید
                    </button>
                  </Link>
                </li>

                <li className="border-b-[1px] font-medium ">
                  <SubMenuOptions
                    title="اتصال اکسسوری"
                    onClick={() => {
                      setShowAccessory(true);
                      setShowSheetMore(false);
                    }}
                  />
                </li>

                {/* delete option */}
                {/* <li>
                  <SubMenuOptions
                    title="غیر فعال سازی"
                    className="text-[#EB5757]"
                  />
                </li> */}
              </ul>
            </div>
          </BottomSheetWrapper>

          <Fragment>
            {showAccessory && (
              <AccessoryConnect
                showAccessory={showAccessory}
                setShowAccessory={setShowAccessory}
                moreSheetDetails={moreSheetDetails}
              />
            )}
          </Fragment>
        </>
      )}
    </>
  );
};

export default BottomSheetMore;
