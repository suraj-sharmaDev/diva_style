import { RETRIEVE_CART, EMPTY_CART, 
  INC_ITEM, DEC_ITEM, 
  DISCOUNT, ADD_SERVICE, REMOVE_SERVICE, REMOVE_ALL_SERVICES } from '../actions/types';

const initialState = {
  shopId: 0,
  items: [],
  services: {},
  couponCode: '',
  discountAmount: 0,
  discountPercentage: 0,
  discountMinOrderAmount: 0,
  discountMaxAmount: 0,
  totalAmount: 0,
};

const onRetrieveCart = (state, data) => {
  let cart = data[0];
  let shopId = cart.shopId;
  let items = typeof cart.cartDetail != 'undefined' ? cart.cartDetail : cart.items;
  let services = state.services;
  let newState = {
    shopId: shopId,
    items: items,
    services: services,
    couponCode: '',
    discountAmount: 0,
    discountPercentage: 0,
    discountMinOrderAmount: 0,
    discountMaxAmount: 0,
    totalAmount: 0
  }
  return newState;
}

const onEmptyCart = () => {
  const initialState = {
    shopId: 0,
    items: [],
    services: {},
    couponCode: '',
    discountAmount: 0,
    discountPercentage: 0,
    discountMinOrderAmount: 0,
    discountMaxAmount: 0,
    totalAmount: 0,
  };
  return initialState;
}

const onDiscount = (state, data) => {
  let newState = { ...state };
  newState.couponCode = data.couponCode;
  newState.discountAmount = data.discountAmount;
  newState.discountPercentage = data.discountPercentage;
  newState.discountMinOrderAmount = data.minOrderAmount;
  newState.discountMaxAmount = data.maxDiscountAmount;
  return newState;
}

const onIncrement = (state, data) => {
  let newState = { ...state };
  if (newState.shopId === 0 && newState.items.length === 0) {
    //when new data is coming in
    newState.shopId = data.shopId;
    newState.shopDeliveryAvailability = data.deliveryAvail;
    newObj = {
      productId: data.productId,
      name: data.name,
      price: data.price,
      qty: 1,
      image: data.image,
    };
    newState.items.push(newObj);
  }
  else if (newState.shopId !== data.shopId) {
    //when customer add items from another shop
    newState.shopId = data.shopId;
    newState.shopDeliveryAvailability = data.deliveryAvail;
    newState.couponCode = '';
    newState.totalAmount = 0;
    newState.discountAmount = 0;
    newState.discountPercentage = 0;
    newState.discountMinOrderAmount = 0;
    newState.discountMaxAmount = 0;
    newState.items = [];
    newObj = {
      productId: data.productId,
      name: data.name,
      price: data.price,
      qty: 1,
      image: data.image,
    };
    newState.items.push(newObj);
  }
  else {
    //When data has already been added
    //from same shop
    index = newState.items.findIndex(obj => obj.productId === data.productId);
    if (index > -1) {
      newState.items[index].qty++;
      //also have to affect discount amount too
      if (newState.couponCode !== '') {
        let amount = 0;
        newState.items.map(s => {
          amount += s.price * s.qty;
        })
        if (amount > newState.discountMinOrderAmount) {
          discountAmount = amount * 0.01 * newState.discountPercentage;
          if (discountAmount > newState.discountMaxAmount) newState.discountAmount = newState.discountMaxAmount;
          else newState.discountAmount = Math.round(discountAmount);
        }
      }
    }
    else {
      newObj = {
        productId: data.productId,
        name: data.name,
        price: data.price,
        qty: 1,
        image: data.image
      };
      newState.items.push(newObj);
    }
  }
  return newState;
};
const onDecrement = (state, productId) => {
  let newState = { ...state };
  if (newState.items.length === 0) return state;
  index = newState.items.findIndex(obj => obj.productId === productId);
  if (newState.items[index].qty > 1) {
    newState.items[index].qty--;
    //also have to affect discount amount too
    if (newState.couponCode !== '') {
      let amount = 0;
      newState.items.map(s => {
        amount += s.price * s.qty;
      })
      if (amount > newState.discountMinOrderAmount) {
        discountAmount = amount * 0.01 * newState.discountPercentage;
        if (discountAmount > newState.discountMaxAmount) newState.discountAmount = newState.discountMaxAmount;
        else newState.discountAmount = Math.round(discountAmount);
      } else {
        newState.discountAmount = 0;
      }
    }
  } else {
    //if there are only one item in cart then empty full cart
    if (Object.keys(newState.items).length == 1) {
      newState.shopId = 0;
      newState.items = [];
      newState.couponCode = '';
      newState.totalAmount = 0;
      newState.discountAmount = 0;
      newState.discountPercentage = 0;
      newState.discountMinOrderAmount = 0;
      newState.discountMaxAmount = 0;
    } else {
      //if just this item's qty is equal to 1 then delete it from cart
      newState.items = newState.items.filter((d) => (d.productId != productId));
    }
  }
  return newState;
};

const onAddService = (state, data) => {
  let newState = { ...state };
  if(data.type === 'package'){
    newState.services = {};
    newState.services = data;
  }else if(data.type === 'repair'){
    // for repair
    newState.services = {};
    newState.services = data;
  }
  return newState;
}

const onRemoveService = (state, data) => {
  let newState = { ...state };
  if(data.type === 'package'){
    newState.services = {};
  }else{
    newState.services = {};
  }
  return newState;
}

const onRemoveAllServices = (state) => {
  let newState = { ...state };
  newState.services = {};
  return newState;
}

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case RETRIEVE_CART:
      return onRetrieveCart(state, action.payload);
    case EMPTY_CART:
      return onEmptyCart();
    case INC_ITEM:
      return onIncrement(state, action.payload);
    case DEC_ITEM:
      return onDecrement(state, action.payload);
    case DISCOUNT:
      return onDiscount(state, action.payload);
    case ADD_SERVICE:
      return onAddService(state, action.payload);
    case REMOVE_SERVICE:
      return onRemoveService(state, action.payload);
    case REMOVE_ALL_SERVICES:
      return onRemoveAllServices(state);
    default:
      return state;
  }
}

export default cartReducer;