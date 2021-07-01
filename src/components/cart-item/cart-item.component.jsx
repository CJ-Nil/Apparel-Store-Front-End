import React from 'react';

import './cart-item.styles.scss'

const CartItem = ({item}) => (
  <div className="cart-item">
    <img src={item.image_url} alt="cart item" />
    <div className="item-details">
      <span className="name">{item.p_name}</span>
      <span className="price">
        {item.quantity} x ${item.price}
    </span>
    </div>
  </div>
);

export default CartItem