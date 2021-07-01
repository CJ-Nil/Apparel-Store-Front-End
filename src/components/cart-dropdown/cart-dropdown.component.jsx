import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from "reselect";
import { withRouter } from 'react-router-dom';

import CartItem from '../cart-item/cart-item.component';
import CustomButton from "../custom-button/custom-button.component.jsx";

import { selectCartItems } from "../../redux/cart/cart.selectors";
import { toggleCartHidden } from '../../redux/cart/cart.actions';
import { selectCurrentUser } from '../../redux/user/user.selector.js';
import './cart-dropdown.styles.scss';

const CartDropdown = ({ currentUser,cartItems, history, dispatch }) => (
    <div className='cart-dropdown'>
        {
            currentUser ?(<>
                <div className='cart-items'>
            {
                cartItems.length ? (
                cartItems.map(cartItem => (
                    <CartItem key={cartItem.p_code} item={cartItem}/> 
                ))
                ):(
                <span className='empty-message'>Your cart is empty</span>
                )}
        </div>
        <CustomButton 
            onClick={() => {
                history.push('/checkout');
                dispatch(toggleCartHidden())
            }}> 
            GO TO CHECKOUT 
        </CustomButton>
           </>) :<span className='empty-message'>Please SignIn first!!</span>
        }
        
    </div>
)

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    cartItems: selectCartItems
})
export default withRouter(connect(mapStateToProps)(CartDropdown));