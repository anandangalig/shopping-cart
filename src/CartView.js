import React, { useReducer, useEffect } from 'react';
import axios from 'axios';
import CartItem from './CartItem.js';
import CartTotal from './CartTotal.js';
import './CartView.css';

const getInitialData = async () => {
  try {
    const response = await axios.get(
      'https://gopuff-public.s3.amazonaws.com/dev-assignments/product/order.json',
      { headers: { 'Access-Control-Allow-Origin': '*' } },
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const productsInCartReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_DATA':
      return [...action.payload];
    case 'UPDATE_QUANTITY':
      return state.map((product) => {
        if (product.id === action.payload.id) {
          return { ...product, quantity: action.payload.quantity };
        } else {
          return product;
        }
      });
    case 'REMOVE_PRODUCT':
      return state.filter((product) => {
        return product.id !== action.payload;
      });
    default:
      return state;
  }
};

const CartView = () => {
  const [productsInCart, dispatch] = useReducer(productsInCartReducer, []);
  useEffect(() => {
    getInitialData().then((response) => {
      dispatch({
        type: 'LOAD_DATA',
        payload: response.cart.products,
      });
    });
  }, []);

  return (
    <div className="cartViewContainer">
      <div className="cartItemsList">
        {productsInCart.map((product) => (
          <CartItem product={product} dispatch={dispatch} key={product.id} />
        ))}
      </div>
      <CartTotal className="cartTotal" productsInCart={productsInCart} />
    </div>
  );
};
export default CartView;
