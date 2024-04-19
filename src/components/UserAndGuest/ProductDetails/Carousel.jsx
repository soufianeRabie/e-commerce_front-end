import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import ProductCard from '../Home/ProductCard.jsx'

export const CarouselImage = ({ data }) => {
  return (
    <>
      <Carousel>
        <CarouselContent  className={""}>
          {data?.map((item, key) => {
            return (
              <CarouselItem key={key}  className={'md:basis-1/2 lg:basis-1/3 flex justify-center'}>
                {' '}
                <ProductCard
                  key={key}
                  rating={item.rating}
                  id={item.id}
                  image={item.images[0]}
                  isSold={item.isSold}
                  price={item.price}
                  oldPrice={item.oldPrice}
                  description={item.description}
                  title={item.title}
                  quantity={item?.quantity}
                />
              </CarouselItem>
            )
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  )
}
