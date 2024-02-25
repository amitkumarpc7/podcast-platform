import React from 'react'
import './Header.css'
import { NavLink } from 'react-router-dom';
import {useAuthState} from "react-firebase-hooks/auth"
import { auth } from '../../../firebase';



const Header = () => {
  const [user]=useAuthState(auth);
  console.log("User is ",user)
    return (
      <div className='navbar'>
        <div className="gradient">
        </div>
        <div className="links">
          {!user && <NavLink to="/"> Signup </NavLink>}  
          <NavLink to="/podcasts">Podcasts</NavLink>
          <NavLink to="/create-a-podcast">Create Podcast</NavLink>
          <NavLink to="/profile">Profile</NavLink>
        </div>
        </div>
    );
  

};

export default Header