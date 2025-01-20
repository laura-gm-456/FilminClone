import React from "react";
import DropdownMenu from "./dropmenu";

const Links = () => {
  return (
    <nav className="navbar__links">
      <a href="/">Inicio</a>
      <a href="/cine">Cine</a>
      <a href="/series">Series</a>
      <DropdownMenu/>
    </nav>
  );
};

export default Links;