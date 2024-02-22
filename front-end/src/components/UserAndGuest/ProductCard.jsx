// Import React
import React, { useRef } from 'react'
import StarRating from '../rating/StarRating.jsx'
import { useAuth } from '../../Context/GlobalState.jsx'
import './Product.css'
import { Link } from 'react-router-dom'
import { Library } from '../../Library/Library.jsx'

// Your Component
function ProductCard({
  id,
  title,
  image,
  oldPrice,
  isSold,
  price,
  rating,
  description,
  hiddenButton = false,
}) {
  const { dispatch, user } = useAuth()
  const quantityRef = useRef(null)

  const handleAddToBasket = async (e) => {
    e.preventDefault()
    const quantity = quantityRef.current.value
    try {
      await Library.addToBasket(user, id, dispatch, quantity ?? 1)
      Library.showToast('product added successfully')
    } catch ({ response }) {
      Library.showToast(response.data.error, 'error', 'top-right', 2000)
    }
    document.getElementById(`quantity ${id}`).value = ''
  }
  return (
    <div className="product relative m-2 sm:m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md ">
      <Link to={`/product/${id}`} className={'Link'}>
        <div className={'w-full h-52 product-img'}>
          <img className="w-full h-full" src={image} />
        </div>

        {isSold && (
          <span className="absolute top-0 left-0 m-2 rounded-full bg-amber-600 px-2 text-center text-sm font-medium text-white">
            {Math.floor(((oldPrice - price) / oldPrice) * 100)}% OFF
          </span>
        )}
        <div className="mt-4 px-5 pb-5">
          <div className={'flex justify-between'}>
            <h5 className="text-xl tracking-tight text-slate-900">{title}</h5>
            <span className="mr-1 ml-1 rounded bg-yellow-200 px-2 py-1 text-xs font-semibold">
              {Math.floor(rating)}
            </span>
          </div>
          <div className="mt-2 mb-5 flex items-center justify-between">
            <p>
              {isSold && (
                <>
                  <span className="text-2xl font-bold text-orange-600 ">
                    <small>$</small>
                    <strong>{price}</strong>
                  </span>
                  <span className="text-sm text-slate-900 line-through">
                    <small>$</small>
                    {oldPrice}
                  </span>
                </>
              )}
              {!isSold && (
                <span className="text-xl font-semibold text-slate-900">
                  <small>$</small>
                  <strong>{price}</strong>
                </span>
              )}
            </p>
            <div className="flex items-end justify-end">
              <StarRating rating={rating} />
            </div>
          </div>
        </div>
      </Link>

      {!hiddenButton && (
        <div className={'flex justify-center items-center mb-2 '}>
          <input
            type="text"
            name="quantity"
            id={`quantity ${id}`}
            placeholder={'...'}
            className={'w-10 rounded-xl mx-1'}
            ref={quantityRef}
          />
          <div
            onClick={handleAddToBasket}
            className={'w-fit flex items-center justify-center'}
          >
            <button
              type={'submit'}
              className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300 cursor-pointer addToCart-btn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 h-6 w-6 "
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className={'cursor-pointer'}> Add to cart</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductCard
