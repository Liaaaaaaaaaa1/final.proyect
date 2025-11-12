import React, { useState } from "react";

function PasswordInput({ value, onChange, placeholder = "Contraseña" }) {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="input-box" style={{ position: "relative" }}>
      <input
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
      <span
        onClick={toggleShowPassword}
        style={{
          position: "absolute",
          right: "15px",
          top: "50%",
          transform: "translateY(-50%)",
          cursor: "pointer",
          userSelect: "none",
        }}
      >
        {showPassword ? "🙈" : "👁️"}
      </span>
    </div>
  );
}

export default PasswordInput;
