import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import "swiper/css";
import "swiper/css/navigation";
import { getProductsByList } from '../../../services/TmbServices';
import ProductCard from '../productCard/ProductCard';
import './PruebaLista.css'


function PruebaLista() {
    const [products, setProducts] = useState();
    useEffect(() => {
        async function fetchProduct() {
            try {
                const data = await getProductsByList("movie", "popular");
                return setProducts(data.results);
            } catch (error) {
                console.error('Error getProductById:', error);
                throw error;
            }
        }
        fetchProduct();
    }, []); 
    console.log(products);
    if (!products) return;

    
  return (
    <>
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
          <SwiperSlide key={product.id} className="carousel-movie-card">            
                <ProductCard key={product.id} id={product.id} type={"movie"} />         
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
      modules={[Navigation]}
      navigation 
      spaceBetween={20}
      slidesPerView={5}
      slidesPerGroup={5}
            
      loop
        className="carouselSwiper"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id} className="carousel-movie-card2">            
                <ProductCard key={product.id} id={product.id} type={"movie"} />         
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}

export default PruebaLista
/**/