
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import './Slider.css';

function SliderCard({ media, isActive, onPlayTrailer, onTrailerEnd }) {
  const [showTrailer, setShowTrailer] = useState(false);
  const TRAILER_DURATION = 40;

  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => {
        setShowTrailer(true);
        onPlayTrailer();
      }, 5000);

      return () => clearTimeout(timer);
    } else {
      setShowTrailer(false);
    }
  }, [isActive, onPlayTrailer]);

  const renderBackground = () => {
    if (!showTrailer) {
      return `url(https://image.tmdb.org/t/p/original${media.backdrop_path})`;
    }
    return 'none';
  };

  const renderTags = () => (
    <div className="tags">
      {media.media_type === 'tv' && (
        <span className="tag">
          {media.seasons || 1} TEMPORADA{media.seasons > 1 ? 'S' : ''}
        </span>
      )}
      <span className="tag exclusive">ESTRENO EXCLUSIVO</span>
    </div>
  );

  const renderSubtitle = () => {
    if (media.media_type === 'movie') {
      return <p className="slider-subtitle">{media.director || 'Director desconocido'}</p>;
    }
    return null;
  };

  return (
    <div
      className="slider-card"
      style={{ backgroundImage: renderBackground() }}
    >
      <div className="slider-overlay"></div>

      <div className="slider-content">
        {renderTags()}
        <h3 className="slider-title">{media.title || media.name}</h3>
        {renderSubtitle()}

        {showTrailer ? (
          <div className="trailer-container">
            <ReactPlayer
              className="react-player"
              url={`https://www.youtube.com/watch?v=${media.trailerKey}`}
              playing={isActive}
              controls
              width="100%"
              height="100%"
              config={{
                youtube: {
                  playerVars: { autoplay: 1, modestbranding: 1, rel: 0, showinfo: 0 },
                },
              }}
              onProgress={({ playedSeconds }) => {
                if (playedSeconds >= TRAILER_DURATION) {
                  onTrailerEnd();
                }
              }}
              onEnded={onTrailerEnd}
            />
          </div>
        ) : null}

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

export default SliderCard;
