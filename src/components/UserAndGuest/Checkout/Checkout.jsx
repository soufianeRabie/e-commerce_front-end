import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../Context/GlobalState.jsx'
import { Link } from 'react-router-dom'
import { TotalPrice } from '../../../Context/AppReducer.js'
import CurrencyFormat from 'react-currency-format'
import { ToastContainer } from 'react-toastify'
import CheckoutCard from './CheckoutCard.jsx'
import TestCard from './TestCard.jsx'
import { GlobalColorTailwand } from '../../../Library/Library.jsx'
import { ToTalPriceCard } from './ToTalPriceCard.jsx'
import SimilarProducts from '../ProductDetails/SimilarProducts.jsx'
import { SimpleCardCheckout } from './SimpleCardCheckout.jsx'

// eslint-disable-next-line react-refresh/only-export-components
export const displayProduct = (
  basket,
  hiddenButton = null,
  products,
  orderPage = false,
) => {
  return basket.map(({ itemId, quantity }, key) => {
    console.log(itemId)
    const product = products?.find((product) => parseInt(product.id) === itemId)
    if (!product) {
      console.log('no pr', product)
      return null
    } else {
      return orderPage ? (
        <CheckoutCard item={{ product, quantity }} />
      ) : (
        <TestCard
          item={{ product, quantity }}
          key={key}
          hiddenButton={hiddenButton}
        />
      )
    }
  })
}

export const NumberOfDiscount = (basket) => {
  const discountForEveryProduct = 0.5
  const NumberOfProducts = basket.length
  return discountForEveryProduct * NumberOfProducts
}

export const PriceAfterDiscount = (totalPrice, NumberOfDiscount) => {
  if (NumberOfDiscount > 0 && NumberOfDiscount < 7) {
    return totalPrice - totalPrice * (NumberOfDiscount / 100)
  } else if (NumberOfDiscount > 7) {
    return totalPrice - totalPrice * (7 / 100)
  } else {
    return totalPrice
  }
}

function Checkout() {
  const { basket, user , products } = useAuth()
  const Discount = NumberOfDiscount(basket)
  const [tPrice, setTPrice] = useState()


  useEffect(() => {
    console.log(products)
    console.log(products)
    setTPrice(TotalPrice(basket, products))
  }, [basket, products])
  return (
    <div className={' mt-32 dark:text-white  w-full'}>
      <ToastContainer />
      <div className={'text-center w'}>
        <h1 className={'text-xs text-wrap  sm:text-3xl'}>
          hello{' '}
          <span className={`text${GlobalColorTailwand}`}>{user?.email}</span>
          <span> this your shop card</span>
        </h1>
      </div>
      <div
        className={'flex flex-wrap justify-center xl:justify-between w-full'}
      >
        <SimpleCardCheckout products={products} basket={basket} />
        <ToTalPriceCard
          user={user}
          tPrice={tPrice}
          basket={basket}
          Discount={Discount}
        />
      </div>
    </div>
  )
}

export default Checkout
