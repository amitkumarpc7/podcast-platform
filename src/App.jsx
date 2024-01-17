import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
// Components
import Profile from './pages/Profile'
import SignUpPage from './pages/SignUp'
import './App.css'
import PrivateRoutes from "./components/common/PrivateRoutes";

// FireBase 
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { setUser } from "./slices/userSlice";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';





function App() {
  
  const dispatch=useDispatch();
  useEffect(() => {
    // onAuthStateChanged is used to listen for changes in the authentication state.
    // It takes two parameters: the authentication object (auth in this case) and a callback function.
    // The callback function is executed whenever the authentication state changes.
    // It receives the current user as an argument when the user is authenticated, and null when the user is signed out.
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        //You can listen to a document with the onSnapshot() method.
        //An initial call using the callback you provide
        //creates a document snapshot immediately with the current contents of the single document.
        //Then, each time the contents change, another call updates the document snapshot.
        const unsubscribeSnapshot = onSnapshot(
          doc(db, "users", user.uid),
          (userDoc) => {
            if (userDoc.exists()) {
              // Getting user's Data
              const userData = userDoc.data();

              // Storing data in redux
              dispatch(
                setUser({
                  name: userData.name,
                  email: userData.email,
                  uid: user.uid,
                })
              );
            }
          },
          // It is 3rd parameter of onSnapshot function
          (err) => {
            console.log("App-fetching user data", err);
          }
        );

        // Cleanup Code
        return () => {
          unsubscribeSnapshot();
        };
      }
    });

    // Cleanup Code
    return () => {
      unsubscribeAuth();
    };
  }, []);

 
  return (
    <div className='App'>
      <ToastContainer/>
      <Router>
        <Routes>
          <Route path='/' element={<SignUpPage/>}/>
          <Route element={<PrivateRoutes/>}/>
          <Route path='/profile' element={<Profile/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
