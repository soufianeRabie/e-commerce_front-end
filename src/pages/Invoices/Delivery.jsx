import { useAuth } from '../../Context/GlobalState.jsx'
import { useEffect, useState } from 'react'
import { Index } from '../Reports/index.jsx'

const Delivery = ({collectInvoiceContent}) => {
  const [deliveryOrders, setDeliveryOrders] = useState([])

  const { deliveries } = useAuth()

  useEffect(() => {
    if (deliveryOrders) {
      setDeliveryOrders(deliveries)
    }
  }, [deliveries])

  const DisplayDeliveryInvoice = () => {
    return deliveryOrders?.map((delivery, index , key) => (
      <Index key={index} delivery={delivery} orders={delivery?.orders} collectInvoiceContent={collectInvoiceContent} index={index} />
    ))
  }

  return (
    <>
      <h1
        className={'text-2xl text-center uppercase text-green-600 my-4 my-10'}
      >
        {' '}
        delivery orders invoices
      </h1>
      <div>{DisplayDeliveryInvoice()}</div>
    </>
  )
}
export default Delivery
