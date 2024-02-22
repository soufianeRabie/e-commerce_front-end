import { createBrowserRouter } from 'react-router-dom'
import UserLayout from '../Layouts/UserLayout.jsx'
import Home from '../components/UserAndGuest/Home.jsx'
import Orders from '../components/User/Orders.jsx'
import Checkout from '../components/UserAndGuest/Checkout.jsx'
import ProductCardDetails from '../components/UserAndGuest/ProductCardDetails.jsx'
import Auth from '../components/Login/Auth.jsx'
import ProtectedRoute from '../components/ProtectedRoutes/ProtectedRoute.jsx'
import AdminLayout from '../Layouts/AdminLayout.jsx'
import HomeAdmin from '../components/Admin/Home.jsx'
import AddProduct from '../components/Admin/Product/AddProduct.jsx'
import EditProduct from '../components/Admin/Product/EditProduct.jsx'
import App from '../App.jsx'

const router = createBrowserRouter([
  {
    element: <UserLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/user',
        element: <Home />,
      },
      {
        path: '/orders',
        element: (
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        ),
      },
      {
        path: '/checkout',
        element: <Checkout />,
      },
      {
        path: '/payment',
        element: <App />,
      },
      {
        path: '/product/:id',
        element: <ProductCardDetails />,
      },
      {
        path: '/login',
        element: <Auth />,
      },
    ],
  },
  {
    element: <AdminLayout />,
    children: [
      {
        path: '/admin',
        element: (
          <ProtectedRoute>
            <HomeAdmin />
          </ProtectedRoute>
        ),
      },
      {
        path: '/addProduct',
        element: (
          <ProtectedRoute>
            <AddProduct />
          </ProtectedRoute>
        ),
      },
      {
        path: '/admin/edit-product/:id',
        element: (
          <ProtectedRoute>
            <EditProduct />
          </ProtectedRoute>
        ),
      },
    ],
  },
])
export default router
