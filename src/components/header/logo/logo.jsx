import React from "react";
import logo from "../../../assets/img/logo.png";

const Logo = () => {
  return (
    <div className="navbar__logo">
      <a href="/"><img src={logo} alt="Logo Filmin"/></a>
    </div>
  );
};

export default Logo;