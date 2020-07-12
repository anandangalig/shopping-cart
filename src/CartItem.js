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

const renderQuantityInput = ({ inputValue, product_id, setInputValue, dispatch }) => {
  const handleInputChange = (e) => setInputValue(Number(e.target.value));
  return (
    <form>
      <label htmlFor="quantity">Quantity: </label>
      <input
        className="form-control"
        type="input"
        name="quantity"
        value={inputValue}
        onChange={(e) => handleInputChange(e)}
      />
      <button
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          dispatch({
            type: 'UPDATE_QUANTITY',
            payload: { id: product_id, quantity: inputValue },
          });
        }}
      >
        update
      </button>
    </form>
  );
};

const CartItem = ({ product, dispatch }) => {
  const { quantity, credit_coupon_price, discount, price, product_id } = product;
  const [inputValue, setInputValue] = useState(quantity);
  console.log({ inputValue });
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
      <div className="price">{`$${credit_coupon_price} (orig. $${price})`}</div>
      <div className="quantity">
        {renderQuantityInput({ inputValue, product_id, dispatch, setInputValue })}
      </div>
      <div className="total">{`total: $${(credit_coupon_price * quantity).toFixed(2)}`}</div>
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
