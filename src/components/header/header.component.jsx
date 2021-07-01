import React,{useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {Form} from 'react-bootstrap'
import { ReactComponent as Logo } from '../../assets/crown.svg';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component.jsx';
import { selectCartHidden } from '../../redux/cart/cart.selectors.js';
import { setCurrentUser,setUserRole } from '../../redux/user/user.actions.js'
import { selectCurrentUser } from '../../redux/user/user.selector.js';
import { setCurrentJwt } from '../../redux/jwt/jwtActions'
import SearchBox from './SearchBox'
import {useHistory} from 'react-router-dom'
import './header.styles.scss';
function Header({ currentUser, hidden,setCurrentUser,setCurrentJwt,setUserRole }){
  const [searchbar,setSearchBar] = useState(false)
  const [searchdata,setSearchData] = useState('')
  const history = useHistory()
  useEffect(() =>{
    if(searchdata!==''){
      setSearchBar(true)
    }
    else{
      setSearchBar(false)
    }
  },[searchdata])
  function handleSearch(event) {
    let key = event.target.value;
    setSearchData(key);
  }
  return(
  <div className="header">
    
    <Link className="logo-container" to="/">
      <Logo className="logo" />
      
    </Link>
    
    <div className="options">
    <div className="searchbar">
      <Form.Control  type="text" size="lg" placeholder="Search" 
      className="search"
      value={searchdata}
      onChange = {handleSearch}
      />
      {searchbar?<SearchBox id="searchbox" setSearchBar={setSearchBar} setSearchData={setSearchData} searchData={searchdata} />:null}
    </div>
    
    <Link className="option" to="/shop/MEN"  
    onClick={
      (event)=>{
        history.push("/shop/MEN")
        window.location.reload() 
      
      }
      }>
        MEN
      </Link>
      <Link className="option" to="/shop/WOMEN"  onClick={
      (event)=>{
        history.push("/shop/WOMEN")
        window.location.reload() 
      
      }}>
        WOMEN
      </Link>
      <Link className="option" to="/shop"  onClick={
      (event)=>{
        history.push("/shop")
        window.location.reload() 
      
      }}>
        SHOP
      </Link>

      <Link className="option" to="/shop/new" onClick={
      (event)=>{
        history.push("/shop/new")
        window.location.reload() 
      
      }}>
        NEW ARRIVALS
      </Link>
      {currentUser ? (
        <>
        <div className="option" onClick={() => {
          setCurrentUser(null)
          setCurrentJwt(null)
          setUserRole(null)
        }
        }>
          SIGN OUT
        </div>
         <Link className="option" to="/Dashboard">
         DASH BOARD
       </Link>
       </>
      ) : (
        <Link className="option" to="/signin">
          SIGN IN
        </Link>
      )}
      <CartIcon />
    </div>
    {
        hidden ? null:
        <CartDropdown />
    }
  </div>
)}
const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  setCurrentJwt: jwt => dispatch(setCurrentJwt(jwt)),
  setUserRole: role => dispatch(setUserRole(role))
})
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
})

export default connect(mapStateToProps,mapDispatchToProps)(Header)