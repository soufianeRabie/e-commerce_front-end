
import './App.css'
import Header from "./components/Header.jsx";
import {Route, Routes, useNavigate} from "react-router-dom";
import Auth from "./components/Auth.jsx";
import {useEffect, useState} from "react";
import {auth} from "./firebase.js";
import {useAuth} from "./Context/GlobalState";
import Home from "./components/Home.jsx";
import ProductCardDetails from "./components/ProductCardDetails.jsx";
import Checkout from "./components/Checkout.jsx";
import Payment from "./components/Payment.jsx";
import Orders from "./components/Orders.jsx";
import {Elements} from "@stripe/react-stripe-js";
import { loadStripe } from '@stripe/stripe-js';
import {authApi} from "./axiosServices.js";
import {ToastProvider} from "react-toast-notifications";


function App() {

    const {dispatch , user} = useAuth()
    const StripePomise = loadStripe(import.meta.env.VITE_APP_PUBLISHED_KEY)
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
       const  token = localStorage.getItem('token');
        const getBasket = async ()=>{
            if(token)
            {
                try{
                   await authApi.getUser().then((response)=>{
                        dispatch({
                            type:'SET_USER',
                            user : response.data
                        })
                    })
                  await  authApi.UserCart().then(({data})=>{
                      const cartItems = data.cart.map((item)=>
                      ({itemId : item.product_id , quantity : item.quantity}))

                            dispatch({
                                type :"SET_BASKET",
                                payload :cartItems
                            })
                    })
                }catch (error)
                {
                    try {
                       await authApi.logout().then(()=>{
                            navigate("/")
                        });
                    }catch (error) {
                        console.error(error)
                    }
                }
            }else{
                try{
                    await authApi.GuestCart().then(({data})=>{
                        data.cart.map((item)=>{
                            dispatch({
                                type :"SET_BASKET",
                                payload : {
                                    itemId : item.product_id,
                                    quantity : item.quantity
                                }
                            })
                        })
                    })
                }catch (error)
                {
                    console.error(error)
                }

            }
        }
         getBasket().then(()=>  setIsLoading(false))
    }, [] );

    if(isLoading)
    {
        console.log("yes")
        return <div className={"w-full h-full"}>
            <div className="flex items-center justify-center absolute top-1/2 left-1/2">
                <div
                    className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500 border-t-blue-500 border-t-4 border-t-opacity-75"></div>
            </div>
        </div>
    }

    return (
        <>
            <Routes>
                <Route path={"/"} element={<>
                    <Header/>
                    <Home/>
                </>}/>

                    <Route path={"/login"} element={<Auth/> }/>

            <Route path={"/product/:id"} element={<ProductCardDetails/>}/>
            <Route path={"/checkout"} element={<>
                <Header/>
                <Checkout/>
            </>}/>
            <Route path={"/payment"} element={<>
                <Elements stripe={StripePomise} >
                    <Header/>
                    <Payment/>
                </Elements>

            </>}/>
            <Route path={"/orders"} element={<>
                <Header/>
                <Orders/>
            </>}/>
        </Routes>
    </>
  )
}

export default App
