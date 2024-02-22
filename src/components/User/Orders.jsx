import React, { useEffect, useState } from 'react'
import { ApiServices } from '../../services/axiosServices.js'
import { Library } from '../../Library/Library.jsx'
import { displayProduct } from '../UserAndGuest/Checkout.jsx'
import Loading from '../Loadings/Loading.jsx'
import { useAuth } from '../../Context/GlobalState.jsx'
import { useNavigate } from 'react-router-dom'

function Orders() {
  const [userOrders, setUserOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  const { products } = useAuth()
  useEffect(() => {
    const getUserOrders = async () => {
      await ApiServices.GetUserOrders()
        .then(({ data }) => {
          setUserOrders(
            data?.userOrders.map((item) => ({
              itemId: item.product_id,
              quantity: item.quantity,
            })),
          )
        })
        .catch((err) => {
          console.error(err)
          Library.showToast('we cannot get your orders please try again')
          navigate('/')
        })
    }
    getUserOrders().then(() => setIsLoading(false))
  }, [])

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className={' mt-20 absolute w-full '}>
      {userOrders.length > 0 ? (
        displayProduct(userOrders, true, products)
      ) : (
        <div> you dont have any orders yet </div>
      )}
    </div>
  )
}

export default Orders
