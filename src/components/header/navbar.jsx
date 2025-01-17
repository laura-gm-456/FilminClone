import React from "react";
import "./navbar.css";
import Logo from "./logo";
import Links from "./links";

const Navbar = () => {
  return (
    <header className="navbar">
      <Logo />
      <Links />
    </header>
  );
};

export default Navbar;