import React from 'react';

const CartTotal = ({ productsInCart }) => {
  const total = productsInCart.reduce((accum, product) => {
    accum += product.quantity * product.credit_coupon_price;
    return accum;
  }, 0);

  return <h1>Grand total: ${total.toFixed(2)}</h1>;
};

export default CartTotal;
