import { useAuth } from '../../Context/GlobalState.jsx'
import { useEffect, useState } from 'react'
import { Index } from '../Reports/index.jsx'

const Online = ({collectInvoiceContent}) => {
  const [onlineOrders, setOnlineOrders] = useState([])

  const { online_orders } = useAuth()

  useEffect(() => {
    if (online_orders) {
      setOnlineOrders(online_orders)
    }
  }, [onlineOrders])

  const DisplayOnlineInvoices = () => {
    return onlineOrders?.map((order, index) => (
      <Index
        key={index}
        user={order?.user[0]}
        orders={order?.orders}
        product={order?.orders?.product}
        order={order}
        collectInvoiceContent={collectInvoiceContent}
        index={index}
      />
    ))
  }

  return (
    <>
      <div>
        <h1 className={'text-2xl text-center uppercase text-green-600 my-10'}>
          {' '}
          online orders invoices
        </h1>
        {DisplayOnlineInvoices()}
      </div>
    </>
  )
}

export default Online
