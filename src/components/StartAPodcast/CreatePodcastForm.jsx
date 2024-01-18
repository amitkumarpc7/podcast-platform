import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Input from '../common/Input/Input';
import Button from '../common/Button/Button';
import FileInput from '../common/FileInput/FileInput';
import { toast } from 'react-toastify';
import { auth, db, storage } from '../../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';

const CreatePodcastForm = () => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [displayImage, setDisplayImage] = useState("");
    const [bannerImage, setBannerImage] = useState("");
    const[loading,setLoading]=useState(false);
    // to call actions from redux
    const dispatch= useDispatch();
    // To navigate to diff page
    const navigate=useNavigate();

    const handleCreate=async ()=>{
      toast.success("Created Podcast"); 
      if(title && desc && displayImage && bannerImage){
        setLoading(true);
        try{

          // for storing in firebase and to get downloaded url
          const bannerImageRef=ref(storage,`podcasts/${auth.currentUser.uid}/${Date.now()}`);
          await uploadBytes(bannerImageRef,bannerImage);
          const bannerImageUrl=await getDownloadURL(bannerImageRef);

          const displayImageRef=ref(storage,`podcasts/${auth.currentUser.uid}/${Date.now()}`);
          await uploadBytes(displayImageRef,displayImage);
          const displayImageUrl=await getDownloadURL(displayImageRef);

          const podcastData=
          {
            title,
            description:desc,
            bannerImage:bannerImageUrl,
            displayImage:displayImageUrl,
            createdBy:auth.currentUser.uid,  
          }
          const docRef=await addDoc(collection(db,"podcasts"),podcastData);
          setTitle("");
          setDesc("");
          setBannerImage(null);
          setDisplayImage(null);
          toast.success("Podcast Created!");
          setLoading(false);

        }
        catch(e){
          toast.error(e.message);
          console.log(e);
          setLoading(false);
           
        }

      }
      else{
        toast.error("Please enter all values")
        setLoading(false);
      }
    }
    const displayImageHandle=(file)=>{
      setDisplayImage(file);
    }
    const bannerImageHandle=(file)=>{
      setBannerImage(file);
    }
  return (
    <div className='input-wrapper'>
        
        <Input
        state={title}
        setState={setTitle}
        type="text"
        placeholder="Title"
        required={true}/>
        <Input
        state={desc}
        setState={setDesc}
        type="text"
        placeholder="Description"
        required={true}/>

        <FileInput accept={"image/*"} 
        id="display-image-input"
        fileHandleFnc={displayImageHandle}
        text={"Display Image Upload"}/>

        <FileInput accept={"image/*"} 
        id="banner-image-input"
        fileHandleFnc={bannerImageHandle}
        text={"Banner Image Upload"}/>

        <Button text={loading?"Loading..":"Create Podcast"}
        disabled={loading}
        onClick={handleCreate} />
        

    </div>
  )
}

export default CreatePodcastForm