import React from "react";
import BottomSheetWrapper from "../bottomSheet/BottomSheetWrapper";
import LoadingState from "../LoadingState";

const LeadForm = ({ open, onClose, leadFormData }) => {
  return (
    <div>
      {leadFormData ? (
        <BottomSheetWrapper open={open} onClose={onClose}>
          <h3 className="mt-4 font-bold">لطفا اطلاعات خود را وارد کنید</h3>

          {/* code input field */}
          <form className="py-5">
            {/* inputs */}

            {leadFormData.map((item) => (
              <div
                key={item.id}
                className="bg-lightMenu rounded-lg  mb-4 border-2 box-border overflow-hidden"
              >
                <div className="flex justify-start items-center py-3">
                  <label
                    className="font-medium text-sm border-e-2 text-muted me-2 pe-2 ps-4"
                    htmlFor="data_inp"
                  >
                    {item.title}
                  </label>
                  <input
                    id="data_inp"
                    name={item.title}
                    //   onChange={onChange}
                    placeholder={item.placeholder}
                    className="bg-lightMenu outline-0 py-1 text-sm font-medium "
                  />
                </div>
              </div>
            ))}

            {/* button */}
            <button
              href="/confrimEmailCode"
              className="flex items-center justify-center w-full
                      bg-dark text-white py-3 leading-0 rounded-lg mt-7"
            >
              تغییر ایمیل
            </button>
          </form>
        </BottomSheetWrapper>
      ) : (
        <LoadingState />
      )}
    </div>
  );
};

export default LeadForm;
