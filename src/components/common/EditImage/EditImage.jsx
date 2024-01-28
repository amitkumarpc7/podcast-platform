import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify';
import { db, storage } from '../../../firebase';
import { doc, getDoc } from 'firebase/firestore';


const EditImage = ({userId}) => {
  const[profImage,setProfImage]=useState(null);
  // const[imageUrl,setImageUrl]=useState('');
  const[loading,setLoading]=useState(false);

  // For image Uploading
  const handleUpload=async()=>{
    if(image){
      setLoading(true);
      const userDoc = await getDoc(doc(db, "users", uid));
      const userData = userDoc.data();

      try{
        const profRef=ref(storage,`userProfileImages/${uid}/${Date.now()}`);
        await uploadBytes(profRef,profImage);
        const profImageUrl=await getDownloadURL(profRef);

    //profImageUrl 
        setProfImage(null); 
        toast.success("Profile Picture Uploaded");
        setLoading(false);     
      }
      catch(e){
        console.log(e);
        toast.error(e.message);
        setLoading(false);

      }
    }
  }

  return (
    <div>EditImage</div>
  )
}

export default EditImage