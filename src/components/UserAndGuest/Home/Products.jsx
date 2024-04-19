import ProductCard from './ProductCard.jsx'
import React from 'react'

export const Products = ({ result = [] }) => {
  return (
    <>
      {result.map((item, key) => (
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
      ))}
    </>
  )
}
