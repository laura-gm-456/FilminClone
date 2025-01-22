// Combinación de códigos: Slider con tráiler integrado y configuraciones dinámicas
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import './Slider.css';

// Función para renderizar las etiquetas dinámicas
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

// Función para renderizar el subtítulo dinámico
function Subtitle({ media }) {
  if (media.media_type === 'movie') {
    return <p className="slider-subtitle">{media.director || 'Director desconocido'}</p>;
  }
  return null; // No mostrar subtítulo para TV
}

function SliderCard({ media, isActive, onPlayTrailer, onTrailerEnd }) {
  const [showTrailer, setShowTrailer] = useState(false); // Controla si se muestra el tráiler
  const TRAILER_DURATION = 50; // Tiempo en segundos para mostrar el tráiler

  useEffect(() => {
    if (isActive) {
      console.log('Slide activo:', media.title || media.name);

      const timer = setTimeout(() => {
        setShowTrailer(true); // Cambia a tráiler después de 3 segundos
        onPlayTrailer(); // Detiene el autoplay del slider
      }, 5000); // Tiempo para mostrar el póster antes de iniciar el tráiler

      return () => {
        clearTimeout(timer); // Limpia el temporizador si cambia el slide
        console.log('Limpieza del temporizador para:', media.title || media.name);
      };
    } else {
      setShowTrailer(false); // Reinicia a la imagen si el slide no está activo
      console.log('Reiniciando a la imagen para:', media.title || media.name);
    }
  }, [isActive, media, onPlayTrailer]);

  return (
    
    <div
      className="slider-card"
      style={{
        backgroundImage: !showTrailer
          ? `url(https://image.tmdb.org/t/p/original${media.backdrop_path})`
          : 'none', // Muestra el fondo solo si no se está reproduciendo el tráiler
      }}
    >
      {/* Capa oscura para el fondo */}
      <div className="slider-overlay"></div>

      <div className="slider-content">
        {/* Renderiza los tags */}
        <Tags media={media} />

        {/* Título y subtítulo superpuestos */}
        <h3 className="slider-title">{media.title || media.name}</h3>
        <Subtitle media={media} />

        {showTrailer ? (
          <div className="trailer-container">
            <ReactPlayer
              className="react-player"
              url={`https://www.youtube.com/watch?v=${media.trailerKey}`}
              playing={isActive}
              controls={true} // Mostrar controles del reproductor
              width="100%"
              height="100%"
              config={{
                youtube: {
                  playerVars: {
                    autoplay: 1,
                    modestbranding: 1,
                    rel: 0,
                    showinfo: 0,
                  },
                },
              }}
              onProgress={({ playedSeconds }) => {
                if (playedSeconds >= TRAILER_DURATION) {
                  console.log(`Tráiler interrumpido después de ${TRAILER_DURATION} segundos`);
                  onTrailerEnd(); // Cambia al siguiente slide después del tiempo especificado
                }
              }}
              onEnded={onTrailerEnd} // Cambia al siguiente slide si termina el tráiler completo
            />
          </div>
        ) : null}

        {/* Botón para ver más detalles */}
        <button className="slider-button"> Ver Ahora </button>
        
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
    trailerKey: PropTypes.string,
    director: PropTypes.string,
    seasons: PropTypes.number,
    media_type: PropTypes.oneOf(['movie', 'tv']).isRequired,
  }).isRequired,
  isActive: PropTypes.bool.isRequired,
  onPlayTrailer: PropTypes.func.isRequired,
  onTrailerEnd: PropTypes.func.isRequired,
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
