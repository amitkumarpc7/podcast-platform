import React, { useState } from 'react'
import Header from '../components/common/Header/Header';
import SignupForm from '../components/SignUpComponents/SignUpForm/SignupForm';
import LoginForm from '../components/SignUpComponents/LoginForm/LoginForm';

const SignUpPage = () => {

  const [flag,setFlag]=useState(false);
  return (
    <div>
        <Header flag={flag} setFlag={setFlag}/>
        <div className='input-wrapper'>
            
            {!flag ?<h1>Signup</h1>:<h1>Login</h1>}
            {!flag ? <SignupForm/>:<LoginForm/>}
            {!flag ?
            (<p style={{cursor:"pointer"}} onClick={()=>setFlag(!flag)}>
              Already have an Account ? Login
            </p>):
            (<p style={{cursor:"pointer"}} onClick={()=>setFlag(!flag)}>
                Don't have an Account ? Signup
                </p>
            )}    
        </div>
    </div>
  )
}

export default SignUpPage;