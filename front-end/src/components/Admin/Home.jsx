import React, { useEffect, useState } from 'react'
import { useAuth } from '../../Context/GlobalState.jsx'
import { Library } from '../../Library/Library.jsx'
import CheckoutCard from '../UserAndGuest/CheckoutCard.jsx'
import Loading from '../Loadings/Loading.jsx'
import { Link } from 'react-router-dom'
import PopupDeleteProduct from './Product/PopupDeleteProduct.jsx'
import { EditIcon } from 'lucide-react'
import { ToastContainer } from 'react-toastify'

function Home() {
  const { products, dispatch } = useAuth()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (products.length === 0) {
      // Fetch products only when products are not already present
      const fetchProducts = async () => {
        await Library.fetchProduct(dispatch)
      }
      fetchProducts().then(() => {
        setIsLoading(false)
      })
    } else {
      // Don't fetch products if they are already present
      setIsLoading(false)
    }
  }, [dispatch, products])

  const displayProduct = () => {
    return products.map((product, key) => (
      <div key={key} className="relative w-full">
        <CheckoutCard
          key={key}
          hiddenButton={true}
          item={{ product: product }}
        />
        <div className="relative flex gap-1 justify-center items-center bottom-24">
          <Link
            to={`/admin/edit-product/${product.id}`}
            className={'p-1 mx-1 rounded-xl hover:bg-blue-500'}
          >
            <EditIcon size="30px" />
          </Link>
          <PopupDeleteProduct item={product} />
        </div>
      </div>
    ))
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="text-center w-full mx-auto">
      <ToastContainer containerId={'productAction'} />
      <h1 className="text-blue-900 text-xl">Our Products</h1>
      <div>{displayProduct()}</div>
    </div>
  )
}

export default Home
