import { useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import AmazoneLogo from '../components/Svgs/amazoneLogo.jsx'
import { CircleUserIcon } from 'lucide-react'
import { useAuth } from '../Context/GlobalState.jsx'
import { ApiServices } from '../services/axiosServices.js'
import { Library } from '../Library/Library.jsx'
import Loading from '../components/Loadings/Loading.jsx'

function AdminLayout() {
  const { user, dispatch, logout } = useAuth()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
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
  }, [])
  const handleLogout = async () => {
    logout(navigate, dispatch)
  }

  const handleAddProduct = () => {
    // Implement your add product logic here
  }

  const handleProfile = () => {
    // Implement your profile logic here
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <div>
      <div className="fixed z-10 bg-white bg-opacity-70 shadow-md  backdrop-blur-md w-full text-gray-900 p-4 sm:p-8">
        <div className="container mx-auto flex items-center justify-between">
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
            <div className="sm:mx-4">
              <div className="text-sm">
                {user ? (
                  <span className="text-orange-600 mx-2">{user.email}</span>
                ) : (
                  'Guest'
                )}
              </div>
            </div>

            <div className="relative inline-block text-left">
              <div>
                <div
                  onClick={handleToggleDropdown}
                  className="cursor-pointer text-sm"
                >
                  <CircleUserIcon />
                </div>
              </div>

              {isDropdownOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div
                    className="py-1"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    <button
                      onClick={handleLogout}
                      className=" px-4 py-2 text-sm text-gray-700 w-full flex  hover:bg-gray-100"
                      role="menuitem"
                    >
                      Logout
                    </button>
                    <button
                      onClick={handleAddProduct}
                      className=" px-4 py-2 text-sm  w-full flex text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      <Link to={'/addProduct'}> Add Product</Link>
                    </button>
                    <button
                      onClick={handleProfile}
                      className=" px-4 py-2 text-sm w-full flex text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Profile
                    </button>
                  </div>
                </div>
              )}
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

      <div className={'mt-32 absolute w-full'}>
        <div>{<Outlet />}</div>
      </div>
    </div>
  )
}

export default AdminLayout
