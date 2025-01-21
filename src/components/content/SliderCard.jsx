
import React from 'react';
import PropTypes from 'prop-types';
import './Slider.css';

const SliderCard = ({ media, isActive, onPlayTrailer }) => {
  return (
    <div
      className={`slider-card ${isActive ? 'active' : ''}`}
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${media.backdrop_path})`,
      }}
    >
      {/* Capa oscura */}
      <div className="slider-overlay"></div>

      {/* Contenido superpuesto */}
      <div className="slider-card-content">
        <div className="tags">
          {media.media_type === "tv" && (
            <span className="tag">
              {media.seasons || 1} TEMPORADA{media.seasons > 1 ? "S" : ""}
            </span>
          )}
          <span className="tag exclusive">ESTRENO EXCLUSIVO</span>
        </div>
        <h3 className="slider-title">{media.title || media.name}</h3>
        <p className="slider-subtitle">
          {isActive && media.director ? media.director : "Varios Directores"}
        </p>
        {media.media_type === "movie" && (
          <button className="slider-button" onClick={onPlayTrailer}>
            VER AHORA
          </button>
        )}
      </div>
    </div>
  );
};

SliderCard.propTypes = {
  media: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    name: PropTypes.string,
    backdrop_path: PropTypes.string.isRequired,
    media_type: PropTypes.oneOf(['movie', 'tv']).isRequired,
    director: PropTypes.string,
    seasons: PropTypes.number,
  }).isRequired,
  isActive: PropTypes.bool,
  onPlayTrailer: PropTypes.func.isRequired, // Marcada como requerida

};

export default SliderCard;
