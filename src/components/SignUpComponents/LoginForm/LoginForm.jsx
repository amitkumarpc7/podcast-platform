import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// components import
import Input from '../../common/Input/Input'
import Button from '../../common/Button/Button';
import { setUser } from '../../../slices/userSlice';

// firebase imports
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import Loader from '../../common/Loader/Loader';



const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const[loading,setLoading]=useState(false);

    const dispatch=useDispatch();
    const navigate=useNavigate();

    const handleLogin=async()=>{
        console.log("Login");
        setLoading(true);

        if(email && password){
            try{

                // Creating account
                const userCredential=await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                );
                const user=userCredential.user;
    
                const userDoc=await getDoc(doc(db,"users",user.uid)); 
                const userData=userDoc.data();
                // console.log(userData);
    
               // save data in redux sending data to redux
                dispatch(
                    setUser({
                        name:userData.name,
                        email:user.email,
                        uid:user.uid,
                    })
                );
                toast.success("Login successful")
                navigate("/profile")
                setLoading(false);
            }
            catch(e){
                console.log("error",e);
                setLoading(false);
            }

        }
        else{
            try{
                if(!email){
                    toast.error("Please Enter Email Id");
                  }
                  else if(!email.includes("@")){
                    toast.error("Invalid Email Id")
                  }
                  else{
                    toast.error("Please Enter Password");
                  }
                  setLoading(false);
            }
            catch(e){
                console.log("Error",e);
                setLoading(false);
            }
        }
        


    }
  return (
    <div>
        <div className='input-wrapper'> 
                <Input
                state={email}
                setState={setEmail}
                type="text"
                placeholder="Email"
                required={true}/>
                <Input
                state={password}
                setState={setPassword}
                type="password"
                placeholder="Password"
                required={true}/>
                <Button text={loading?<Loader/>:"Login"} disabled={loading} onClick={handleLogin}/>
        </div>
    </div>
  )
}

export default LoginForm