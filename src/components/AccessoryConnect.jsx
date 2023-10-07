import Link from "next/link";
import React, { useState } from "react";

const AccessoryConnect = ({ onClose }) => {
  return (
    <div className=" pt-5 pb-8 container !px-6">
      {/* top line close btn*/}
      <div className="w-full flex justify-center pb-6">
        <button
          onClick={onClose}
          id="closeBTN"
          className="w-[36px] h-[5px] rounded-2xl opacity-25 bg-muted"
        />
      </div>
      <p className="text-lg font-medium">اتصال اکسسوری</p>
      <p className="text-muted text-sm mt-6 mb-2 text-right">
        لطفا کد اکسسوری را وارد نمایید
      </p>
      <div className={`bg-lightMenu rounded-lg  mb-3 border-2 box-border`}>
        <div className="flex justify-start items-center py-3">
          <label
            className=" border-e-2 text-muted me-2 pe-2 ps-4"
            for="data_inp"
          >
            کد
          </label>
          <input
            id="data_inp"
            placeholder="1234sft456"
            className="bg-lightMenu outline-0  "
          />
        </div>
      </div>

      {/* button */}
      <Link
        href="/confrimEmailCode"
        className="flex items-center justify-center w-full
                  bg-dark text-white py-3 leading-0 rounded-lg mt-7"
      >
        اتصال
      </Link>
    </div>
  );
};

export default AccessoryConnect;
