import React, { useState } from "react";
import "./dropmenu.css";
import downArrow from "../../../assets/img/downArrow.png";
import { Link } from "react-router-dom";

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setIsActive(!isActive);
  };

  return (
    <div className="dropdown">
      <button 
        className={`dropdown__toggle ${isActive ? "active" : ""}`}
        onClick={toggleMenu}
      >
        Más <img src={ downArrow } alt="arrow-down" className="arrow-icon"/>
      </button>
      {isOpen && (
        <ul className="dropdown__menu">
          <li><Link to="/construction" target="_blank">Novedades</Link></li>
          <li><Link to="/construction" target="_blank">Próximamente</Link></li>
          <li><a href="https://www.thefilmintimes.com/es/" target="_blank">The Filmin Times</a></li>
          <li><a href="#https://www.filmin.es/blog" target="_blank">Blog</a></li>
          <li><a href="https://prensa.filmin.es/" target="_blank">Prensa</a></li>
          <li><a href="https://ayuda.filmin.es/es/support/home" target="_blank">Centro de ayuda</a></li>
        </ul>
      )}
    </div>
  );
};

export default DropdownMenu;