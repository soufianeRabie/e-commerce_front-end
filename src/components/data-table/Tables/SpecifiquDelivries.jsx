import { useParams } from 'react-router-dom'
import OrderList from './OrderList.jsx'
import { useAuth } from '../../../Context/GlobalState.jsx'

export const SpecifiquDelivries = () => {
  const params = useParams()
  const { orders } = useAuth()
  const { id } = params
  return (
    <> {orders?.length > 0 ? <OrderList SpecifiqueOders={parseInt(id)} /> : <div>
        <h1 className={"text-3xl text-center"}> No Item For this delivery</h1>
    </div>}</>
  )
}
