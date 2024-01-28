import React from 'react'
import { useState } from 'react';
import {useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom';

// Component Imports
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import { setUser } from '../../../slices/userSlice';

// firebase imports
import { createUserWithEmailAndPassword} from "firebase/auth";
import {db,auth,storage} from "../../../firebase"
import { doc, setDoc } from 'firebase/firestore';

import { toast } from 'react-toastify';
import Loader from '../../common/Loader/Loader';
import FileInput from '../../common/FileInput/FileInput';

const SignupForm = () => {
    const [fullName, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const[profImage,setProfImage]=useState("");
    const[coverImage,setCoverImage]=useState("");


    const[loading,setLoading]=useState(false);

    // to call actions from redux
    const dispatch= useDispatch();

    // To navigate to diff page
    const navigate=useNavigate();

    // to upload Profile picture
    const handleProfileImage=(file)=>{
        setProfImage(file);
    }
    const handleCoverImage=(file)=>{
        setCoverImage(file);
    }

    // Creating signUp functionality
    const handleSignup=async()=>{
        console.log("Signup done");
        setLoading(true);
        if(password.length>=6 && password==confirmPassword && fullName && email){
            try{

                // Creating account
                const userCredential=await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );
                const user=userCredential.user;

                // storing users in database
                // db->database users->name of collection 
                await setDoc(doc(db,"users",user.uid),
                {
                    name:fullName,
                    email:user.email,
                    uid:user.uid,

                });

                // save data in redux sending data to redux
                dispatch(
                    setUser({
                        name:fullName,
                        email:user.email,
                        uid:user.uid,
                    })
                );
                navigate("/profile");
                toast.success("User created");
                setLoading(false)
                
            }
            catch(e){
                // console.log("error",e);
                toast.error(e.message);
                setLoading(false);
            }
        }
        else{
            if(password!== confirmPassword){
                toast.error("Password mismatch");
            }
            else if(password.length<=6){
                toast.error("Password must be atleast 6 characters");
            }
        }
        setLoading(false);
    }

    return (
     <div>
            <div className='input-wrapper'> 
                <Input
                state={fullName}
                setState={setFullname}
                type="text"
                placeholder="Full Name"
                required={true}/>
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
                <Input
                state={confirmPassword}
                setState={setConfirmPassword}
                type="Password"
                placeholder="Confirm Password"
                required={true}/>
                <FileInput
                accept={"image/*"}
                id={"profile-image"}
                text="Upload Profile Picture"
                fileHandleFnc={handleProfileImage}/>
                <FileInput
                accept={"image/*"}
                id={"cover-image"}
                text={"Profile Cover Image"}
                fileHandleFnc={handleCoverImage}/>
                <Button
                text={loading ? <Loader/>:"Signup"}
                disabled={loading} 
                onClick={handleSignup}/>
        </div>
    </div>
  )
}

export default SignupForm