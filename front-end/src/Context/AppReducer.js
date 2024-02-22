export const TotalPrice = (basket, Products) => {
  console.log(basket)
  return basket?.reduce((amount, item) => {
    const product = Products.find((p) => parseInt(p.id) === item.itemId)
    console.log(Products)
    if (product) {
      return amount + product.price * item.quantity
    }
  }, 0)
}

export const initialState = {
  user: null,
  basket: [],
  products: [],
}

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
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
                console.log('item', item.quantity, RemovedItem.quantity)
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
    case 'ADD_PRODUCT':
      return {
        ...state,
        products: [...state.products, action.payload.product],
      }
    case 'EDIT_PRODUCT':
      return {
        ...state,
        products: state.products.map((product) => {
          if (product.id === action.payload.id) {
            return {
              ...product,
              title: action.payload.product.title,
              description: action.payload.product.description,
              rating: action.payload.product.rating,
              price: action.payload.product.price,
              oldPrice: action.payload.product.oldPrice,
              isSold: action.payload.product.isSold,
              image: action.payload.product.image,
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

    default:
      return state
  }
}

export default AppReducer
