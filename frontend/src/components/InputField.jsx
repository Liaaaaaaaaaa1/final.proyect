import React from "react";

function InputField({ type, placeholder, value, onChange, required = true }) {
  return (
    <div className="input-box">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
}

export default InputField;
