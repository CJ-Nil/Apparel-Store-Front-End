import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component'
import CheckoutPage from './pages/checkout/checkout.component'
import AdminPanel from './pages/Admin/AdminPanel.js'
import Product from './components/product/product'
import SignInAndSignUp from './pages/sign-in-sign-up/sign-in-sign-up.component'
import Header from './components/header/header.component'

import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selector';

import "./App.css";

function App(props) {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop/:id" children={<ShopPage />} />
        <Route exact path='/checkout' component={CheckoutPage} />
        <Route exact path='/shop' component={ShopPage} />
        <Route exact path='/Dashboard' component={AdminPanel} />
        <Route path="/product/:id" children={<Product />} />
        <Route 
        exact
        path="/signin" 
        render={() => 
          props.currentUser ? (

            <Redirect to='/' />
            ) : (
              <SignInAndSignUp/>
              )
            } 
          />
      </Switch>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
}) 

const mapDispatchToProps = dispatch =>({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
