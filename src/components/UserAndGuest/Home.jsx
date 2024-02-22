import React, { useEffect } from 'react'
import image1 from '../../assets/images/image10.jpg'
import ProductCard from './ProductCard.jsx'
import { ToastContainer } from 'react-toastify'
import { Library } from '../../Library/Library.jsx'
import { useLocation } from 'react-router-dom'
import { useAuth } from '../../Context/GlobalState.jsx'

function Home() {
  const { products } = useAuth()
  const location = useLocation()

  useEffect(() => {
    if (location.state && location.state.welcomeMessage) {
      Library.showToast(
        'welcome and thank you to choice our store ',
        'info',
        'top-right',
        1000,
      )
    }
  }, [location.state])

  return (
    <div className={'mt-20 absolute'}>
      <ToastContainer />

      {/* Background Image */}
      <img
        src={image1}
        className="w-full  h-screen bg-cover -z-50 absolute opacity-85"
        alt="Background"
      />

      {/* Content */}
      <div className="flex justify-center items-center relative top-20">
        <h1 className="text-3xl font-bold text-amber-600 px-20 py-2 rounded-xl  bg-blue-900 font-sans normal">
          Hello in your shop
        </h1>
      </div>

      <div className="flex flex-wrap justify-center mt-44">
        {products.map((item, key) => (
          <ProductCard
            key={key}
            rating={item.rating}
            id={item.id}
            image={item.image}
            isSold={item.isSold}
            price={item.price}
            oldPrice={item.oldPrice}
            description={item.description}
            title={item.title}
          />
        ))}
      </div>
    </div>
  )
}

export default Home
