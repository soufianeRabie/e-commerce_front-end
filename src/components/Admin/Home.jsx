import React, { useEffect, useState } from 'react'
import { useAuth } from '../../Context/GlobalState.jsx'
import { Library } from '../../Library/Library.jsx'
import CheckoutCard from '../UserAndGuest/Checkout/CheckoutCard.jsx'
import Loading from '../Loadings/Loading.jsx'
import { Link } from 'react-router-dom'
import { EditIcon, TrashIcon } from 'lucide-react'
import { ToastContainer } from 'react-toastify'
import Modal from './Product/Modal.jsx'
import { ApiServices } from '../../services/axiosServices.js'
import { LayoutHeader } from '../custom/layout.jsx'
import { TopNav } from '../top-nav.jsx'
import ThemeSwitch from '../theme-switch.jsx'
import { UserNav } from '../user-nav.jsx'
import { Search } from '@/components/search'
import { topNav } from '../../pages/Dahsboard/index.jsx'

function Home() {
  const { products, dispatch } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [openModal, setOpenModal] = useState(null)
  const [currentProduct, setCurrentProduct] = useState()
  const [currentProducts, setCurrentProducts] = useState([])
  console.log(products)

  useEffect(() => {
    setCurrentProducts(products)
    setIsLoading(false)
  }, [products])
  const handleClickOnDelete = (id) => {
    setOpenModal(true)
    setCurrentProduct(id)
  }
  const displayProduct = () => {
    return currentProducts.map((product) => (
      <div key={product.id} className="relative w-full">
        <CheckoutCard item={{ product: product }} />
        <div className="relative flex gap-1 justify-center items-center bottom-24">
          <Link
            to={`/admin/edit-product/${product.id}`}
            className={'p-1 mx-1 rounded-xl hover:bg-blue-500'}
          >
            <EditIcon size="30px" />
          </Link>
          <div
            className={'cursor-pointer'}
            onClick={() => handleClickOnDelete(product?.id)}
          >
            <TrashIcon />
          </div>
          <Modal
            title={`Delete ${'product?'}`}
            message="Are ou sure you want to delete this Product ?"
            dangerOption="Delete"
            cancelOption="Cancel"
            dangerAction={() => handleDelete(currentProduct)}
            cancelAction={() => setOpenModal(null)}
            showModal={openModal}
          ></Modal>
        </div>
      </div>
    ))
  }

  if (isLoading) {
    return <Loading />
  }

  const handleDelete = async (id) => {
    try {
      const response = await ApiServices.deleteProduct(id)
      if (response.data === true) {
        dispatch({
          type: 'DELETE_PRODUCT',
          payload: {
            id: id,
          },
        })
        Library.showToast(
          'The product has been deleted successfully',
          'success',
          'top-right',
          3000,
          undefined,
          'productAction',
        )
        // setDeletedSuccessfully(true)
      } else {
        Library.showToast('The product was not deleted')
      }
    } catch (error) {
      console.error('Error deleting product:', error)
      Library.showToast('An error occurred while deleting the product')
    }

    setOpenModal(null)
  }

  return (
    <div className="text-center w-full mx-auto">
      <LayoutHeader>
        <TopNav links={topNav} />
        <div className="ml-auto flex items-center space-x-4">
          <Search />
          <ThemeSwitch />
          <UserNav />
        </div>
      </LayoutHeader>
      <ToastContainer containerId={'productAction'} />
      <h1 className="text-blue-900 text-xl">Our Products</h1>
      <div>{displayProduct()}</div>
    </div>
  )
}

export default Home
