import React from 'react';

import './cart-item.styles.scss'
import { useHistory } from "react-router-dom";
function SearchItem({setSearchBar,setSearchData,item}){
  const history = useHistory();
  function handleClick(){
    setSearchBar(false)
    setSearchData('')
    history.push("/product/"+item.p_code)
  }
  return(
  <div className="cart-item" onClick={handleClick}>
    <img src={item.image_url} alt="cart item" />
    <div className="item-details">
      <span className="name">{item.p_name}</span>
      <span className="price">
        ${item.price}
    </span>
    </div>
  </div>
)};

export default SearchItem