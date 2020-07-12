import React, { useEffect, useState } from 'react';
import axios from 'axios';

const getProductInfo = async (id) => {
  try {
    const response = await axios.get('https://prodcat.gopuff.com/api/products', {
      headers: { 'Access-Control-Allow-Origin': '*' },
      params: {
        location_id: '-1',
        product_id: `${id}`,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
};

const CartItem = ({ product, dispatch }) => {
  const { quantity, credit_coupon_price, discount, price, product_id } = product;

  const [productDetails, setProductDetails] = useState({ name: '', description: '', avatar: '' });

  useEffect(() => {
    getProductInfo(product_id).then((response) => {
      const { name, avatar } = response.data.products[0];
      setProductDetails({ name, avatar: avatar.medium });
    });
  }, [product_id]);

  return (
    <div>
      <img src={productDetails.avatar} alt={productDetails.name} />
      <div className="name">{productDetails.name}</div>
      <div className="quantity">{`Quantity: ${quantity}`}</div>
      <div className="price">{`$${credit_coupon_price} (orig. $${price})`}</div>
      <div className="total">{`total: $${credit_coupon_price * quantity}`}</div>
      <button
        onClick={() =>
          dispatch({
            type: 'REMOVE_PRODUCT',
            payload: product_id,
          })
        }
      >
        Delete Item
      </button>
      <hr />
    </div>
  );
};

export default CartItem;
