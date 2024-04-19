import React, { useEffect, useState } from 'react'
import image1 from '../../../assets/images/image10.jpg'
import ProductCard from './ProductCard.jsx'
import { ToastContainer } from 'react-toastify'
import { GlobalColorTailwand, Library } from '../../../Library/Library.jsx'
import { useLocation } from 'react-router-dom'
import { useAuth } from '../../../Context/GlobalState.jsx'
import Banner from '../../../Banner.jsx'
import Sidebar from '@/components/Sidebar/Sidebar.jsx'
import { Shet } from '../../Sidebar/Sheet.jsx'
import { Button } from '@/components/ui/button.jsx'
import { FilterIcon } from 'lucide-react'
import { Products } from './Products.jsx'

function Home() {
  const { products } = useAuth()
  const location = useLocation()
  const [categories, setCategories] = useState([])
  const [temProducts, setTemProducts] = useState([])
  const handleChangeCat = (category) => {
    const isFound = categories.find((cat) => cat === category)
    console.log(isFound)
    console.log(category)
    return isFound
      ? categories.filter((cat) => cat !== category)
      : categories.push(category)
  }

  useEffect(() => {
    console.log(categories)
  }, [categories])

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

  useEffect(() => {
    setTemProducts(products)
    const scrollToProduct = () => {
      const productIdFromUrl = window.location.hash.substr(1) // Remove leading '#' from hash
      const element = document.getElementById(productIdFromUrl)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }

    // Scroll to the product once the component mounts or when product changes
    scrollToProduct()
  }, [products])

  const handleFilter = (price, categories) => {
    const isAll = categories.find((c) => c === 'All')
    const filteredProducts = products.filter(
      (product) =>
        product.price >= price &&
        (!isAll ? product.category.includes(categories) : 1),
    )
    setTemProducts(filteredProducts)
  }
  return (
    <div className={''}>
      <ToastContainer />
      <Banner />
      <div className="flex justify-center items-center relative top-32"></div>
      {temProducts?.length > 0 ? (
        <div className="flex flex-wrap justify-center mt-10">
          <Products result={temProducts} />
        </div>
      ) : (
        <div className={"text-3xl text-center my-20"}>sorry we dont have any product like this </div>
      )}
      <div className={'fixed bottom-10 right-10'}>
        <Shet handleChangeCat={handleChangeCat} handleFilter={handleFilter} />
      </div>
    </div>
  )
}

export default Home
