import { createBrowserRouter } from 'react-router-dom'
import UserLayout from '../Layouts/UserLayout.jsx'
import Home from '../components/UserAndGuest/Home/Home.jsx'
import Orders from '../components/User/Orders.jsx'
import Checkout from '../components/UserAndGuest/Checkout/Checkout.jsx'
import ProductCardDetails from '../components/UserAndGuest/ProductDetails/ProductCardDetails.jsx'
import Login from '../components/Auth/Login.jsx'
import ProtectedRoute from '../components/ProtectedRoutes/ProtectedRoute.jsx'
import AdminLayout from '../Layouts/AdminLayout.jsx'
import HomeAdmin from '../components/Admin/Home.jsx'
import AddProduct from '../components/Admin/Product/AddProduct/AddProduct.jsx'
import EditProduct from '../components/Admin/Product/EditProduct.jsx'
import App from '../App.jsx'
import { ProductDetails } from '../components/UserAndGuest/ProductDetails/ProductDetails.jsx'
import ProductList from '../components/data-table/Tables/ProductList.jsx'
import { DeleveryForm } from '../components/Delivry/DeleveryForm.jsx'
import { Delevery } from '../components/Delivry/Delevery.jsx'
import { Register } from '../components/Auth/Register.jsx'
import OrderList from '../components/data-table/Tables/OrderList.jsx'
import DeliveryList from '../components/data-table/Tables/DeliveryList.jsx'
import { SpecifiquDelivries } from '../components/data-table/Tables/SpecifiquDelivries.jsx'
import { DeliveryOfAnOrder } from '../components/data-table/Tables/DeliveryOfAnOrder.jsx'
import ComplaintsList from '../components/data-table/Tables/ComplaintsList.jsx'

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
        path: '/delivery',
        element: <Delevery />,
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
        element: <ProductDetails />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/orders/complete',
        element: (
          <ProtectedRoute>
            <OrderList />
          </ProtectedRoute>
        ),
      },
    ],
  },
  // {
  //   element: <AdminLayout />,
  //   children: [
  //     {
  //       path: '/admin',
  //       element: (
  //         <ProtectedRoute>
  //           <HomeAdmin />
  //         </ProtectedRoute>
  //       ),
  //     },
  //     {
  //       path: '/admin/edit-product/:id',
  //       element: (
  //         <ProtectedRoute>
  //           <EditProduct />
  //         </ProtectedRoute>
  //       ),
  //     },
  //     {
  //       path: '/admin/products',
  //       element: (
  //         <ProtectedRoute>
  //           <ProductList />
  //         </ProtectedRoute>
  //       ),
  //     },
  //     {
  //       path: '/admin/orders',
  //       element: (
  //         <ProtectedRoute>
  //           <TrainerList />
  //         </ProtectedRoute>
  //       ),
  //     },
  //     {
  //       path: '/admin/deliveries',
  //       element: (
  //         <ProtectedRoute>
  //           <RoomsList />
  //         </ProtectedRoute>
  //       ),
  //     },
  //     {
  //       path: '/admin/deliveries/:id',
  //       element: (
  //         <ProtectedRoute>
  //           <SpecifiquDelivries />
  //         </ProtectedRoute>
  //       ),
  //     },
  //     {
  //       path: '/admin/delivery/:id',
  //       element: (
  //         <ProtectedRoute>
  //           <TrainerList />
  //         </ProtectedRoute>
  //       ),
  //     },
  //     {
  //       path: '/admin/complaints',
  //       element: (
  //         <ProtectedRoute>
  //           <GroupList />
  //         </ProtectedRoute>
  //       ),
  //     },
  //   ],
  // },
  {
    path: '/admin',
    lazy: async () => {
      const AppShell = await import('../components/app-shell.jsx')
      return { Component: AppShell.default }
    },
    children: [
      {
        index: true,
        lazy: async () => ({
          Component: (await import('../pages/Dahsboard/index.jsx')).default,
        }),
      },
      {
        path: 'dashboard/products',
        element: (
          <ProtectedRoute>
            <HomeAdmin />
          </ProtectedRoute>
        ),
      },
      {
        path: 'addProduct',
        element: (
          <ProtectedRoute>
            <AddProduct />
          </ProtectedRoute>
        ),
      },
      {
        path: 'orders',
        element: (
          <ProtectedRoute>
            <OrderList />
          </ProtectedRoute>
        ),
      },
      {
        path: 'deliveries',
        element: (
          <ProtectedRoute>
            <DeliveryList />
          </ProtectedRoute>
        ),
      },
      {
        path: 'deliveries/:id',
        element: (
          <ProtectedRoute>
            <SpecifiquDelivries />
          </ProtectedRoute>
        ),
      },
      {
        path: 'delivery/:id',
        element: (
          <ProtectedRoute>
            <DeliveryOfAnOrder />
          </ProtectedRoute>
        ),
      },
      {
        path: 'complaints',
        element: (
          <ProtectedRoute>
            <ComplaintsList />
          </ProtectedRoute>
        ),
      },
      {
        path: 'addProduct',
        element: (
          <ProtectedRoute>
            <AddProduct />
          </ProtectedRoute>
        ),
      },
      {
        path: 'edit-product/:id',
        element: (
          <ProtectedRoute>
            <EditProduct />
          </ProtectedRoute>
        ),
      },
      {
        path: 'admin/products',
        element: (
          <ProtectedRoute>
            <ProductList />
          </ProtectedRoute>
        ),
      },
      {
        path: 'admin/orders',
        element: (
          <ProtectedRoute>
            <OrderList />
          </ProtectedRoute>
        ),
      },
      {
        path: 'admin/deliveries',
        element: (
          <ProtectedRoute>
            <DeliveryList />
          </ProtectedRoute>
        ),
      },
      {
        path: 'admin/deliveries/:id',
        element: (
          <ProtectedRoute>
            <SpecifiquDelivries />
          </ProtectedRoute>
        ),
      },
      {
        path: 'admin/delivery/:id',
        element: (
          <ProtectedRoute>
            <DeliveryOfAnOrder />
          </ProtectedRoute>
        ),
      },
      {
        path: 'admin/complaints',
        element: (
          <ProtectedRoute>
            <ComplaintsList />
          </ProtectedRoute>
        ),
      },
      {
        path: 'payment_online',
        lazy: async () => ({
          Component: (await import('../pages/Invoices/Online.jsx')).default,
        }),
      },
        {
            path: 'payment_delivery',
            lazy: async () => ({
                Component: (await import('../pages/Invoices/Delivery.jsx')).default,
            }),
        },
      // {
      //   path: 'chats',
      //   lazy: async () => ({
      //     Component: (await import('@/components/coming-soon')).default,
      //   }),
      // },
      // {
      //   path: 'users',
      //   lazy: async () => ({
      //     Component: (await import('@/components/coming-soon')).default,
      //   }),
      // },
      // {
      //   path: 'analysis',
      //   lazy: async () => ({
      //     Component: (await import('@/components/coming-soon')).default,
      //   }),
      // },
      // {
      //   path: 'extra-components',
      //   lazy: async () => ({
      //     Component: (await import('@/pages/extra-components')).default,
      //   }),
      // },
      // {
      //   path: 'settings',
      //   lazy: async () => ({
      //     Component: (await import('./pages/settings')).default,
      //   }),
      //   errorElement: <GeneralError />,
      //   children: [
      //     {
      //       index: true,
      //       lazy: async () => ({
      //         Component: (await import('./pages/settings/profile')).default,
      //       }),
      //     },
      //     {
      //       path: 'account',
      //       lazy: async () => ({
      //         Component: (await import('./pages/settings/account')).default,
      //       }),
      //     },
      //     {
      //       path: 'appearance',
      //       lazy: async () => ({
      //         Component: (await import('./pages/settings/appearance')).default,
      //       }),
      //     },
      //     {
      //       path: 'notifications',
      //       lazy: async () => ({
      //         Component: (await import('./pages/settings/notifications'))
      //           .default,
      //       }),
      //     },
      //     {
      //       path: 'display',
      //       lazy: async () => ({
      //         Component: (await import('./pages/settings/display')).default,
      //       }),
      //     },
      //     {
      //       path: 'error-example',
      //       lazy: async () => ({
      //         Component: (await import('./pages/settings/error-example'))
      //           .default,
      //       }),
      //       errorElement: <GeneralError className="h-[50svh]" minimal />,
      //     },
      //   ],
      // },
    ],
  },
])
export default router
