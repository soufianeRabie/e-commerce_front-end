import React from 'react';
import StarRating from "./rating/StarRating.jsx";
import {useAuth} from "../Context/GlobalState.jsx";
import {removeItemFromBaslket} from "./actions.js";
function CheckoutCard({item , quantity}) {

    const {dispatch , basket} = useAuth()
    const handleRemoveitemFromBasket = ( id)=>{
        dispatch(  {
            type : "REMOVE_ITEM_FROM_BASKET",
            id : id
        })
    }
    return (
        <div className={"md:justify-evenly w-5/6 mx-auto mb-8 sm:m-10 justify-center flex flex-wrap "}>
            <div
                className={"relative product  p-1 flex  w-full flex-col overflow-hidden rounded-lg border border-gray-100 shadow-md "}>

                <div className={"flex flex-wrap md:flex-nowrap justify-center"}>
                    <div
                        className={"flex max-w-md justify-center sm:justify-start  sm:m-5    h-56  imgProductDetails basket-card"}>
                        <img className={"rounded-md max-w-sm sm:ml-4  "} src={"/src/" + item.product.image}/>

                    </div>
                    <div>
                        * {item.quantity}
                    </div>
                    <div className={"min-w-96 p-3  sm:p-4 md:flex flex-col mt-8 sm:m-0 h-full md:justify-evenly max-w-md "}>
                        <div className={"flex justify-evenly"}>
                            <h2 className={"font-semibold text-md sm:text-xl"}>{item.product.title}</h2>
                            <StarRating rating={item.product.rating}/><span
                            className="mr-1 ml-1 rounded bg-amber-500 px-2 hover:text-red-600 py-1 text-xs font-semibold">{Math.floor(item.product.rating)}</span>
                        </div>

                        <div className={"p-10"}>
                            <div ><p className={"text-md sm:text-lg flex flex-nowrap"}> {item.product.description}</p></div>
                            <div className={"m-4 text-center"}>
                                {item.product.isSold && <>
                                <span
                                    className="text-2xl font-bold text-orange-600 "><small>$</small><strong>{item.product.price}</strong></span>
                                    <span className="text-sm text-slate-900 line-through"><small>$</small>{item.product.oldPrice}</span>
                                </>
                                }
                                {!item.product.isSold &&
                                    <span
                                        className="text-xl font-semibold text-slate-900"><small>$</small><strong>{item.product.price}</strong></span>
                                }
                            </div>
                        </div>

                        <div onClick={()=>handleRemoveitemFromBasket( item.product.id)} className={"w-full flex   justify-center"}>
                            <button
                                type={"button"}
                                className="flex items-center justify-center rounded-md bg-amber-500 px-5 mb-2 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300 cursor-pointer addToCart-btn">
                                <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6 "
                                     fill="none"
                                     viewBox="0 0 24 24"
                                     stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
                                </svg>
                                <span  className={"cursor-pointer  flex-end "} > remove from basket</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CheckoutCard;
