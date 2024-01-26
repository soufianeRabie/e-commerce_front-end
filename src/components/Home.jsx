import React, {useEffect} from 'react';
import Product from "../Product.json"
import image1 from "../images/image10.jpg"
import ProductCard from "./ProductCard.jsx";
import {authApi} from "../axiosServices.js";
import {useAuth} from "../Context/GlobalState.jsx";
import {ToastContainer} from "react-toastify";
import {Library} from "../library.jsx";
import {useLocation} from "react-router-dom";

function Home() {

    const location = useLocation()

    useEffect(() => {
        if(location.state && location.state.welcomeMessage)
        {
            console.log("yes weclome message ")
            Library.showToast("welcome and thank you to choice our store " , "info" , "top-right" , 4000)
        }else{
            console.log("no")
        }

    }, [location.state]);

    const {dispatch} = useAuth()
  console.log(Product)
  return (
    <div className={"absolute mt-14"}>
        <ToastContainer />
        <img src={image1} className={"w-full h-96 bg-cover -z-50 absolute opacity-85 "}/>
        <div className={"flex justify-center items-center relative top-20"}>
            <h1 className={"text-3xl  font-bold text-green-600 font-sans normal- "}>hello in your shop </h1>
        </div>
        <div className={"flex flex-wrap justify-center mt-44"}>
            {Product.map((item , key)=><ProductCard key={key} rating={item.rating}
                id={item.id} image={item.image} isSold={item.isSold} price={item.price} oldPrice={item.oldPrice}
                description={item.description} title={item.title} />)}
        </div>
    </div>
  );
}

export default Home;
