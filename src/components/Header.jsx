import AmazoneLogo from "./Svgs/amazoneLogo.jsx";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../Context/GlobalState.jsx";
import {auth} from "../firebase.js";
import React, {useEffect, useState} from "react";
import {FaShoppingBasket} from "react-icons/fa";
import OffCanvasButton from "./OffCanvas.jsx";
import {authApi} from "../axiosServices.js";

function Header() {

    const {user , basket , dispatch} = useAuth()
    const navigate = useNavigate()
    console.log(basket)

    const handleAuthentication = async ()=>{
        await authApi.logout().then((signOut)=>{
            if(signOut)
            {
            localStorage.removeItem('token')
                dispatch({
                    type:"SET_USER",
                    user: null,
                })
                dispatch({
                    type:"EMPTY_BASKET",
                    user: null,
                })
                 navigate("/")
            }

        }).catch((error)=>{
            console.error(error)
        })
    }
  return (
  <div className={"fixed z-10 bg-black w-full h-16 text-white p-8 "  }>
      <div className={"w-full flex items-center h-full px-4  text-sm"}>
          <div className={"w-1/12 mx-3"}>
              <Link to={"/"} className={"text-white"}><AmazoneLogo width={"100px"} height={"30px"} color={"#ccc"}/></Link>
          </div>
          <div className={"w-3/5"}>
              <input className={"w-full h-8 px-3 rounded-xl text-black "} placeholder={"search about product..."}  name={"searchBar"}/>
          </div>
        <div >
            <div className={'flex justify-evenly sm:mx-10 min-w-fit items-center w-full'}>
                <div className={"mx-5 "}>
                    <div> {user ? <span className={"text-orange-600"}>{user.email} </span> : "Guest"}</div>
                    <div>{user ? <button
                            className={"bg-amber-500 text-white rounded-md p-1 w-full hover:text-orange-600 hover:bg-white"}
                            onClick={handleAuthentication}>logout</button>
                        : <span><Link to={"/login"}>login</Link></span>
                    } </div>
                </div>
                <Link to={"/orders"}>
                    <div className={"mx-5 "}>
                        <div>Returns</div>
                        <div>& Orders</div>
                    </div>
                </Link>

                <div className={"mx-5 "}>
                    <div>Your</div>
                    <div>Prime</div>
                </div>
                <Link to={"/checkout"}>
                    <div className={"flex justify-evenly items-center w-20"}>
                        <div>
                            <FaShoppingBasket style={{color: "orangered"}} size={28} color="green"/>
                            {/* Adjust size and color as needed */}
                        </div>

                        <div>
                            <span className={"text-lg"}>{basket?.length}</span>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
      </div>

  </div>
  );
}

export default Header;



