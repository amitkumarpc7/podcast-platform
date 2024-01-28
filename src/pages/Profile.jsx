import React from 'react'
import Header from '../components/common/Header/Header'
import { useSelector } from 'react-redux'
import Button from '../components/common/Button/Button';
import { toast } from 'react-toastify';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import Loader from '../components/common/Loader/Loader';

const Profile = () => {
    const user=useSelector((state)=>state.user.user);
    // console.log(user);

    if(!user){
      return <Loader/>
    }

    function handleLogout(){
      signOut(auth).then(() => {
        toast.success("User Logged out");
      }).catch((error) => {
      
      });
    }

  return (
    <div>
        <Header/>
        <h1>Name: {user.name}</h1>
        <h1>Email: {user.email}</h1>
        <h1>Uid: {user.uid}</h1>

        <Button text={"Logout"} onClick={handleLogout}/>
            
    </div>
    
  )
}

export default Profile