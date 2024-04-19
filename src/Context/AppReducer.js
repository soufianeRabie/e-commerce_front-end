export const TotalPrice = (basket, Products) => {
  return basket?.reduce((amount, item) => {
    const product = Products.find((p) => parseInt(p.id) === item.itemId)
    if (product) {
      return amount + product.price * item.quantity
    }
  }, 0)
}

export const initialState = {
  user: null,
  basket: [],
  products: [],
  orders: null,
  deliveries: [],
  complaints: [],
  statistics: null,
  online_orders: [],
}

const AppReducer = (state = initialState, action) => {
  console.log('action ', action)
  switch (action?.type) {
    case 'SET_USER':
      return { ...state, user: action.user }
    case 'ADD_TO_BASKET':
      const newItem = action.item
      const itemIndex = state.basket.findIndex(
        (item) => item.itemId === newItem.itemId,
      )

      if (itemIndex !== -1) {
        return {
          ...state,
          basket: state.basket.map((item, index) =>
            index === itemIndex
              ? { ...item, quantity: newItem.quantity }
              : item,
          ),
        }
      } else {
        return {
          ...state,
          basket: [...state.basket, newItem],
        }
      }
    case 'SET_BASKET':
      return {
        ...state,
        basket: action.payload,
      }
    case 'EMPTY_BASKET':
      return {
        ...state,
        basket: [],
      }
    case 'REMOVE_ITEM_FROM_BASKET':
      const RemovedItem = action.item
      const indexItem = state.basket.findIndex(
        (item) => item.itemId === RemovedItem.itemId,
      )
      if (indexItem !== -1) {
        return {
          ...state,
          basket: state.basket
            .map((item, index) => {
              if (
                (index === indexItem && parseInt(item.quantity) === 1) ||
                (index === indexItem &&
                  parseInt(RemovedItem.quantity) >= parseInt(item.quantity))
              ) {
                return null
              } else if (index !== indexItem) {
                return item
              } else {
                return {
                  ...item,
                  quantity: item.quantity - RemovedItem.quantity,
                }
              }
            })
            .filter((item) => item !== null),
        }
      } else {
        return state
      }
    case 'REMOVE_ALL_BASKET':
      return {
        ...state,
        basket: [],
      }
    case 'SET_PRODUCTS':
      return {
        ...state,
        products: action.products ?? [],
      }
    case 'SET_STATISTICS':
      return {
        ...state,
        statistics: action.statistics ?? [],
      }
    case 'SET_ONLINE_ORDERS':
      return {
        ...state,
        online_orders: action.online_orders ?? [],
      }
    case 'ADD_PRODUCT':
      console.log(action?.payload?.product)
      return {
        ...state,
        products: [action.payload.product, ...state.products],
      }
    case 'EDIT_PRODUCT':
      const editedProduct = action.payload.product

      return {
        ...state,
        products: state.products.map((product) => {
          if (product.id === action.payload.id) {
            return {
              ...product,
              title: editedProduct?.title,
              quantity: editedProduct?.quantity,
              description: editedProduct?.description,
              rating: editedProduct?.rating,
              price: editedProduct?.price,
              oldPrice: editedProduct?.oldPrice,
              isSold: editedProduct?.isSold,
              category: editedProduct?.category,
              images: editedProduct?.images,
              image: '',
            }
          } else {
            return product
          }
        }),
      }
    case 'DELETE_PRODUCT':
      return {
        ...state,
        products: state.products.filter((product) => {
          return product.id !== action.payload.id
        }),
      }
    case 'DELETE_ORDER':
      return {
        ...state,
        orders: state.orders.filter((order) => {
          return order.id !== action.payload.id
        }),
      }
    case 'DELETE_COMPLAINT':
      return {
        ...state,
        complaints: state.complaints.filter((complaint) => {
          return complaint.id !== action.payload.id
        }),
      }
    case 'DELETE_DELIVERY':
      return {
        ...state,
        deliveries: state.deliveries.filter((delivery) => {
          return delivery.id !== action.payload.id
        }),
      }
    // case 'UPDATE_PRODUCT_QUANTITY':
    //   return {
    //     ...state,
    //     products: state.products.map((product) =>
    //       product.id === action.payload.id
    //         ? { ...product, quantity: product.quantity }
    //         : product,
    //     ),
    //   }

    case 'SET_ORDERS':
      return {
        ...state,
        orders: action.orders,
      }
    case 'SET_DELIVERIES':
      return {
        ...state,
        deliveries: action.deliveries,
      }
    case 'SET_COMPLAINTS':
      return {
        ...state,
        complaints: action.complaints,
      }

    case 'UPDATE_ORDER_STATUS':
      return {
        ...state,
        orders: state.orders.map((order) =>
          order.id === action.payload.id
            ? { ...order, status: action.payload.status }
            : order,
        ),
      }
    case 'UPDATE_DELIVERY_STATUS':
      return {
        ...state,
        deliveries: state.deliveries.map((delivery) =>
          delivery.id === action.payload.id
            ? { ...delivery, status: action.payload.status }
            : delivery,
        ),
      }

    default:
      return state
  }
}

export default AppReducer
