import React from "react";

function PasswordRules({ password }) {
  const rules = [
    { test: password.length >= 8, text: "Debe tener al menos 8 caracteres" },
    { test: password.length <= 12, text: "No puede tener más de 12 caracteres" },
    { test: /[0-9]/.test(password), text: "Debe incluir al menos un número" },
    { test: /[A-Z]/.test(password), text: "Debe incluir al menos una letra mayúscula" },
    { test: /[a-z]/.test(password), text: "Debe incluir al menos una letra minúscula" },
  ];

  return (
    <ul style={{ listStyle: "none", padding: 0, marginTop: "10px", fontSize: "0.85em" }}>
      {rules.map((rule, index) => (
        <li
          key={index}
          style={{
            color: rule.test ? "#ffffff" : "#ff6666",
            transition: "color 0.3s ease",
          }}
        >
          {rule.text}
        </li>
      ))}
    </ul>
  );
}

export default PasswordRules;
