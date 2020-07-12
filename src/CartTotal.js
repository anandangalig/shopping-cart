import React from 'react';

const CartTotal = ({ productsInCart }) => {
  const total = productsInCart.reduce((accum, product) => {
    accum += product.quantity * product.credit_coupon_price;
    return accum;
  }, 0);
  const subtotal = productsInCart.reduce((accum, product) => {
    accum += product.quantity * product.price;
    return accum;
  }, 0);
  const discount = productsInCart.reduce((accum, product) => {
    accum += product.discount;
    return accum;
  }, 0);

  return (
    <div style={{ margin: '2rem', position: 'fixed', right: 0, top: 0 }}>
      <h3>Subtotal: ${subtotal.toFixed(2)}</h3>
      <h3>Discount: ${discount.toFixed(2)}</h3>
      <hr />
      <h1>Grand total: ${total.toFixed(2)}</h1>
    </div>
  );
};

export default CartTotal;
