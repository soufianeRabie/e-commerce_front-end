import React, {useEffect, useState} from 'react';
import {useAuth} from "../Context/GlobalState.jsx";
import {Link} from "react-router-dom";
import {TotalPrice} from "../Context/AppReducer.js";
import CheckoutCard from "./CheckoutCard.jsx";
import CurrencyFormat from 'react-currency-format'
import Product from "../Product.json";


// eslint-disable-next-line react-refresh/only-export-components
export  const displayProduct = (basket)=>{
    return basket.map(({itemId , quantity}, key) =>{
        const product = Product.find((product)=>parseInt(product.id) === itemId )
        if(!product)
        {
            return null
        }else{
            return <CheckoutCard  item={{product , quantity} } key={key}/>
        }
        }
    )
}

export const NumberOfDiscount = (basket)=>{
    const discountForEveryProduct = 0.5 ;
    const NumberOfProducts = basket.length;
    return  discountForEveryProduct * NumberOfProducts ;
}

export const PriceAfterDiscount = (totalPrice , NumberOfDiscount)=>{
    if(NumberOfDiscount > 0 && NumberOfDiscount < 7 )
    {
        return (totalPrice - totalPrice * (NumberOfDiscount / 100))
    }else if(NumberOfDiscount >7)
    {
        return (totalPrice - totalPrice * (7 / 100))
    }else {
        return totalPrice
    }
}

function Checkout() {
    const {basket , user} = useAuth()
    const Discount = NumberOfDiscount(basket)
    const [tPrice, setTPrice] = useState();


    useEffect(() => {
        setTPrice(TotalPrice(basket))
    }, []);
    console.log(tPrice)
    return (
        <div className={" mt-20 absolute w-full"}>
            <div className={"text-center w"}>
                <h1 className={"text-xs text-wrap  sm:text-3xl"}>hello <span className={"text-amber-500"}>{user?.email}</span>
                    <span> this your shop card</span>
                </h1>
            </div>
            <div className={"flex flex-wrap justify-center xl:justify-between w-full"}>
                {basket.length > 0 ? <div> {displayProduct(basket )}</div>
                    : <div className={"flex w-full justify-center mt-10"}>
                        <h1 className={"text-3xl text-red-500 mr-8"}> your basket is empty </h1>
                        <Link
                            to={"/"}>
                        <span
                            className={" rounded-md bg-amber-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300 cursor-pointer "}>  go to shop</span></Link>
                    </div>}
                <div>

                </div>
                <div className={"flex justify-center"}>
                    {basket.length > 0 ? (
                        <div
                            className="flex flex-col lg:mr-8 justify-center  xl:fixed top-36 right-0  items-center  p-2 m-2 border border-gray-300 shadow-md bg-white rounded-md max-w-sm">
                            <p className="text-2xl font-semibold mb-4">Your Shopping Basket</p>
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div className="flex items-center space-x-2">
                                    <img
                                        src="https://placekitten.com/50/50"
                                        alt="Product"
                                        className="w-10 ml-4 h-10 rounded-full"
                                    />
                                    <p className="text-gray-700"> {user?.email}</p>
                                </div>

                            </div>

                            {/* Total Price */}
                            <div className="flex w-full justify-evenly border-t border-gray-300 pt-4">
                                <div className={"flex"}>
                                    <p className="text-lg font-semibold mr-2">Total: </p>
                                    <p className="text-green-500 text-lg font-semibold"><CurrencyFormat
                                        value={PriceAfterDiscount( TotalPrice(basket),Discount )}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        decimalScale={2}
                                        prefix={'  $'}
                                    /></p>
                                </div>
                                <div className="text-right">
                                    <p className="text-red-600"><span
                                        className={"text-sm"}>  discount </span>{Discount}%</p>
                                    {/* Add quantity or other information here */}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-end mt-4">
                                <Link to={"/"}>
                                    <button
                                        className="bg-blue-500  text-white px-1.5 py-2 rounded-md mr-4 hover:bg-blue-600">
                                        Continue Shopping
                                    </button>
                                </Link>
                                <Link to={"/payment"}>
                                    <button className="bg-amber-500 text-white px-6 py-2 rounded-md hover:bg-amber-600">
                                        Go to Payment
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ) : ""}
                </div>

            </div>

        </div>

    );
}

export default Checkout;

