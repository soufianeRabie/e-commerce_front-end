import { useEffect, useRef, useState } from 'react'
import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom'
import AmazoneLogo from '../components/Svgs/amazoneLogo.jsx'
import { CircleUserIcon } from 'lucide-react'
import { useAuth } from '../Context/GlobalState.jsx'
import { ApiServices } from '../services/axiosServices.js'
import { Library } from '../Library/Library.jsx'
import Loading from '../components/Loadings/Loading.jsx'
import { FiChevronDown } from 'react-icons/fi'
import { AnimatePresence, motion } from 'framer-motion'
import { ModeToggle } from '../components/DarkMode/mode-toggle.jsx'
import { NavigationMenuDemo } from './NavigationMenu.jsx'
import { AdminNavigationMenu } from '../Library/NavigationMenu.jsx'
import { useGetComplaints } from '../components/Hooks/useGetComplaints.js'

function AdminLayout() {
  const { user, dispatch, logout, products } = useAuth()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)
  const { getComplaints } = useGetComplaints()

  const handleBodyClick = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsDropdownOpen(false)
    }
  }

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

    return () => {
      document.body.removeEventListener('click', handleBodyClick)
    }
  }, [])

  useEffect(() => {
    // Fetch products only when products are not already present
    const fetchProducts = async () => {
      await Library.fetchProduct(dispatch)
      const response = await ApiServices.GetAllOrders()
      await getComplaints();
      const responseDel = await ApiServices.GetAllDeliveries()
      const responseOrdersOnline = await ApiServices.GetAllOrderOnline()
      Library.setOrders(dispatch, response.data)
      Library.setDeliveries(dispatch, responseDel.data)
      Library.setOnlineOrders(dispatch, responseOrdersOnline.data)
    }
    fetchProducts().then(() => {})
  }, [])

  useEffect(() => {
    document.body.addEventListener('click', handleBodyClick)
    return () => {
      document.body.removeEventListener('click', handleBodyClick)
    }
  }, [])

  const handleProfile = () => {
    // Implement your profile logic here
    setIsDropdownOpen(false)
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <div>
      <div className="fixed z-10 bg-white dark:bg-opacity-70 bg-opacity-70 dark:bg-slate-900 shadow-md  backdrop-blur-md w-full text-gray-900 p-4 sm:p-8">
        <div className="container w-4/5 sm:w-full mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <div className="mr-3">
              <Link to={'/admin'} className={'text-white'}>
                <AmazoneLogo
                  width={'100px'}
                  height={'30px'}
                  color={'#000aa3'}
                />
              </Link>
            </div>
            <div className="hidden sm:block">
              <input
                className="w-full h-8 px-3 rounded-xl text-black bg-white bg-opacity-50 border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Search for products..."
                name="searchBar"
              />
            </div>
          </div>
          <div className="flex items-center">
            <NavigationMenuDemo components={AdminNavigationMenu} />
            <div>
              <ModeToggle />
            </div>
          </div>
        </div>
        {/* Mobile Search Bar (visible on small screens) */}
        <div className="sm:hidden mt-4">
          <input
            className="w-full h-8 px-3 rounded-xl text-black bg-white bg-opacity-50 border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Search for products..."
            name="searchBar"
          />
        </div>
      </div>

      <div className={'mt-32  w-full'}>
        <div>{<Outlet />}</div>
      </div>
    </div>
  )
}

export default AdminLayout
