import React, { useEffect, useState } from 'react'
import { useAuth } from '../../Context/GlobalState.jsx'
import {
  displayProduct,
  NumberOfDiscount,
  PriceAfterDiscount,
} from '../UserAndGuest/Checkout.jsx'
import { Link, useNavigate } from 'react-router-dom'
import CurrencyFormat from 'react-currency-format'
import { TotalPrice } from '../../Context/AppReducer.js'
import axiosConfig from '../../services/axios.js'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { ApiServices } from '../../services/axiosServices.js'
import { ToastContainer } from 'react-toastify'
import Loading from '../Loadings/Loading.jsx'

function Payment() {
  const { basket, user, dispatch, products } = useAuth()
  const stripe = useStripe()
  const totalPrice = TotalPrice(basket, products)
  const Discount = NumberOfDiscount(basket)
  const [secretKey, setSecretKey] = useState()

  const element = useElements()
  const [error, setErorr] = useState(null)
  const [processing, setProcessing] = useState(false)
  const [succeded, setSucceded] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    setIsLoading(true)
    const token = localStorage.getItem('token')
    const getClientSecret = async () => {
      try {
        const response = await axiosConfig.post(
          `/create-payment-intent`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        setSecretKey(response.data.clientSecret)
        return response
      } catch (error) {
        navigate('/', { replace: true })
      }
    }
    getClientSecret().then(() => setIsLoading(false))
  }, [totalPrice])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setProcessing(true)
    await stripe
      .confirmCardPayment(secretKey, {
        payment_method: {
          card: element.getElement(CardElement),
        },
      })
      .then((PaymentIntent) => {
        setSucceded(true)
        setProcessing(false)
        setErorr(null)
        ApiServices.RemoveCartAfterPayment().then(() => {
          dispatch({
            type: 'REMOVE_ALL_BASKET',
          })
          navigate('/orders', { replace: true })
        })
      })
  }
  const handleOnChange = (e) => {
    setDisabled(e.empty)
    setProcessing(false)
    setErorr(error ? error.message : '')
  }
  if (isLoading) {
    return <Loading />
  }

  return (
    <div>
      <div className={' mt-20 absolute w-full'}>
        <ToastContainer />
        <div className={'text-center w'}>
          <h1 className={'text-xs text-wrap  sm:text-3xl'}>
            hello <span className={'text-amber-500'}>{user?.email}</span>
            <span> {user && <p> are you ready to payment</p>}</span>
          </h1>
        </div>
        <div className={' w-full'}>
          {basket.length > 0 ? (
            <>
              <div> {displayProduct(basket, null, products)}</div>
              <div
                className={
                  'flex border border-gray-600 shadow-md m-3 flex-wrap sm:flex-nowrap px-20'
                }
              >
                <div className={'w-2/4 border-r-2 border-gray-600'}>
                  <p>Payment method</p>
                </div>
                <div className={'w-full m-4'}>
                  <div className={'flex gap-2 my-2'}>
                    <h2>Order Total: </h2>
                    <span className={'font-bold'}></span>
                    <p className={'font-bold '}>
                      <CurrencyFormat
                        value={PriceAfterDiscount(totalPrice, Discount)}
                        displayType={'text'}
                        thousandSeparator={true}
                        decimalScale={2}
                        prefix={'$'}
                      />
                    </p>
                  </div>

                  <form onSubmit={handleSubmit}>
                    <CardElement
                      onChange={handleOnChange}
                      className={
                        'my-4 flex  p-5 flex-col justify-center border border-gray-600 h-12 rounded-xl   '
                      }
                    />

                    <button
                      className={
                        'bg-amber-500 cursor-pointer text-white rounded-md w-full py-2 my-2'
                      }
                      type={'submit'}
                      disabled={error || processing || succeded || disabled}
                    >
                      {processing ? 'processing...' : 'Buy now'}
                    </button>
                  </form>
                  {error && <div> {error}</div>}
                </div>
              </div>
            </>
          ) : (
            <div className={'flex w-full justify-center items-center mt-10'}>
              <h1 className={'text-3xl text-red-500 mr-8'}>
                {' '}
                oops you dont have any product to pay for it{' '}
              </h1>
              <Link to={'/'}>
                <span
                  className={
                    ' rounded-md bg-amber-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300 cursor-pointer '
                  }
                >
                  {' '}
                  go to shop
                </span>
              </Link>
            </div>
          )}
          <div></div>
        </div>
      </div>
    </div>
  )
}

export default Payment
