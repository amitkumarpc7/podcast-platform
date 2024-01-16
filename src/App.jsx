import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
// Components
import Profile from './pages/Profile'
import SignUpPage from './pages/SignUp'
import './App.css'

// FireBase 
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { setUser } from "./slices/userSlice";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function App() {
  
  const dispatch=useDispatch();
// To make sure authenticated user exists or not
  useEffect(()=>{
    const unSubscribeAuth=onAuthStateChanged(auth,(user)=>{
      if(user){
        const unSubscribeSnapshot=onSnapshot(
          doc(db,"users",uid),
          (userDoc)=>{
            if(userDoc.exists()){
              const userData=userDoc.data();
              dispatch(
                setUser({
                  name:userData.name,
                  email:user.email,
                  uid:user.uid,
                })
              );
            }
          },
          (error)=>{
            console.error("error fetching data",error);
          }
        );
        return ()=>{
          unSubscribeSnapshot();
        }
      }
    });
    return()=>{
      unSubscribeAuth();
    };

  },[])
  return (
    <div className='App'>
      <ToastContainer/>
      <Router>
        <Routes>
          <Route path='/' element={<SignUpPage/>}/>
          <Route path='/profile' element={<Profile/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
