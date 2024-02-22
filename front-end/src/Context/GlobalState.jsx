import { createContext, useContext, useReducer } from 'react'
import AppReducer, { initialState } from './AppReducer.js'

const GlobalContext = createContext()
const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState)
  const logout = (navigate, dispatch) => {
    localStorage.removeItem('token')
    dispatch({
      type: 'SET_USER',
      user: null,
    })
    return navigate('/')
  }
  return (
    <GlobalContext.Provider
      value={{
        basket: state.basket,
        user: state.user,
        dispatch: dispatch,
        products: state.products,
        logout: logout,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
export default GlobalProvider
export const useAuth = () => {
  return useContext(GlobalContext)
}
