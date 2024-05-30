import React, { useEffect, useRef } from 'react'
import StarRating from '../../rating/StarRating.jsx'
import { useAuth } from '../../../Context/GlobalState.jsx'
import './Product.css'
import { Link } from 'react-router-dom'
import { GlobalColorTailwand, Library } from '../../../Library/Library.jsx'
import { AddToCartButton } from './AddToCartButton.jsx'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

function ProductCard({
  id,
  title,
  image,
  oldPrice,
  isSold,
  price,
  rating,
  description,
  quantity: itemQuantity,
  hiddenButton = false,
  isAdmin = false,
}) {
  const { dispatch, user, basket } = useAuth()
  const quantityRef = useRef(null)
  const isProductReserve = basket.find(
    (basketProduct) => basketProduct?.itemId === id,
  )
  const ProductReservedQuantity = isProductReserve?.quantity || 0
  const [ref, inView] = useInView({
    triggerOnce: false, // Allow triggering the animation multiple times
    threshold: 0.5, // Trigger the animation when the element is 50% in view
  })

  const handleAddToBasket = async (e) => {
    e.preventDefault()
    const quantity = parseInt(quantityRef.current.value) || 1

    if (quantity > itemQuantity - ProductReservedQuantity) {
      return Library.showToast(
        'Quantity must be less than product quantity ',
        'error',
        'top-right',
        2000,
      )
    }

    try {
      await Library.addToBasket(user, id, dispatch, quantity)
      Library.showToast('Product added successfully')
    } catch ({ response }) {
      Library.showToast(response.data.error, 'error', 'top-right', 2000)
    }

    document.getElementById(`quantity ${id}`).value = ''
  }

  return (
    <motion.div
      id={id}
      className="product relative m-2 sm:m-1 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md "
      ref={ref}
      initial={{ opacity: 0.2, scale: 0.6 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5 }}
    >
      <Link to={!isAdmin ? `/product/${id}` : '#'}>
        <div className={'w-full h-52 product-img'}>
          <img className="w-full h-full" src={import.meta.env.VITE_APP_BACKEND_IMAGES_URL + image?.image} alt={title} />
        </div>

        {isSold && (
          <span
            className={`absolute top-0 left-0 m-2 rounded-full bg${GlobalColorTailwand} px-2 text-center text-sm font-medium text-white`}
          >
            {Math.floor(((oldPrice - price) / oldPrice) * 100)}% OFF
          </span>
        )}
        <div className="mt-4 px-5 ">
          <div className={'flex justify-between'}>
            <h5 className="text-xl tracking-tight text-slate-900">{title}</h5>
            {rating && (
              <span className="mr-1 ml-1 rounded bg-yellow-200 px-2 py-1 text-xs font-semibold">
                {Math.floor(rating)}
              </span>
            )}
          </div>
          <div className="mt-2 mb-5 flex items-center justify-between">
            <p>
              {isSold ? (
                <>
                  <span
                    className={`text-2xl font-bold text${GlobalColorTailwand} `}
                  >
                    <small>$</small>
                    <strong>{price}</strong>
                  </span>
                  <span className="text-sm text-slate-900 line-through">
                    <small>$</small>
                    {oldPrice}
                  </span>
                </>
              ) : (
                <span className="text-xl font-semibold text-slate-900">
                  <small>$</small>
                  <strong>{price}</strong>
                </span>
              )}
            </p>
            <div className="flex items-end justify-end">
              {rating ? <StarRating rating={rating} /> : ''}
            </div>
          </div>
        </div>
      </Link>

      {itemQuantity - ProductReservedQuantity > 0 && (
        <div className={'text-green-600 m-2 ml-8 relative'}>
          <span className="w-2 absolute -left-3 bottom-2 h-2 rounded bg-green-400  inline-block text-green-600">
            .
          </span>
          <span className={'center text-green-600'}>En Stock </span>
          <span className={'font-bold'}>
            {itemQuantity - ProductReservedQuantity}
          </span>
        </div>
      )}

      {!hiddenButton && itemQuantity - ProductReservedQuantity > 0 && (
        <div className={'flex justify-center items-center mb-2 '}>
          <input
            type="text"
            name="quantity"
            id={`quantity ${id}`}
            placeholder={'Qt'}
            className={'w-10 rounded-xl mx-1'}
            ref={quantityRef}
            style={{border:'2px solid black'}}
          />
          <div
            onClick={handleAddToBasket}
            className={'w-fit flex items-center justify-center'}
          >
            <AddToCartButton />
          </div>
        </div>
      )}
      {itemQuantity - ProductReservedQuantity <= 0 && (
        <div className={'flex justify-center '}>
          <span className={'center text-red-600'}>Out of stock</span>
        </div>
      )}
    </motion.div>
  )
}

export default ProductCard
