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
        Menú
      </button>
      {isOpen && (
        <ul className="dropdown__menu">
          <li><a href="#opcion1">Opción 1</a></li>
          <li><a href="#opcion2">Opción 2</a></li>
          <li><a href="#opcion3">Opción 3</a></li>
        </ul>
      )}
    </div>
  );
};

export default DropdownMenu;