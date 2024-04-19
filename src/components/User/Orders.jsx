import React, { useEffect, useState } from 'react'
import { ApiServices } from '../../services/axiosServices.js'
import { Library } from '../../Library/Library.jsx'
import { displayProduct } from '../UserAndGuest/Checkout/Checkout.jsx'
import Loading from '../Loadings/Loading.jsx'
import { useAuth } from '../../Context/GlobalState.jsx'
import { useNavigate } from 'react-router-dom'

function Orders() {
  const [userOrders, setUserOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  const { products, orders } = useAuth()

  useEffect(() => {
    const getUserOrders = async () => {
      await ApiServices.GetUserOrders()
        .then(({ data }) => {
          const orders = data?.userOrders.map((item) => ({
            itemId: item.product_id,
            quantity: item.quantity,
            status: item.status,
          }))
          console.log(orders)
          setUserOrders(orders.filter((order) => order.status === 'completed'))
        })
        .catch((err) => {
          console.error(err)
          Library.showToast('we cannot get your orders please try again')
          navigate('/')
        })
    }
    getUserOrders().then(() => setIsLoading(false))
  }, [])

  console.log(userOrders)

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className={' mt-20  w-full '}>
      {userOrders.length > 0 ? (
        displayProduct(userOrders, true, products, true)
      ) : (
        <div> you dont have any orders yet </div>
      )}
    </div>
  )
}

export default Orders
