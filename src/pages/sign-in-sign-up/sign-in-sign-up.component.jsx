import React,{useState} from 'react';

import SignIn from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up.component';

import './sign-in-sign-up.styles.scss';

function SignInAndSignUp(){
    const [toggle,setToggle] = useState(true)
    return (
    <div className='sign-in-and-sign-up'>
        {toggle?<SignIn setToggle={setToggle}  />:<SignUp setToggle={setToggle}  />}
    </div>
)};

export default SignInAndSignUp;
