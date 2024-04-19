import React, { useRef } from 'react'
import StarRating from '../../rating/StarRating.jsx'
import { useAuth } from '../../../Context/GlobalState.jsx'
import { GlobalColorTailwand, Library } from '../../../Library/Library.jsx'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

function CheckoutCard({ item }) {
  const { product, quantity } = item
  // console.log("this the product " , product)
  const { basket } = useAuth()
  useRef(null)
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  })
  basket.find((basketProduct) => basketProduct?.itemId === product?.id)
  return (
    <motion.div
      className="md:justify-evenly w-5/6 mx-auto mb-8 sm:m-10 justify-center flex flex-wrap"
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative product p-1 flex w-full flex-col overflow-hidden rounded-lg border border-gray-100 shadow-md">
        <div className="flex flex-wrap md:flex-nowrap justify-center">
          <div className="flex max-w-md justify-center sm:justify-start sm:m-5 h-56 imgProductDetails basket-card">
            <img
              className="rounded-md max-w-sm sm:ml-4"
              src={
                import.meta.env.VITE_APP_BACKEND_IMAGES_URL +
                product?.images[0]?.image
              }
              alt="Product"
            />
          </div>
          <div> {quantity ? `*${quantity}` : ''}</div>
          <div className="min-w-96 p-3 sm:p-4 md:flex flex-col mt-8 sm:m-0 h-full md:justify-evenly max-w-md">
            <div className="flex justify-evenly">
              <h2 className="font-semibold text-md sm:text-xl">
                {product.title}
              </h2>
              <StarRating rating={product.rating} />
              <span
                className={`mr-1 ml-1 rounded bg${GlobalColorTailwand} px-2 hover:text-red-600 py-1 text-xs font-semibold`}
              >
                {Math.floor(product.rating)}
              </span>
            </div>

            <div className="p-10">
              <div>
                <p className="text-md sm:text-lg flex flex-nowrap">
                  {product?.description}
                </p>
              </div>
              <div className="m-4 text-center flex">
                {product?.isSold ? (
                  <div>
                    <div
                      className={`text-2xl font-bold text${GlobalColorTailwand}`}
                    >
                      <small>$</small>
                      <strong>{product?.price}</strong>
                    </div>
                    <span className="text-sm text-slate-900 line-through">
                      <small>$</small>
                      {product?.oldPrice}
                    </span>
                  </div>
                ) : (
                  <div className="text-xl font-semibold text-slate-900">
                    <small>$</small>
                    <strong>{product?.price}</strong>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default CheckoutCard
