import { useState } from 'react'
import { Library } from '../../Library/Library.jsx'
import { ApiServices } from '../../services/axiosServices.js'
import { useAuth } from '../../Context/GlobalState.jsx'

export const useGetOrders = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()
  const [isError, setIsError] = useState(false)
  const [success, setSuccess] = useState(false)
  const { dispatch } = useAuth()

  const getOrders = async () => {
    setIsLoading(true)
    try {
      const response = await ApiServices.GetAllOrders()
      if (response.status === 200) {
        Library.setOrders(dispatch, response.data)
        setSuccess(true)
      } else {
        throw new Error(response.data?.error?.message)
      }
    } catch (error) {
      setIsError(true)
      setError('something went wrong when getting orders please try again')
    } finally {
      setIsLoading(false)
    }
  }
  return { isError, isLoading, success, error, getOrders }
}
