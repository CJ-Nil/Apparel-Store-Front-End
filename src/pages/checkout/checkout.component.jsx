import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCartItems, selectCartTotal } from '../../redux/cart/cart.selectors'
import CheckoutItem from '../../components/checkout-item/checkout-item.component'
import { selectCurrentUser,selectUserRole } from '../../redux/user/user.selector.js';
import {selectCurrentJwt} from '../../redux/jwt/jwtSelector'
import './checkout.styles.scss';
import { BagCheck } from 'react-bootstrap-icons';
import axios from 'axios'
function CheckoutPage({cartItems, total,currentUser,userRole,currentJwt}){
function orderHandler(){
  const d=new Date()
  let dd=d.getFullYear()+"-"+d.getMonth()+"-"+d.getDate();
  cartItems.forEach(item => {
    const params={
      "cust_id":currentUser,
      "p_id":item.p_code,
      "price":item.price,
      "quantity":item.quantiy,
      "o_date":dd
    }
    axios.post("http://localhost:8080/addorder",params,{
      headers:{
        "Authentication":"Bearer "+currentJwt
      }
    })
    .then(respons=>{
      console.log(respons.data)
    })
    .catch(error=>{
      console.log(error)
    })
  });
}
return(
  <div className="checkout-page">
    <div className="checkout-header">
      <div className="header-block">
        <span>Product</span>
      </div>

      <div className="header-block">
        <span>Description</span>
      </div>

      <div className="header-block">
        <span>Quantity</span>
      </div>

      <div className="header-block">
        <span>Price</span>
      </div>

      <div className="header-block">
        <span>Remove</span>
      </div>
    </div>
    {
    cartItems.map(cartItem =>
        (<CheckoutItem key={cartItem.p_code} cartItem={cartItem}/>)
        )
    }
    <div className='total'>
        <span>TOTAL: &#8377; {total}</span>
    </div>
    <div className="pdp-addtocart-button" onClick={orderHandler} >
        <div className="btn-gold">
            <div className="btn-content">
                <div className="ic-pdp-add-cart">
                    <BagCheck  size={20} />
                </div>
                <div className="btn-txt">Place Order</div>
            </div>
            
        </div>
    </div>

  </div>
)};

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal,
    currentUser:selectCurrentUser,
    userRole:selectUserRole,
    currentJwt:selectCurrentJwt
})

export default connect(mapStateToProps)(CheckoutPage);