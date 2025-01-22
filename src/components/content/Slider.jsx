
import { useEffect, useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { fetchMedia } from '../../services/TmbServicesMedia';
import SliderCard from './SliderCard';
import './Slider.css';

function Slider() {
  const [mediaItems, setMediaItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTrailer, setActiveTrailer] = useState(null);
  const swiperRef = useRef(null);

  useEffect(() => {
    const loadMedia = async () => {
      try {
        const mediaData = await fetchMedia();
        setMediaItems(mediaData);
      } catch (err) {
        console.error('Error fetching media:', err);
        setError('Error al cargar los datos. Por favor, intenta de nuevo.');
      } finally {
        setLoading(false);
      }
    };
    loadMedia();
  }, []);

  const handleSlideChange = (swiper) => {
    const currentIndex = swiper.activeIndex;
    const currentMedia = mediaItems[currentIndex];

    if (currentMedia) {
      setActiveTrailer({ id: currentMedia.id, videoId: currentMedia.trailerKey });
      console.log('Slide activo:', currentMedia.title || currentMedia.name);

      if (swiperRef.current?.autoplay) {
        swiperRef.current.autoplay.stop();
      }
    }
  };

  const handlePlayTrailer = (id) => {
    const selectedMedia = mediaItems.find((item) => item.id === id);
    if (selectedMedia) {
      setActiveTrailer({ id, mediaType: selectedMedia.media_type, director: selectedMedia.director || "Varios Directores" });
    }
  };

  const handleTrailerEnd = () => {
    if (swiperRef.current) {
      console.log('Tráiler finalizado, pasando al siguiente slide.');
      swiperRef.current.slideNext();
      swiperRef.current.autoplay.start();
    }
  };

  const renderMediaSlides = () => (
    mediaItems.map((media) => (
      <SwiperSlide key={media.id}>
        <SliderCard
          media={media}
          isActive={activeTrailer?.id === media.id}
          onPlayTrailer={() => handlePlayTrailer(media.id)}
          onTrailerEnd={handleTrailerEnd}
        />
      </SwiperSlide>
    ))
  );

  if (loading) return <p>Cargando datos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="slider-container">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 10000,
          disableOnInteraction: false,
        }}
        loop={mediaItems.length > 1}
        slidesPerView={1}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={handleSlideChange}
      >
        {renderMediaSlides()}
      </Swiper>
    </div>
  );
}

export default Slider;


