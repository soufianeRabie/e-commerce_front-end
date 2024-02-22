import { useAuth } from '../../Context/GlobalState.jsx'
import { Navigate, useNavigate } from 'react-router-dom'
import { ApiServices } from '../../services/axiosServices.js'

function ProtectedRoute({ children }) {
  const { user, dispatch, logout } = useAuth()
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  if ((!token && !user) || !token) {
    return <Navigate to={'/login'} replace={true} state={{ mustLogin: true }} />
  }
  if (token && !user) {
    try {
      ApiServices.getUser().then(async (response) => {
        dispatch({
          type: 'SET_USER',
          user: response.data,
        })
      })
    } catch (error) {
      logout(navigate, dispatch)
    }
  }
  return children
}

export default ProtectedRoute
