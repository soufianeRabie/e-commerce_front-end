import  {createContext, useContext, useReducer} from 'react';
import AppReducer, { initialState} from "./AppReducer.js";


const GlobalContext = createContext();
const GlobalProvider = ({children})=>{
  const [state, dispatch] = useReducer(AppReducer, initialState );
  return (
    <GlobalContext.Provider value={{basket : state.basket , user: state.user , dispatch : dispatch}}>
      {children}
    </GlobalContext.Provider>
  )
}
export default GlobalProvider
export const useAuth = ()=>{
  return  useContext(GlobalContext);
}
