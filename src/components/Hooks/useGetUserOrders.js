import { ApiServices } from '../../services/axiosServices.js'
import { useAuth } from '../../Context/GlobalState.jsx'
import { useState } from 'react'
export const useGetUserOrders = () => {
  const { dispatch } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const getUserOrders = async () => {
    setIsLoading(true)
    try {
      const response = await ApiServices.GetUserOrders()
      if (response.status === 200) {
        setSuccess(true)
        dispatch({
          type: 'SET_ORDERS',
          orders: response.data.userOrders,
        })
      } else {
        throw new Error(response?.error?.message)
      }
    } catch (error) {
      setIsError(true)
      setError(error?.message)
    } finally {
      setIsLoading(false)
    }
  }

  return { getUserOrders, isError, isLoading, success, error }
}

// .catch((err) => {
//   console.error(err)
//   Library.showToast('we cannot get your orders please try again')
//   navigate('/')
// })
