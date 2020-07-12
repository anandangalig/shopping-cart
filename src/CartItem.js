import React, { useReducer } from 'react';

const CartItem = ({ product, dispatch }) => {
  const {
    quantity,
    available_for_bonus,
    category_id,
    credit_coupon_price,
    discount,
    id,
    price,
    product_id,
  } = product;
  return <h1>{product_id}</h1>;
};

export default CartItem;
