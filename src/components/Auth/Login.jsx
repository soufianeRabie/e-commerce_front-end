import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { ApiServices } from '../../services/axiosServices.js'
import { useAuth } from '../../Context/GlobalState.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { BiLoader } from 'react-icons/bi'
import { GlobalColorTailwand, Library } from '../../Library/Library.jsx'
import Loading from '../Loadings/Loading.jsx'
import { toast } from 'sonner'
import { InfoIcon } from 'lucide-react'
import {useGetUserOrders} from "../Hooks/useGetUserOrders.js";

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const [loginIsLoading, setLoginIsLoading] = useState(false)
  const [registerIsLoading, setRegisterIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [message, setMessage] = useState('')
  const { dispatch, logout, basket } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [AddGuesBasketToUserLoading, setAddGuesBasketToUserLoading] =
    useState(false)
  const [GetUserInfoLoading, setGetUserInfoLoading] = useState(false)
  const location = useLocation()
    const {
        getUserOrders,
    } = useGetUserOrders()

  useEffect(() => {
    if (location.state && location.state.mustLogin) {
      toast.info('login required', {
        description: 'you must to login first',
        icon: <InfoIcon />,
      })
    }
  }, [location.state])

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        navigate('/')
      } catch (error) {
        dispatch({
          type: 'EMPTY_BASKET',
          user: null,
        })
        navigate('/')
      } finally {
        setIsLoading(false)
      }
    } else {
      setIsLoading(false)
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoginIsLoading(true)
    try {
      const response = await ApiServices.login({ email, password })
      if (response.status === 401) {
        setIsError(true)
        setMessage(response.error)
      } else {
        try {
          const GetUserToast = toast.loading('Getting user information', {
            description: 'Getting user information in progress...',
          })
          setGetUserInfoLoading(true)

          await ApiServices.getUser().then(async (responseUser) => {
            toast.dismiss(GetUserToast)
            if (responseUser.data.role === 0) {
              if (basket.length > 0) {
                const AddGuestCartToast = toast.loading('add products', {
                  description:
                    'adding your products to your basket in progress...',
                })
                setAddGuesBasketToUserLoading(true)
                await ApiServices.addGeustCartToUser()
                toast.dismiss(AddGuestCartToast)
              }

              const GetProductsToast = toast.loading('Getting your products', {
                description: 'getting your products in progress...',
              })

              await ApiServices.UserCart().then(({ data }) => {
                const cartItems = data.cart.map((item) => ({
                  itemId: item.product_id,
                  quantity: item.quantity,
                }))
                dispatch({
                  type: 'SET_BASKET',
                  payload: cartItems,
                })
                Library.setUser(dispatch, responseUser)
              })
              toast.dismiss(GetProductsToast)
              return navigate('/', { state: { welcomeMessage: true } })
            } else if (
              responseUser.data.role ===
              parseInt(import.meta.env.VITE_APP_ADMIN_ROLE_NUMBER)
            ) {
              Library.setUser(dispatch, responseUser)
              return navigate('/admin', { state: { welcomeMessage: true } })
            } else {
              logout(navigate, dispatch)
            }
          })
            await getUserOrders()

        } catch (error) {
          setIsError(true)
          setMessage(error)
        }
      }
    } catch (error) {
      setIsError(true)
      setMessage(error.response.data.error)
    } finally {
      setLoginIsLoading(false)
      setAddGuesBasketToUserLoading(false)
      setGetUserInfoLoading(false)
    }
  }
  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      {!AddGuesBasketToUserLoading && !GetUserInfoLoading && (
        <div className={'h-screen flex justify-center items-center'}>
          <div></div>
          <div
            className={
              'w-80 sm:w-96 h-fit  border border-gray-200 rounded shadow-black'
            }
          >
            <div className={'mx-3 p-4'}>
              <h1 className={'text-xl font-bold'}>Sign in</h1>
            </div>
            <form>
              <div className={'px-5 mb-4'}>
                <label className={'block mb-2 font-bold'}>Email</label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  className={
                    ' h-10  px-3 rounded-xl w-full p-1 border border-gray-900'
                  }
                  type="email"
                  name={'email'}
                />
                {isError && (
                  <span className={'text-red-600 font-semibold text-sm'}>
                    {message}
                  </span>
                )}
              </div>

              <div className={'px-5 mb-4'}>
                <label className={'block mb-2 font-bold'}>Password</label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  className={
                    ' h-10 px-3 rounded-xl w-full border border-gray-900'
                  }
                  type="password"
                  name={'password'}
                />
              </div>
              <div className={'px-5 mb-4'}>
                <button
                  disabled={loginIsLoading}
                  type={'submit'}
                  onClick={handleLogin}
                  className={`bg${GlobalColorTailwand} font-bold rounded-md w-full p-1`}
                >
                  {loginIsLoading ? (
                    <span className={'font-mono text-sm'}>loading...</span>
                  ) : (
                    <span>Sign in</span>
                  )}
                </button>
              </div>
            </form>
            <div className={'w-full flex justify-center gap-2'}>
              <p>dont have an account?</p>
              <Link className={'text-slate-300 underline'} to={'/register'}>
                register
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Login
