import { useState } from 'react'
import { ApiServices } from '../../services/axiosServices.js'

export const useUpdateStatus = () => {
  const [success, setIsSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()
  const [errors, setErrors] = useState()
  const [isError, setIsError] = useState(false)
  const updateStatus = async (newStatus, id, type) => {
    setIsLoading(true)
    try {
      const response =
        type === 'delivery'
          ? await ApiServices.updateDeliveryStatus(newStatus, id)
          : await ApiServices.updateOrderStatus(newStatus, id)
      if (response.status === 200) {
        setIsSuccess(true)
      } else {
        throw new Error(response.data?.error?.message)
      }
    } catch ({ response }) {
      if (response?.status === 422) {
        const isErrors = response?.error?.message || "something went wrong"
        setIsError(isErrors)
      }
      if (response.status === 403) {
        setError("dont try to hacked us that's impossible ")
      } else {
        setError('something went wrong please try after a while')
      }

      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }

  return { updateStatus, isError, isLoading, error, success, errors }
}
