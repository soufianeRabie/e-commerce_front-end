// Import React
import React from 'react';
import StarRating from "./rating/StarRating.jsx";
import {useAuth} from "../Context/GlobalState.jsx";
import "./Product.css"
import {useParams} from "react-router-dom";
import Product from "../Product.json";
import "./Product.css"

// Your Component
function ProductCardDetails() {

    const {dispatch} = useAuth()
    const params = useParams()
    const product = Product.find((product) => product.id === params.id)
    console.log("product" ,product)
    const handleAddToBasket = (e)=>{
        e.preventDefault();

        dispatch({
            type: 'ADD_TO_BASKET',
            basket: {
                id :product.id, title:product.title, image:product.image, oldPrice:product.oldPrice
                , isSold:product.isSold, price: product.price, rating:product.rating , description :product.description
            }
        })
    }
    return (
        <>

            <div className={"w-full flex  justify-center "}>
                <div className={"relative product m-2 sm:m-10 p-4 flex w-full max-w-lg flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md hover:text-white hover:bg-gray-900 "}>
                    <div> {product.description}</div>
                    <div className={"w-full"}>
                        <div className={"flex gap-3"}><StarRating rating={product.rating}/><span
                            className="mr-1 ml-1 rounded bg-amber-500 px-2 hover:text-red-600 py-1 text-xs font-semibold">{Math.floor(product.rating)}</span>
                        </div>
                        <div className={"flex w-3/4 m-5 mx-auto h-56 justify-center imgProductDetails" }>
                            <img className={"rounded-md w-full "} src={"/src/"+product.image}/>
                        </div>
                        <div className={"w-full flex items-center justify-center "}>
                            <button
                                onClick={handleAddToBasket}
                                type={"submit"}
                                className="flex items-center justify-center rounded-md bg-amber-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300 cursor-pointer addToCart-btn">
                                <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6 " fill="none"
                                     viewBox="0 0 24 24"
                                     stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
                                </svg>
                                <span className={"cursor-pointer"}> Add to cart</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductCardDetails;
