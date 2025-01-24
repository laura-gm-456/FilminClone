
import Slider from './slider/Slider'
import Carousel from './pruebaLista/PruebaLista'
import {
  getFamilyFriendly,
  getAnimated,
  getRomantic,
} from '../../services/TmbServicesCarousel'

function Content() {
  return (
    <>
    <Slider />
      <Carousel title="Maravillas para Ver con los Peques" fetchFunction={getFamilyFriendly} />
      <Carousel title="Cine de Animación" fetchFunction={getAnimated} />
      <Carousel title="Historias de Amor" fetchFunction={getRomantic} />
    </>
  )
}

export default Content