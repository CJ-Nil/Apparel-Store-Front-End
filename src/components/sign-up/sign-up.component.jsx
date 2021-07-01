import React from 'react';
import './sign-up.styles.scss';

import FormInput from '../form-input/form-input.component.jsx';
import CustomButton from '../custom-button/custom-button.component.jsx';
import axios from 'axios'


import './sign-up.styles.scss';

class SignUp extends React.Component{
    constructor(){
        super();

        this.state = {
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();

        const {email, password, confirmPassword } = this.state;

        if(password !== confirmPassword){
            alert("Passwords don't match")
            return;
        }
        const data={}
        data.username=email
        data.password=password
        axios.post("http://localhost:8080/adduser",data)
        .then(response=>{
            this.setState({email:'',password:'',confirmPassword:''})
            console.log(response.data)
            this.props.setToggle(true)
        }).catch(error=>{
          console.log(error)
        })
    }
    changeOption = () => {
      this.props.setToggle(true)
    }
    handleChange = event => {

        const {name, value} = event.target
        this.setState({[name]: value});
    }

    render(){
        const {displayName, email, password, confirmPassword } = this.state
        return (
          <div className="sign-up">
            <h2 className="title">I do not have an account</h2>
            <span>Sign up with your email and password</span>
            <form className="sign-up-form" onSubmit={this.handleSubmit}>
              {/*<FormInput
                type="text"
                name="displayName"
                value={displayName}
                onChange={this.handleChange}
                label="Display Name"
                required
              />*/}

              <FormInput
                type="email"
                name="email"
                value={email}
                onChange={this.handleChange}
                label="Email"
                required
              />

              <FormInput
                type="password"
                name="password"
                value={password}
                onChange={this.handleChange}
                label="Password"
                required
              />

              <FormInput
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={this.handleChange}
                label="Confirm Password"
                required
              />

              <CustomButton type='submit'>SIGN UP</CustomButton>
            </form>
            <br />
            <h5>Already have an account? <span style={{color:'blueviolet',cursor:'pointer'}} onClick={this.changeOption}>SignIn here</span></h5>
          </div>
        );
    }
}

export default SignUp;