import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import "swiper/css";
import "swiper/css/navigation";
import 'swiper/swiper-bundle.css';
import PropTypes from 'prop-types';
import { getProductsByList } from '../../../services/TmbServices';
import ProductCard from '../productCard/ProductCard';
import './Carousel.css'
import { getImageUrl } from '../../../services/TmbServices'; 

function Carousel({ title, fetchFunction }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function fetchProduct() {
            try {
                const data = await fetchFunction();
                return setProducts(data.results||[]);
            } catch (error) {
                console.error('Error getProductById:', error);
                throw error;
            } finally {
                setLoading(false);
            }
        }
        fetchProduct();
    }, [fetchFunction]); 
    if (!products) return;

    
  return (
    <>
    <h2 className="carousel-title">{title}</h2>
    <Swiper
      modules={[Navigation]}
      navigation 
      spaceBetween={15}
      slidesPerView={5} 
      slidesPerGroup={5}      
      loop
        className="carouselSwiper"
      >
        
        {products.map((product) => (
            <>
          <SwiperSlide key={`container${product.id}`} className="carousel-movie-card">            
                <ProductCard key={product.id} id={product.id} type={"movie"} />         
          </SwiperSlide>
          </>
        ))}
      </Swiper>
    </>
  )
}
Carousel.propTypes = {
    title: PropTypes.string.isRequired,
    fetchFunction: PropTypes.func.isRequired,
}
export default Carousel
