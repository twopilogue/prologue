import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  const title = "tmpTitle";
  return (
    <div>
      <Link className="header-link-home" to="/">
        {title}
      </Link>
    </div>
  );
};

export default Logo;
