import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import ProductCard from "../Home/ProductCard.jsx";
export const SlideCards = ({ data = [] }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 100,
    slidesToShow: 3,
    slidesToScroll: 1,
  }
  return (
    <>
      <Slider {...settings}>
        {data.map((d , key) => (
        <ProductCard key={key} title={d?.title} image={d?.image} description={d?.description} id={d?.id} price={d?.price}/>
        ))}
      </Slider>
    </>
  )
}
