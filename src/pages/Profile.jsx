import React from 'react'
import { useSelector } from 'react-redux'
import Header from '../components/common/Header/Header';

const Profile = () => {
    // state refers to global state .user->userSLice .user->user
    const user=useSelector((state)=>state.user.user);

    if(user){
      return<p>Loading...</p>
    }

  return (
    <div>
        <Header/>
        <h1>Name : {user.name}</h1>
        <h1>Email : {user.email}</h1>
        <h1>Uid : {user.uid}</h1>
    </div>

  )
    
  
}

export default Profile