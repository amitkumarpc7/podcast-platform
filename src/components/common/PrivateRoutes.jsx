import React from 'react'

import {useAuthState} from "react-firebase-hooks/auth";
import { Outlet,Navigate } from 'react-router-dom';
import { auth } from '../../firebase';


// Created Private route to protect app from unauthorized access.
const PrivateRoutes = () => {
  const[user,loading,error]=useAuthState(auth);

  console.log("Private route->",user,loading,error);

  if(loading){
    return<p>Loading...</p>
  }
  else if(!user || error){
    return <Navigate to="/" replace />
  }
  else{
    return <Outlet/>
  }
};

export default PrivateRoutes