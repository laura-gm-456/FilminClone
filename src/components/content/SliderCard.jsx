import PropTypes from 'prop-types';
import './Slider.css';

const SliderCard = ({ media, onPlayTrailer }) => {
  return (
    <div
      className="slider-card"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${media.backdrop_path})`,
      }}
    >
      {/* Capa oscura para el fondo */}
      <div className="slider-overlay"></div>

      <div className="slider-card-content">
        {/* Tags dinámicos */}
        <div className="tags">
          {media.media_type === 'tv' && (
            <span className="tag">
              {media.seasons || 1} TEMPORADA{media.seasons > 1 ? 'S' : ''}
            </span>
          )}
          <span className="tag exclusive">ESTRENO EXCLUSIVO</span>
        </div>

        {/* Título de la película o serie */}
        <h3 className="slider-title">{media.title || media.name}</h3>

        {/* Subtítulo para mostrar el director o temporadas */}
        <p className="slider-subtitle">
          {media.media_type === 'movie'
            ? media.director || 'Director desconocido'
            : `Temporadas: ${media.seasons || 1}`}
        </p>

        {/* Botón para ver más detalles o el tráiler */}
        <button
          className="slider-button"
          onClick={() => onPlayTrailer(media.id, media.media_type)}
        >
          Ver Ahora
        </button>
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
  onPlayTrailer: PropTypes.func.isRequired, // Función requerida para manejar el botón de "Ver Ahora"
};

export default SliderCard;
