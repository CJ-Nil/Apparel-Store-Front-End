import React,{useState} from 'react';
import { connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { setCurrentUser, setUserRole } from '../../redux/user/user.actions.js'
import { selectCurrentUser } from '../../redux/user/user.selector.js';
import { setCurrentJwt } from '../../redux/jwt/jwtActions'
import {selectCurrentJwt} from '../../redux/jwt/jwtSelector'
import './sign-in.styles.scss';
import axios from 'axios'
function SignIn({currentUser,currentJwt,setCurrentUser,setUserRole,setCurrentJwt,setToggle}) {
  const [credentials,setCredentials] = useState({
    email: '',
    password: ''
  })
  function changeOption(){
    setToggle(false)
  }
  const handleSubmit = async event => {
      event.preventDefault();
      let details={
        "username":credentials.email,
        "password":credentials.password
      }
      console.log(details)
      axios.post('http://localhost:8080/authenticate',details)
        .then(response =>{
            const data = response.data
            console.log(data)
            setCredentials({
              email: '',
              password: ''
            })
            setCurrentUser(credentials.email)
            setCurrentJwt(data.jwt)
            setUserRole(data.role)
          console.log(currentJwt)
        })
        .catch(error =>{
            console.log(error)
        })
        
  }

  const handleChange = event => {
      const { value, name } = event.target;
      setCredentials({ 
        ...credentials,
        [name]: value 
      })
  }
  return (
    <div className="sign-in">
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          name="email"
          type="email"
          handleChange={handleChange}
          value={credentials.email}
          label="email"
          required
        />

        <FormInput
          name="password"
          type="password"
          value={credentials.password}
          handleChange={handleChange}
          label="password"
          required
        />
        <div className='buttons' >
          <CustomButton type="submit"> Sign In </CustomButton>
        </div> 
      </form>
      <br />
      <h5>New User? <span style={{color:'blueviolet',cursor:'pointer'}} onClick={changeOption}>Create Account</span></h5>
    </div>
  )
}
const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  setUserRole: role => dispatch(setUserRole(role)),
  setCurrentJwt: jwt => dispatch(setCurrentJwt(jwt))
})
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  currentJwt: selectCurrentJwt
})
export default connect(mapStateToProps,mapDispatchToProps)(SignIn)