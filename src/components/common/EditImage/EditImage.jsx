import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify';
import { db, storage } from '../../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import FileInput from '../FileInput/FileInput';


const EditImage = ({userId}) => {
  const[newImage,setnewImage]=useState(null);
  // const[imageUrl,setImageUrl]=useState('');
  const[loading,setLoading]=useState(false);

// for image handling
const onChange = (event) => {
  // Get the selected image
  const selectedImage = event.target.files[0]; 
// Update the image state
  setnewImage(selectedImage); 
};

  // For image Uploading
  const handleUpload=async()=>{
    if(image){
      setLoading(true);
      const userDoc = await getDoc(doc(db, "users", uid));
      const userData = userDoc.data();

      try{
        const profRef=ref(storage,`userProfileImages/${uid}/${Date.now()}`);
        await uploadBytes(profRef,newImage);
        const newImageUrl=await getDownloadURL(profRef);

       //newImageUrl 
        setnewImage(null); 
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
    <div>
       <label htmlFor="edit-image">Sure?.Click here</label>
      <input
        type="file"
        accept="image/*"
        id="edit-image"
        style={{ display: "none" }}
        onChange={onChange}
      />
    </div>
  )
}

export default EditImage