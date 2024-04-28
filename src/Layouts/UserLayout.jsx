import AmazoneLogo from '../components/Svgs/amazoneLogo.jsx'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../Context/GlobalState.jsx'
import { useEffect, useState, useRef } from 'react'
import { ApiServices } from '../services/axiosServices.js'
import Loading from '../components/Loadings/Loading.jsx'
import { GlobalColorTailwand, Library } from '../Library/Library.jsx'
import Search from '../components/Search/Search.jsx'
import { AnimatePresence, motion } from 'framer-motion'
import { FiChevronDown } from 'react-icons/fi'
import {
  AlignJustify,
  NavigationIcon,
  SearchIcon,
  ShoppingBasketIcon,
} from 'lucide-react'
import { ModeToggle } from '../components/DarkMode/mode-toggle.jsx'
import { LeftSide } from '../components/LeftSideBar/Sheet.jsx'
import { NavigationMenuDemo } from './NavigationMenu.jsx'
import { UserNavigationMenu } from '../Library/NavigationMenu.jsx'
import { useGetUserOrders } from '../components/Hooks/useGetUserOrders.js'

function UserLayout() {
  const { user, basket, dispatch, products, logout } = useAuth()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)
  const [searchVisibility, setSearchVisibility] = useState(false)
  const {
    getUserOrders,
    error,
    success,
    isError,
    isLoading: getUserOrdersLoading,
  } = useGetUserOrders()

  useEffect(() => {
    try {
      const fetchProducts = async () => {
        try {
          await Library.fetchProduct(dispatch)
        } catch (err) {
          console.log(err)
        }
      }
      fetchProducts().then(() => {
        setIsLoading(false)
      })

      const token = localStorage.getItem('token')
      const getBasket = async () => {
        if (token) {
          try {
            await ApiServices.getUser().then(async (response) => {
              dispatch({
                type: 'SET_USER',
                user: response.data,
              })
              await ApiServices.UserCart().then(({ data }) => {
                const cartItems = data.cart.map((item) => ({
                  itemId: item.product_id,
                  quantity: item.quantity,
                }))
                dispatch({
                  type: 'SET_BASKET',
                  payload: cartItems,
                })
              })
              if (response.data.role !== 0) {
                logout(navigate, dispatch)
              }
            })
          } catch (error) {
            logout(navigate, dispatch)
          }
        } else {
          try {
            await ApiServices.GuestCart().then(({ data }) => {
              const cartItems = data.cart.map((item) => ({
                itemId: item.product_id,
                quantity: item.quantity,
              }))
              dispatch({
                type: 'SET_BASKET',
                payload: cartItems,
              })
            })
          } catch (error) {
            console.error(error)
          }
        }
      }
      getBasket().then(() => setIsLoading(false))

      const getOrdersOfUser = async () => {
        if (token) {
          await getUserOrders()
        }
      }
      getOrdersOfUser()
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleLogout = async () => {
    await logout(navigate, dispatch)
    dispatch({
      type: 'EMPTY_BASKET',
      user: null,
    })
  }

  // Function to handle click outside of dropdown
  const handleBodyClick = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsDropdownOpen(false)
    }
  }

  useEffect(() => {
    document.body.addEventListener('click', handleBodyClick)
    return () => {
      document.body.removeEventListener('click', handleBodyClick)
    }
  }, [])

  if (isLoading) {
    return <Loading />
  }

  const getBasketQuantity = (basket) => {
    return basket?.reduce((amount, item) => {
      console.log(amount + item.quantity)
      return amount + parseInt(item?.quantity)
    }, 0)
  }

  return (
    <>
      <div className="fixed z-20 max-h-52 bg-white dark:bg-slate-900 bg-opacity-70 dark:bg-opacity-90 dark:backdrop-blur-md dark:shadow-xl shadow-md backdrop-blur-md w-full text-gray-900 p-4 ">
        <div className="container w-full sm:w-4/5 mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <div className="mr-3 flex gap-1">
              <div className={'md:hidden'}>
                <LeftSide
                  name={
                    <AlignJustify
                      className={'text-slate-900 dark:text-white'}
                    />
                  }
                  user={user}
                  handleLogout={handleLogout}
                />
              </div>
              <button onClick={() => navigate('/')} className={''}>
                <div>SRKING👑</div>
              </button>
            </div>
            <div className="hidden sm:block">
              <Search />
            </div>
          </div>
          <div className="flex w-56 justify-around items-center">
            <div className={`sm:mx-4 ${user && 'hidden md:block'}`}>
              <div className="text-sm"></div>
              <div>
                {user ? (
                  <></>
                ) : (
                  <span className={'hidden md:inline-block'}>
                    <Link
                      to="/login"
                      className="items-center gap-1 rounded-full px-3 py-1.5 text-sm transition-colors text-neutral-400 font-semibold hover:bg-neutral-800 hover:text-neutral-100"
                    >
                      Login
                    </Link>
                  </span>
                )}
              </div>
            </div>
            {user &&<div className={'hidden md:block'}> <NavigationMenuDemo  components={UserNavigationMenu} /></div>}
            <Link to="/checkout">
              <div className="flex relative  items-center sm:mx-4">
                <div className="mr-1">
                  <ShoppingBasketIcon
                    className={
                      'w-5 h-5 sm:w-6 sm:h-6 text-slate-900 dark:text-white'
                    }
                  />
                </div>
                <span className="text-sm sm:text-md absolute dark:text-blue-400  bottom-2 sm:bottom-3 shadow-xl   right-1 text-black font-bold">
                  {basket?.length > 0 && getBasketQuantity(basket)}
                </span>
              </div>
            </Link>
            <div
              className={'ml-4 cursor-pointer'}
              onClick={() => setSearchVisibility((prevState) => !prevState)}
            >
              <div className={'sm:hidden cursor-pointer'}>
                <label htmlFor={'searchInput'}>
                  <SearchIcon
                    className={'text-slate-900 cursor-pointer dark:text-white'}
                  />
                </label>
              </div>
            </div>
            <div>
              <ModeToggle />
            </div>
          </div>
        </div>
        {/* Mobile Search Bar (visible on small screens) */}
        <div>
          {searchVisibility && (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="sm:hidden mt-4"
              >
                <Search />
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.3 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className={'mt-20 relative'}>{<Outlet />}</div>
      </motion.div>
    </>
  )
}

export default UserLayout
