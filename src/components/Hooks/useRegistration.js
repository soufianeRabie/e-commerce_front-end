import { useState } from 'react'
import { ApiServices } from '../../services/axiosServices.js'

export const useRegistration = () => {
  const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()
  const [errors, setErrors] = useState()
  const [isError, setIsError] = useState(false)
  const register = async (data) => {
    setIsLoading(true)
    try {
      const response = await ApiServices.register(data)
      if (response.status === 200) {
        setIsRegistrationSuccess(true)
      } else {
        throw new Error(response.data?.error?.message)
      }
    } catch ({ response }) {
      setIsError(true)

      if (response?.status === 422) {
        const isErrors = response?.data?.errors
        if (isErrors) {
          setErrors(isErrors)
        } else {
          setError('registration failed please try again')
        }
      } else {
        setError('error occurred register try again after a while')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return { register, isError, isLoading, error, isRegistrationSuccess , errors }
}
