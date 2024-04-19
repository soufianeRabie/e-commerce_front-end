import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../../Context/GlobalState.jsx'
import { useEffect, useState } from 'react'
import { SlideCards } from './SlideCards.jsx'
import { CarouselImage } from './Carousel.jsx'

function SimilarProducts() {
  const params = useParams()
  const [data, setData] = useState([])
  const { products } = useAuth()
  const { id } = params
  const product = products.find((product) => product?.id === parseInt(id))
  console.log(product)

  useEffect(() => {
    const productHasSameCategory = products.filter(
      (p) =>
        p?.category === product?.category &&
        p?.quantity > 0 &&
        p?.id !== parseInt(id),
    )
    console.log(productHasSameCategory)
    setData(productHasSameCategory)
  }, [products, id])

  return (
    <div className="w-3/4 m-auto">
      {product && (
        <div className={''}>
          <div className={'my-16'}>
            <h1 className={'text-3xl text-center'}> SIMILAR PRODUCTS</h1>
          </div>
          <CarouselImage data={data} />
        </div>
      )}
    </div>
  )
}

export default SimilarProducts
