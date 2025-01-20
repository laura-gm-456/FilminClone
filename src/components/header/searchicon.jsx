import React, { useState } from "react";
import search_icon1 from "../../images/search_icon1.png";
import "./searchicon.css";


const SearchIcon = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  return (
    <div className="search-icon">
      {/* Imagen de búsqueda */}
      <img 
        src={search_icon1} 
        alt="Buscar" 
        className="search-icon__image"
        onClick={toggleSearch}
      />
      
      {/* Barra de búsqueda visible al hacer clic */}
      {isSearchVisible && (
        <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar..."
            className="search-bar__input"
          />
        </div>
      )}
    </div>
  );
};

export default SearchIcon;