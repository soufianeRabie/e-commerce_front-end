import { toast } from 'react-toastify'
import axiosConfig from '../services/axios.js'
import { ApiServices } from '../services/axiosServices.js'

export const Library = {
  showToast: (
    message,
    type = 'success',
    position = 'top-right',
    closeTime = 2000,
    bgColor = undefined,
    containerId = null,
  ) => {
    return toast(message, {
      type: type,
      position: position,
      autoClose: closeTime,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      style: {
        background: bgColor, // Change the background color here
        position: 'absolute',
      },
      containerId: containerId,
    })
  },
  addToBasket: async (user, id, dispatch, quantity) => {
    const response = await axiosConfig.post('/addToCart', {
      product_id: parseInt(id),
      user_id: user?.id || null,
      quantity: quantity === '' ? 1 : quantity ?? 1,
    })
    dispatch({
      type: 'ADD_TO_BASKET',
      item: {
        itemId: response.data.product_id,
        quantity: response.data.quantity,
      },
    })
  },
  removeFromBasket: async (user, id, dispatch, quantity) => {
    const response = await axiosConfig.post('/removeFromCart', {
      product_id: parseInt(id),
      user_id: user?.id || null,
      quantity: quantity === '' ? 1 : quantity ?? 1,
    })
    dispatch({
      type: 'REMOVE_ITEM_FROM_BASKET',
      item: {
        itemId: response.data.product.product_id,
        quantity: quantity === '' ? 1 : quantity,
      },
    })
  },
  fetchProduct: (dispatch) => {
    const fetchProducts = async () => {
      try {
        const response = await ApiServices.GetProducts()
        dispatch({
          type: 'SET_PRODUCTS',
          products: response.data.products,
        })
      } catch (error) {
        Library.showToast(
          'Error fetching products. Check your connection.',
          'error',
          'top-right',
          5000,
        )
        console.error(error)
      }
    }
    return fetchProducts()
  },
  setUser: (dispatch, responseUser) => {
    dispatch({
      type: 'SET_USER',
      user: responseUser.data,
    })
  },
}
