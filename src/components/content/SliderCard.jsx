
import React from 'react';
import PropTypes from 'prop-types';
import './Slider.css'; 


const SliderCard = ({ media }) => {
  return (
    <div
      className="slider-card"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${media.backdrop_path})`,
      }}
    >
      <div className="slider-card-content">
        <p className="slider-badge">{media.media_type === 'movie' ? 'Estreno Exclusivo' : ''}</p>,
        <h3 className="slider-title">{media.title || media.name}</h3>
        {media.media_type === 'movie' && (
          
          <p className="slider-subtitle">{media.director || 'Director desconocido'}</p>
        )}
        {media.media_type === 'tv' && (
          <p className="slider-subtitle">{`Temporadas: ${media.seasons}`}</p>
        )}
        <button className="slider-button">Ver Ahora</button>
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
};

export default SliderCard;
