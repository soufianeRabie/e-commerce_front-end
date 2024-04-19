import React, {  useRef, } from 'react'
import { useAuth } from '../../../Context/GlobalState.jsx'
import { useInView } from 'react-intersection-observer'
import { Library } from '../../../Library/Library.jsx'
import { motion } from 'framer-motion'
const ShoppingCartItem = ({ item, hiddenButton }) => {
  // eslint-disable-next-line react/prop-types
  const { product, quantity } = item
  const { dispatch, basket, user } = useAuth()
  const quantityRef = useRef(1)
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  })

  const isProductReserve = basket.find(
    (basketProduct) => basketProduct?.itemId === product?.id,
  )
  const ProductReservedQuantity = isProductReserve?.quantity || 0

  const handleRemoveItemFromBasket = async (e) => {
    e.preventDefault()
    const quantity = quantityRef.current.value || 1

    try {
      await Library.removeFromBasket(user, product?.id, dispatch, quantity)
      Library.showToast('Product deleted successfully')
    } catch ({ response }) {
      Library.showToast(response.data.error, 'error', 'top-right', 2000)
    }

    quantityRef.current.value = ''
  }
  const handleUnauthorizedClick = (e) => {
    e.preventDefault()
    Library.showToast('Unauthorized click!', 'error', 'top-right', 4000)
  }

  const handleAddToBasket = async (e) => {
    e.preventDefault()
    const quantity = parseInt(quantityRef?.current?.value) || 1

    if (quantity > product?.quantity - ProductReservedQuantity) {
      return Library.showToast(
        'Quantity must be less than product quantity ',
        'error',
        'top-right',
        2000,
      )
    }

    try {
      await Library.addToBasket(user, product?.id, dispatch, quantity)
      Library.showToast('Product added successfully')
    } catch ({ response }) {
      Library.showToast(response.data.error, 'error', 'top-right', 2000)
    }

    //document.getElementById(`quantity ${product?.id}`).value = ''
    quantityRef.current.value = ''
  }

  return (
    <motion.div
      className="grid dark:text-white  mx-2 sm:ml-6grid-cols-1 lg:grid-cols-2 min-[550px]:gap-6 border-t border-gray-200 py-6"
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
      transition={{ duration: 0.5 }}
    >
      {/* Item */}
      <div className="flex items-center  flex-col min-[550px]:flex-row gap-3 min-[550px]:gap-6 w-full max-xl:justify-center max-xl:max-w-xl max-xl:mx-auto">
        <div className="img-box">
          <img
            src={import.meta.env.VITE_APP_BACKEND_IMAGES_URL + product?.images[0]?.image}
            alt="perfume bottle image"
            className="xl:w-[140px]"
          />
        </div>
        <div className="pro-data w-full max-w-sm ">
          <h5 className="font-semibold text-md leading-8  max-[550px]:text-center">
            {product?.title}
          </h5>
          <p className="font-normal text-md leading-8  my-1 min-[550px]:my-3 max-[550px]:text-center">
            Perfumes
          </p>
          <h6 className="font-medium text-md leading-8 text-indigo-600  max-[550px]:text-center">
            ${product?.price}
          </h6>
        </div>
      </div>
      {/* Quantity */}
      <div className="flex items-center flex-col min-[550px]:flex-row w-full max-xl:max-w-xl max-xl:mx-auto gap-2">
        <h6 className="font-manrope font-bold text-md leading-9  w-full max-w-[176px] text-center">
          $0{' '}
          <span className="text-sm text-gray-300 ml-3 lg:hidden whitespace-nowrap">
            (Delivery Charge)
          </span>
        </h6>
        <div className="flex items-center w-full mx-auto justify-center">
          <button
            onClick={
              !hiddenButton
                ? handleRemoveItemFromBasket
                : handleUnauthorizedClick
            }
            className="group rounded-l-full px-6 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-300 hover:bg-gray-50"
          >
            <svg
              className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 22 22"
              fill="none"
            >
              <path
                d="M16.5 11H5.5"
                stroke={`gray`}
                strokeWidth="1"
                strokeLinecap="round"
              />
              <path
                d="M16.5 11H5.5"
                strokeOpacity="0.2"
                strokeWidth="1"
                strokeLinecap="round"
              />
              <path
                d="M16.5 11H5.5"
                strokeOpacity="0.2"
                strokeWidth="1"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <input
            ref={quantityRef}
            type="text"
            className="border-y border-gray-200 outline-none font-semibold text-lg w-full max-w-[118px] min-w-[80px]  py-[12px] text-center bg-transparent"
            placeholder="1"
          />
          <button
            onClick={
              !hiddenButton ? handleAddToBasket : handleUnauthorizedClick
            }
            className="group rounded-r-full px-6 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-300 hover:bg-gray-50"
          >
            <svg
              className="stroke-gray-900 dark transition-all duration-500 group-hover:stroke-black"
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 22 22"
              fill="none"
            >
              <path
                d="M11 5.5V16.5M16.5 11H5.5"
                stroke={'gray'}
                strokeWidth="1"
                strokeLinecap="round"
              />
              <path
                d="M11 5.5V16.5M16.5 11H5.5"
                strokeOpacity="0.2"
                strokeWidth="1"
                strokeLinecap="round"
              />
              <path
                d="M11 5.5V16.5M16.5 11H5.5"
                strokeOpacity="0.2"
                strokeWidth="1"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
        <h6 className="text-indigo-600 font-manrope font-bold text-2xl leading-9 w-full max-w-[176px] text-center">
          ${product?.price} * {quantity}
        </h6>
      </div>
    </motion.div>
  )
}

export default ShoppingCartItem
