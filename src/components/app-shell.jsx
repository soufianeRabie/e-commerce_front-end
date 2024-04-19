import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from './sidebar.jsx'
import useIsCollapsed from './Hooks/use-is-collapsed.js'
import { useEffect, useRef, useState } from 'react'
import { ApiServices } from '../services/axiosServices.js'
import { Library } from '../Library/Library.jsx'
import { useAuth } from '../Context/GlobalState.jsx'
import { useGetComplaints } from './Hooks/useGetComplaints.js'

export default function AppShell() {
  const { dispatch, logout } = useAuth()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const { getComplaints } = useGetComplaints()
  const [isCollapsed, setIsCollapsed] = useIsCollapsed()
  useEffect(() => {
    const token = localStorage.getItem('token'),
      DefaultAuthenticate = async () => {
        if (token) {
          try {
            await ApiServices.getUser().then(async (response) => {
              dispatch({
                type: 'SET_USER',
                user: response.data,
              })
              if (
                response.data.role !==
                parseInt(import.meta.env.VITE_APP_ADMIN_ROLE_NUMBER)
              ) {
                logout(navigate, dispatch)
              }
            })
          } catch (error) {
            logout(navigate, dispatch)
            Library.showToast('we cant authenticate you ')
          }
        }
      }
    DefaultAuthenticate().then(() => setIsLoading(false))
  }, [])

  useEffect(() => {
    const fetchProducts = async () => {
      await Library.fetchProduct(dispatch)
      const response = await ApiServices.GetAllOrders()
      await getComplaints()
      const statisticResponse = await ApiServices.TotalRevenue()

      const responseDel = await ApiServices.GetAllDeliveries()
      const responseOrdersOnline = await ApiServices.GetAllOrderOnline()
      Library.setStatistics(dispatch, statisticResponse?.data)
      Library.setOrders(dispatch, response.data)
      Library.setDeliveries(dispatch, responseDel.data)
      Library.setOnlineOrders(dispatch, responseOrdersOnline.data)
    }
    fetchProducts().then(() => {
      setIsLoading(false)
    })
  }, [])

  return (
    <div className="relative h-full overflow-hidden bg-background">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <main
        id="content"
        className={`overflow-x-hidden pt-16 transition-[margin] md:overflow-y-hidden md:pt-0 ${isCollapsed ? 'md:ml-14' : 'md:ml-64'} h-full`}
      >
        {!isLoading && <Outlet />}
      </main>
    </div>
  )
}
