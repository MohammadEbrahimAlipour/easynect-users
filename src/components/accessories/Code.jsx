import React, { useEffect } from "react";

const Code = ({ setAccessCode }) => {
  const handleChange = (e) => {
    // Append the "device/" prefix to the entered code
    setAccessCode(`device/${e.target.value}`);
  };

  return (
    <div className="border border-black  rounded-md py-1">
      <label
        className="font-medium text-sm border-e-2 me-2 pe-2 ps-4"
        htmlFor="code"
      >
        کد
      </label>
      <input
        required={true}
        id="code"
        type="text"
        placeholder="کد خود را وارد کنید..."
        className="bg-lightMenu outline-0 font-medium "
        name="code"
        onChange={handleChange}
      />

      {/* button */}
    </div>
  );
};

export default Code;
