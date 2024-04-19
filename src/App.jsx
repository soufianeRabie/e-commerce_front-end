import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import Payment from './components/User/Payment.jsx'
import ProtectedRoute from './components/ProtectedRoutes/ProtectedRoute.jsx'

function App() {
  const StripePomise = loadStripe(import.meta.env.VITE_APP_PUBLISHED_KEY)
  return (
    <Elements stripe={StripePomise}>
      <ProtectedRoute>
        <Payment />
      </ProtectedRoute>
    </Elements>

  )
}

export default App
