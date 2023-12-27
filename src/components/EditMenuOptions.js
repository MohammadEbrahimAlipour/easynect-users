import React from "react";

const EditMenuOptions = ({
  className,
  label,
  placeholder = "",
  name = "",
  value,
  onChange,
  defaultValue,
  required
}) => {
  return (
    <div
      className={`bg-lightMenu rounded-lg ${className} mb-3 border-2 box-border overflow-hidden`}
    >
      <div className="flex justify-start items-center py-3">
        <label
          className="font-semibold border-e-2 text-muted me-2 pe-2 ps-4 whitespace-nowrap"
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
          className="bg-lightMenu outline-0 font-medium focus:outline-none"
          onChange={onChange}
          required={required}
        />
      </div>
    </div>
  );
};

export default EditMenuOptions;
