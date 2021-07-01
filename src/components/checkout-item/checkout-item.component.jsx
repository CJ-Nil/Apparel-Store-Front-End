import React from 'react';
import { connect } from 'react-redux';
import { clearItemFromCart, addItem, removeItem } from '../../redux/cart/cart.actions.js'

import './checkout-item.styles.scss';
// import { removeItemFromCart } from '../../redux/cart/cart.utils.js';

const CheckoutItem = ({ cartItem, clearItem, addItem, removeItem }) => {
  return (
    <div className="checkout-item">
      <div className="image-container">
        <img src={cartItem.image_url} alt="item" />
      </div>
      <span className="name">{cartItem.p_name}</span>
      <span className="quantity">
        <div className="arrow" onClick={() => removeItem(cartItem)} >&#10094;</div>
        <span className="value">{cartItem.quantity}</span>
        <div className="arrow" onClick={() => addItem(cartItem)}>&#10095;</div>
      </span>
      <span className="price">&#8377; {cartItem.price}</span>
      <div className="remove-button" onClick={() => clearItem(cartItem)}>
        &#10005;
      </div>
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  clearItem: item => dispatch(clearItemFromCart(item)),
  addItem:  item => dispatch(addItem(item)),
  removeItem: item => dispatch(removeItem(item))
})

export default connect(null, mapDispatchToProps)(CheckoutItem)