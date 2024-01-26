
import Product from'../Product.json'
export const TotalPrice = (basket) => {
  return basket?.reduce((amount, item) => {
    const product = Product.find((p)=>parseInt(p.id)===item.itemId)
    if(product)
    {
      console.log(product)
      return amount + product.price * item.quantity;
    }
  }, 0);
};

export const initialState = {
  user: null,
  basket: [],
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.user };
    case 'ADD_TO_BASKET':
      const newItem = action.item ;
      const itemIndex = state.basket.findIndex((item)=>item.itemId === newItem.itemId)

      if(itemIndex !== -1)
      {
        return {
          ...state ,
          basket: state.basket.map((item , index)=> index ===itemIndex?
           {...item , quantity : newItem.quantity} : item
          )
        }
      }else{
        return {
          ...state ,
          basket : [...state.basket , newItem]
        }
      }
    case 'SET_BASKET':
      return {
        ...state,
        basket :  action.payload
      };
    case 'EMPTY_BASKET':
      return {
        ...state,
        basket :[]
      };
    case 'REMOVE_ITEM_FROM_BASKET':
      const index = state.basket.findIndex((basketItem) => basketItem.id === action.id);
      let newBasket = [...state.basket];
      console.log("index " ,index)
      console.log("basket originale" ,state.basket)
      if(index >= 0 )
      {
        newBasket.splice(index, 1);

        console.log("the new basket is " ,newBasket)
      }else{
        console.warn('Basket item not found')
    }
      return {
        ...state,
        basket : newBasket
      }
    case "REMOVE_ALL_BASKET":
      return {
        ...state,
        basket: []
      }

    default:
      return state;
  }
};

export default AppReducer;
