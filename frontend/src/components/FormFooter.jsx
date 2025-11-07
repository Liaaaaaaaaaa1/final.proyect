import React from "react";
import { Link } from "react-router-dom";

function FormFooter({ text, linkText, linkTo }) {
  return (
    <div className="register-link">
      <p>
        {text} <Link to={linkTo}>{linkText}</Link>
      </p>
    </div>
  );
}

export default FormFooter;
