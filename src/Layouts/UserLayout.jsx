import AmazoneLogo from '../components/Svgs/amazoneLogo.jsx'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../Context/GlobalState.jsx'
import { useEffect, useState } from 'react'
import { FaShoppingBasket } from 'react-icons/fa'
import { ApiServices } from '../services/axiosServices.js'
import { CircleUserIcon } from 'lucide-react'
import Loading from '../components/Loadings/Loading.jsx'
import { Library } from '../Library/Library.jsx'

function UserLayout() {
  const { user, basket, dispatch, products, logout } = useAuth()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    if (products.length === 0) {
      // Fetch products only when products are not already present
      const fetchProducts = async () => {
        await Library.fetchProduct(dispatch)
      }
      fetchProducts().then(() => {
        setIsLoading(false)
      })
    } else {
      // Don't fetch products if they are already present
      setIsLoading(false)
    }
    const token = localStorage.getItem('token'),
      getBasket = async () => {
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
  }, [])

  if (isLoading) {
    return <Loading />
  }

  const handleLogout = async () => {
    logout(navigate, dispatch)
    dispatch({
      type: 'EMPTY_BASKET',
      user: null,
    })
  }
  return (
    <>
      <div className="fixed z-10 bg-white bg-opacity-70 shadow-md backdrop-blur-md w-full text-gray-900 p-4 sm:p-8">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <div className="mr-3">
              <Link to={'/'} className={'text-white'}>
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
            <div className="sm:mx-4">
              <div className="text-sm">
                {user ? (
                  <span className="text-orange-600">{user.email}</span>
                ) : (
                  'Guest'
                )}
              </div>
              <div>
                {user ? (
                  <button
                    className="bg-amber-500 text-white rounded-md p-1 w-full hover:text-orange-600 hover:bg-white focus:outline-none"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                ) : (
                  <span>
                    <Link to="/login" className="text-white hover:underline">
                      Login
                    </Link>
                  </span>
                )}
              </div>
            </div>
            <Link to="/orders" className="sm:mx-4 text-sm hover:underline">
              <div>
                <div>Orders</div>
              </div>
            </Link>
            <div className="sm:mx-4">
              <div className="text-sm">
                <CircleUserIcon />
              </div>
            </div>
            <Link to="/checkout">
              <div className="flex items-center sm:mx-4">
                <div className="mr-2">
                  <FaShoppingBasket
                    style={{ color: 'orangered' }}
                    size={28}
                    color="green"
                  />
                </div>
                <div className="text-lg">{basket?.length}</div>
              </div>
            </Link>
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

      <div>
        <div>{<Outlet />}</div>
      </div>
    </>
  )
}

export default UserLayout
