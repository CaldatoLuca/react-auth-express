import React from "react";

const InputElement = ({ type, name, label, value, onChange, options }) => {
  switch (type) {
    case "text":
    case "email":
    case "password":
    case "number":
      return (
        <div className="flex flex-col">
          <label>{label}</label>
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            className=" rounded-md text-neutral-900 outline-none px-1 cursor-pointer"
            required
          />
        </div>
      );
    case "textarea":
      return (
        <div className=" flex flex-col mb-2">
          <label>{label}</label>
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            className=" rounded-md text-neutral-900"
            required
          />
        </div>
      );
    case "file":
      return (
        <div className=" flex flex-col">
          <label>{label}</label>
          <input
            type="file"
            name={name}
            onChange={onChange}
            className=" rounded-md"
            required
          />
        </div>
      );
    case "select":
      return (
        <div className="flex flex-col">
          <label>{label}</label>
          <select
            name={name}
            value={value}
            onChange={onChange}
            className=" rounded-md text-neutral-900"
            required
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      );
    case "checkbox":
      return (
        <div className="mt-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name={name}
              checked={value}
              onChange={onChange}
              className=" rounded-full"
            />
            {label}
          </label>
        </div>
      );
    case "multicheckbox":
      return (
        <div className="flex flex-wrap ">
          <label className="w-full">{label}</label>
          {options.map((option) => (
            <div key={option.value} className=" mr-2">
              <label className=" flex items-center">
                <input
                  type="checkbox"
                  name={name}
                  value={option.value}
                  checked={value.includes(option.value)}
                  onChange={onChange}
                />
                {option.label}
              </label>
            </div>
          ))}
        </div>
      );
    default:
      return null;
  }
};

export default InputElement;
