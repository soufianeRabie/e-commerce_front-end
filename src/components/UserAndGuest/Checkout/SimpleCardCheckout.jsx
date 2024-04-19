import { Link } from 'react-router-dom'
import { GlobalColorTailwand } from '../../../Library/Library.jsx'
import React from 'react'
import { displayProduct } from './Checkout.jsx'

export const SimpleCardCheckout = ({products , basket}) => {
  return (
    <>
      {basket.length > 0 ? (
        <div>
          <section className="py-24 relative">
            <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
              <h1 className="title font-manrope font-bold text-4xl leading-10 mb-8 text-center">
                Shopping Cart
              </h1>
              <div className="hidden lg:grid grid-cols-2 py-6">
                <div className="font-normal text-md leading-8 text-gray-500">
                  Product
                </div>
                <p className="font-normal text-md leading-8 text-gray-500 flex items-center justify-between">
                  <span className="w-full max-w-[200px] text-center">
                    Delivery Charge
                  </span>
                  <span className="w-full max-w-[260px] text-center">
                    Quantity
                  </span>
                  <span className="w-full max-w-[200px] text-center">
                    Total
                  </span>
                </p>
              </div>
              {displayProduct(basket, null, products)}
            </div>
          </section>
        </div>
      ) : (
        <div className={'flex w-full justify-center mt-10'}>
          <h1 className={'text-3xl text-red-500 mr-8'}>
            {' '}
            your basket is empty{' '}
          </h1>
          <Link to={'/'}>
            <span
              className={` rounded-md bg${GlobalColorTailwand} px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300 cursor-pointer `}
            >
              {' '}
              go to shop
            </span>
          </Link>
        </div>
      )}
    </>
  )
}
