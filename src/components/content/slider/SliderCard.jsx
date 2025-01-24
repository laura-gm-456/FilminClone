import PropTypes from 'prop-types';
import './Slider.css';
import { Link } from "react-router-dom";


function Tags({ media }) {
  return (
    <div className="tags">
      {media.media_type === 'tv' && (
        <span className="tag">
          {media.seasons || 1} TEMPORADA{media.seasons > 1 ? 'S' : ''}
        </span>
      )}
      <span className="tag exclusive">ESTRENO EXCLUSIVO</span>
    </div>
  );
}


function Subtitle({ media }) {
  if (media.media_type === 'movie') {
    return <p className="slider-subtitle">{media.director || 'Director desconocido'}</p>;
  }
  return null; 
}


function SliderCard({ media }) {
  return (
    <div
      className="slider-card"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${media.backdrop_path})`,
      }}
    >
      <div className="slider-overlay"></div>
      <div className="slider-card-content">       
        <Tags media={media} />        
        <h3 className="slider-title">{media.title || media.name}</h3>
      
        <Subtitle media={media} />  
        
        <button
          className="slider-button"
          onClick={() => onPlayTrailer(media.id, media.media_type)}
        > <Link to="/construction" target="_blank">
          Ver Ahora 
        </Link>
        </button>

      </div>
    </div>
  );
}

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

Tags.propTypes = {
  media: PropTypes.shape({
    media_type: PropTypes.oneOf(['movie', 'tv']).isRequired,
    seasons: PropTypes.number,
  }).isRequired,
};

Subtitle.propTypes = {
  media: PropTypes.shape({
    media_type: PropTypes.oneOf(['movie', 'tv']).isRequired,
    director: PropTypes.string,
    seasons: PropTypes.number,
  }).isRequired,
};

export default SliderCard;

