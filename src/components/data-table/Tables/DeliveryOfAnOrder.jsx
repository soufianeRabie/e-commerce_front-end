import { useParams } from 'react-router-dom'
import OrderList from './OrderList.jsx'
import { useAuth } from '../../../Context/GlobalState.jsx'
import DeliveryList from "./DeliveryList.jsx";

export const DeliveryOfAnOrder = () => {
  const params = useParams()
  const { deliveries } = useAuth()
  const { id } = params
  return (
    <>
      {' '}
      {deliveries?.length > 0 ? (
        <DeliveryList DeliveryId={parseInt(id)} />
      ) : (
        <div>
          <h1 className={'text-3xl text-center'}> No Item For this delivery</h1>
        </div>
      )}
    </>
  )
}
