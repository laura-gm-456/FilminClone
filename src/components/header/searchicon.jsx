import React, { useState } from "react";
import { ReactComponent as SearchIconSVG } from "../../images/search_icon1.svg";
import "./searchicon.css";


const SearchIcon = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  return (
    <div className="search-icon">
      {/* SVG como componente React */}
      <SearchIconSVG
        className="search-icon__image"
        onClick={toggleSearch}
      />
      
      {/* Barra de búsqueda */}
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