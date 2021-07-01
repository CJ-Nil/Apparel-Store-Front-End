import React from 'react';

import CustomButton from '../custom-button/custom-button.component.jsx';
import { addItem }from '../../redux/cart/cart.actions.js';
import { selectCurrentUser } from '../../redux/user/user.selector.js';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import './collection-item.styles.scss';
import { useHistory } from "react-router-dom";

function CollectionItem({item, addItem,currentUser}){
    const history = useHistory();
    function addItemHandler(){
      if(currentUser !== null)
      addItem(item)
      else{
        history.push("/signin")
        console.log("Please sign in first !")
      } 
    }
    function handleClick(){
      history.push("/product/"+item.p_code)
    }
    return (
      <div className="collection-item">
        <div
          className="image"
          onClick={handleClick}
        >
          <img 
          className="imagetag"
          src={item.image_url} alt={item.p_name} />
        </div>
        <div className="collection-footer">
          <span className="name"> {item.p_name} </span>
          <span className="price"> &#8377;{item.price} </span>
        </div>

        <CustomButton onClick={ () => addItemHandler()} >Add to cart</CustomButton>
      </div>
    );
}

const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(addItem(item))
})
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})
export default connect(mapStateToProps, mapDispatchToProps) (CollectionItem);