import React, { useEffect, useState } from 'react'
import Popup from 'reactjs-popup'
import { TrashIcon } from 'lucide-react'
import styled from '@emotion/styled'
import ProductCard from '../../UserAndGuest/ProductCard.jsx'
import { ApiServices } from '../../../services/axiosServices.js'
import { Library } from '../../../Library/Library.jsx'
import 'react-toastify/dist/ReactToastify.css'
import { useAuth } from '../../../Context/GlobalState.jsx'

const ModalContainer = styled.div`
  font-size: 12px;
  opacity: 0;
  transform: scale(0.8);
  animation: ${(props) => (props.exit ? 'fadeOut' : 'fadeIn')} 0.7s ease
    forwards;

  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: scale(0.8);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes fadeOut {
    0% {
      opacity: 1;
      transform: scale(1);
    }
    100% {
      opacity: 0;
      transform: scale(0.8);
    }
  }
`

const Header = styled.div`
  width: 100%;
  border-bottom: 1px solid gray;
  font-size: 18px;
  text-align: center;
  padding: 5px;
`

const Content = styled.div`
  width: 100%;
  padding: 10px 5px;
`

const Actions = styled.div`
  width: 100%;
  padding: 10px 5px;
  margin: auto;
  text-align: center;
`

const CloseButton = styled.button`
  cursor: pointer;
  position: absolute;
  display: block;
  padding: 2px 5px;
  line-height: 20px;
  right: -10px;
  top: -10px;
  font-size: 24px;
  background: #ffffff;
  border-radius: 18px;
  border: 1px solid #cfcece;
`

export default function PopupDeleteProduct({ item }) {
  const [deletedSuccessfully, setDeletedSuccessfully] = useState(false)
  const { dispatch, products } = useAuth()
  const [isCancel, setIsCancel] = useState(false)

  const handleDeleteProduct = async () => {
    try {
      const response = await ApiServices.deleteProduct(item?.id)
      if (response.data === true) {
        dispatch({
          type: 'DELETE_PRODUCT',
          payload: {
            id: item.id,
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
        setDeletedSuccessfully(true)
      } else {
        Library.showToast('The product was not deleted')
      }
    } catch (error) {
      console.error('Error deleting product:', error)
      Library.showToast('An error occurred while deleting the product')
    }
  }

  useEffect(() => {
    setDeletedSuccessfully(false)
  }, [products])

  return (
    <Popup
      trigger={
        <button className="button delete-button p-1 mx-1 rounded-xl hover:bg-red-500">
          {' '}
          <TrashIcon size={'30px'} />{' '}
        </button>
      }
      modal
      closeOnDocumentClick
    >
      {(close) =>
        deletedSuccessfully ? (
          close()
        ) : (
          <ModalContainer
            exit={isCancel}
            className={`modal bg-red-400 ${!deletedSuccessfully ? 'open' : ''}`}
          >
            <CloseButton
              onClick={() => {
                setIsCancel(true)
              }}
            >
              &times;
            </CloseButton>
            <Header className="text-white font-bold text-xl mb-4">
              Confirm Deletion
            </Header>
            <Content className="flex justify-center">
              <ProductCard
                title={item.title}
                id={item.id}
                isSold={item.isSold}
                image={item.image}
                rating={item.rating}
                price={item.price}
                oldPrice={item.oldPrice}
                hiddenButton={true}
              />
            </Content>
            <Actions className="mt-6 flex space-x-4">
              <p className="text-white font-bold mb-2">
                Are you sure you want to delete this product?
              </p>
              <button className="button cancel-button" onClick={close}>
                Cancel
              </button>
              <button
                className="button delete-button"
                onClick={handleDeleteProduct}
              >
                Delete
              </button>
            </Actions>
            {deletedSuccessfully && close()}
          </ModalContainer>
        )
      }
    </Popup>
  )
}
