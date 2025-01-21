
import React, { useEffect, useState } from 'react';
import { getProductsByTrendy, getProductById } from '../../services/TmbServices';
import './Slider.css';
import PropTypes from 'prop-types';

// Configuración
const SLIDER_INTERVAL = 5000;

// Función para obtener detalles adicionales
const fetchMediaDetails = async (media) => {
  if (media.media_type === 'movie') {
    const details = await getProductById('movie', media.id, 'credits');
    return {
      ...media,
      director: details.credits.crew.find((person) => person.job === 'Director')?.name,
    };
  } else if (media.media_type === 'tv') {
    const details = await getProductById('tv', media.id);
    return {
      ...media,
      seasons: details.number_of_seasons,
    };
  }
  return media;
};

// Función para obtener tendencias y combinarlas
const fetchMedia = async () => {
  const movies = await getProductsByTrendy('movie');
  const tvShows = await getProductsByTrendy('tv');

  const combinedMedia = [...movies.results, ...tvShows.results];
  return Promise.all(combinedMedia.map(fetchMediaDetails));
};

// Componente para cada tarjeta del slider
const SliderCard = ({ media }) => {
    return (
      <div
        className="slider-card"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${media.backdrop_path})`,
        }}
      >
        <div className="slider-card-content">
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
  
  // Validación de las props
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

  
// Componente principal del slider
const Slider = () => {
  const [mediaItems, setMediaItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMedia = async () => {
      try {
        const mediaData = await fetchMedia();
        setMediaItems(mediaData);
      } catch (error) {
        console.error('Error fetching media:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMedia();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % mediaItems.length);
    }, SLIDER_INTERVAL);

    return () => clearInterval(interval);
  }, [mediaItems]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? mediaItems.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % mediaItems.length);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="slider-container">
      <div
        className="slider"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {mediaItems.map((media) => (
          <SliderCard key={media.id} media={media} />
        ))}
      </div>
      <div className="slider-navigation">
        <button className="slider-nav-button prev" onClick={handlePrev}>
          &#8249;
        </button>
        <button className="slider-nav-button next" onClick={handleNext}>
          &#8250;
        </button>
      </div>
      <div className="slider-indicators">
        {mediaItems.map((_, index) => (
          <span
            key={index}
            className={`slider-indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Slider;
