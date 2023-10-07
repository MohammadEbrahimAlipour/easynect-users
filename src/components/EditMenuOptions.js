import React from "react";

const EditMenuOptions = ({
  className,
  label,
  placeholder = "",
  name = "",
  value,
  onChange,
  defaultValue
}) => {
  return (
    <div
      className={`bg-lightMenu rounded-lg ${className} mb-3 border-2 box-border`}
    >
      <div className="flex justify-start items-center py-3">
        <label
          className="font-semibold border-e-2 text-muted me-2 pe-2 ps-4"
          htmlFor={name}
        >
          {label}
        </label>
        <input
          id="data_inp"
          name={name}
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          className="bg-lightMenu outline-0 font-medium "
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default EditMenuOptions;
