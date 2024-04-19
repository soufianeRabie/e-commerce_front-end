import { DeleveryForm } from './DeleveryForm.jsx'
import { useAuth } from '../../Context/GlobalState.jsx'
import { SimpleCardCheckout } from '../UserAndGuest/Checkout/SimpleCardCheckout.jsx'

export const Delevery = () => {
  const { basket, user, products } = useAuth()
  return (
    <div className={'block lg:flex w-full  '}>
      <SimpleCardCheckout products={products} basket={basket} />
        {basket?.length  > 0 &&   <DeleveryForm />}
    </div>
  )
}
