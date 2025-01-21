import React, { useState } from "react";
import "./dropmenu.css";

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown">
      <button className="dropdown__toggle" onClick={toggleMenu}>
        Más
      </button>
      {isOpen && (
        <ul className="dropdown__menu">
          <li><a href="#paginaenconstruccion">Novedades</a></li>
          <li><a href="#paginaenconstruccion">Próximamente</a></li>
          <li><a href="https://www.thefilmintimes.com/es/">The Filmin Times</a></li>
          <li><a href="#https://www.filmin.es/blog">Blog</a></li>
          <li><a href="https://prensa.filmin.es/">Prensa</a></li>
          <li><a href="https://ayuda.filmin.es/es/support/home">Centro de ayuda</a></li>
        </ul>
      )}
    </div>
  );
};

export default DropdownMenu;