import React from "react";
import "./navbar.css";
import Logo from "./logo";
import Links from "./links";
import SearchIcon from "./searchicon";

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="navbar__left">
        <Logo />
        <Links />
      </div>
      <SearchIcon />
    </header>
  );
};

export default Navbar;
