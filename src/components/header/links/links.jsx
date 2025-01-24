import React from "react";
import DropdownMenu from "../dropmenu/dropmenu";

const Links = () => {
  return (
    <nav className="navbar__links">
      <a href="/">Inicio</a>
      <a href="/construction.html">Cine</a>
      <a href="/construction.html">Series</a>
      <DropdownMenu />
    </nav>
  );
};

export default Links;