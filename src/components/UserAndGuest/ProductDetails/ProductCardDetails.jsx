import React, { useEffect, useRef, useState } from 'react'
// import StarRating from '../rating/StarRating.jsx'
import { useAuth } from '../../../Context/GlobalState.jsx'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ToastContainer } from 'react-toastify'
import { useParams } from 'react-router-dom'
import { AddToCartButton } from '../Home/AddToCartButton.jsx'
import { GlobalColorTailwand, Library } from '../../../Library/Library.jsx'

const ProductCardDetails = () => {
  const params = useParams()
  const [product, setProduct] = useState()
  const { products } = useAuth()

  const [images, setImages] = useState([])

  // useEffect(() => {
  //   product = products.find((product) => product?.id === parseInt(params.id))
  //   console.log(product)
  //   setImages(product.images)
  // }, [params.id])
  //
  // console.log(images)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    const getPro = async () => {
      await products
      const pr = products.find((product) => product?.id === parseInt(params.id))
      console.log(params.id)
      console.log(pr)
      const im = pr?.images || []
      setImages(im)
      setActiveImage(backendUrl + im[0]?.image)
      setProduct(pr)
    }

    getPro()
  }, [products, params.id])

  const { dispatch, user, basket } = useAuth()
  const quantityRef = useRef(null)
  const isProductReserve = basket.find(
    (basketProduct) => basketProduct?.itemId === product?.id,
  )
  const ProductReservedQuantity = isProductReserve?.quantity || 0
  const [ref, inView] = useInView({
    triggerOnce: true, // Ensure the animation only triggers once
    threshold: 0.5,
  })

  const handleAddToBasket = async (e) => {
    console.log(amount)
    e.preventDefault()

    const quantity = parseInt(amount) || 1

    if (quantity <= 0) {
      return Library.showToast(
        'Quantity must be greater than zero ',
        'error',
        'top-right',
        2000,
      )
    }

    if (quantity > product.quantity - ProductReservedQuantity) {
      return Library.showToast(
        'Quantity must be less than product quantity ',
        'error',
        'top-right',
        2000,
      )
    }

    try {
      await Library.addToBasket(user, product.id, dispatch, quantity)
      Library.showToast('Product added successfully')
    } catch ({ response }) {
      Library.showToast(response.data.error, 'error', 'top-right', 2000)
    }
  }

  const backendUrl = import.meta.env.VITE_APP_BACKEND_IMAGES_URL

  const [activeImg, setActiveImage] = useState(backendUrl + images[0]?.image)

  const [amount, setAmount] = useState(1)

  return (
    <>
      {product ? (
        <motion.div
          className="flex  mx-10 mt-28 flex-col justify-between lg:flex-row gap-16 lg:items-center"
          ref={ref}
          initial={{ opacity: 0, scale: 0 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <ToastContainer />
          <div className="flex flex-col gap-6 lg:w-2/4">
            <img
              src={activeImg}
              alt=""
              className="w-full min-h-96 h-full   rounded-xl"
            />
            <div className="flex flex-row justify-evenly h-24">
              {images.map((image, key) => (
                <img
                  key={key}
                  src={backendUrl + image.image}
                  alt=""
                  className="w-24 h-24 rounded-md cursor-pointer hover:opacity-75 transition-opacity duration-300"
                  onClick={() => setActiveImage(backendUrl + image.image)}
                />
              ))}
            </div>
          </div>
          {/* ABOUT */}
          <div className="flex flex-col gap-4 lg:w-2/4">
            <div>
              <span className=" text-violet-600 font-semibold">
                Special Sneaker
              </span>
              <h1 className="text-3xl font-bold"> {product?.title}</h1>
            </div>
            <p className="text-gray-700">{product?.description}</p>
            <h6 className="text-2xl font-semibold">${product?.price}</h6>
            <div className="flex flex-row items-center gap-12">
              <div className="flex flex-row items-center">
                <button
                  className="bg-gray-200 py-2 px-5 rounded-lg text-violet-800 text-3xl"
                  onClick={() => setAmount((prev) => prev - 1)}
                >
                  -
                </button>
                <span className="py-4 px-6 rounded-lg">{amount}</span>
                <button
                  className="bg-gray-200 py-2 px-4 rounded-lg text-violet-800 text-3xl"
                  onClick={() => setAmount((prev) => prev + 1)}
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAddToBasket}
                className="bg-violet-800 text-white font-semibold py-3 px-16 rounded-xl h-full"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </motion.div>
      ) : (
        <div>
          <h1 className={'text-3xl uppercase w-3/4 mx-auto'}>
            No Product Found With id {params?.id} maybe it's deleted or you are
            put a random number in ursl
          </h1>
        </div>
      )}
    </>
  )
}

export default ProductCardDetails

//
// function ProductCardDetails() {
//   const { products } = useAuth()
//   const params = useParams()
//   const product = products.find(
//     (product) => product?.id === parseInt(params.id),
//   )
//   const { dispatch, user, basket } = useAuth()
//   const quantityRef = useRef(null)
//   const isProductReserve = basket.find(
//     (basketProduct) => basketProduct?.itemId === product?.id,
//   )
//   const ProductReservedQuantity = isProductReserve?.quantity || 0
//   const [ref, inView] = useInView({
//     triggerOnce: true, // Ensure the animation only triggers once
//     threshold: 0.5,
//   })
//
//   const handleAddToBasket = async (e) => {
//     console.log('hello')
//     e.preventDefault()
//     const quantity = parseInt(quantityRef?.current?.value) || 1
//
//     if (quantity > product.quantity - ProductReservedQuantity) {
//       return Library.showToast(
//         'Quantity must be less than product quantity ',
//         'error',
//         'top-right',
//         2000,
//       )
//     }
//
//     try {
//       await Library.addToBasket(user, product.id, dispatch, quantity)
//       Library.showToast('Product added successfully')
//     } catch ({ response }) {
//       Library.showToast(response.data.error, 'error', 'top-right', 2000)
//     }
//   }
//
//   return (
//     <div className="w-full flex justify-center absolute mt-32">
//       <ToastContainer />
//       <motion.div
//         className="relative product m-2 sm:m-10 p-4 flex w-full max-w-lg flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md hover:text-white hover:bg-gray-900"
//         ref={ref}
//         initial={{ opacity: 0, scale: 0 }}
//         animate={inView ? { opacity: 1, scale: 1 } : {}}
//         transition={{ duration: 0.5 }}
//       >
//         <div>{product?.description}</div>
//         <div className="w-full">
//           <div className="flex gap-3">
//             <StarRating rating={product?.rating} />
//             <span className={`mr-1 ml-1 rounded bg${GlobalColorTailwand} px-2 hover:text-red-600 py-1 text-xs font-semibold`}>
//               {Math.floor(product?.rating)}
//             </span>
//           </div>
//           <div className="flex w-3/4 m-5 mx-auto h-56 justify-center imgProductDetails">
//             <img
//               className="rounded-md w-full"
//               src={product?.image}
//               alt="product image"
//             />
//           </div>
//           <div
//             className="w-full flex items-center justify-center"
//             onClick={handleAddToBasket}
//           >
//             <AddToCartButton
//               itemQuantity={product?.quantity}
//               id={product?.id}
//             />
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   )
// }
//
// export default ProductCardDetails
//
//
// //-------------------------------------------------------------------------//
//
//
//
// import React, { useState } from 'react'
//
// const ProductPage = () => {
//
