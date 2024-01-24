import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Await, useNavigate, useParams } from 'react-router-dom';
// Components
import Header from '../components/common/Header/Header';
import Input from '../components/common/Input/Input';
import FileInput from '../components/common/FileInput/FileInput';
import Button from '../components/common/Button/Button';
import { toast } from 'react-toastify';
// Firebase
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { auth, storage,db } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';

const CreateAnEpisode = () => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [audioFile, setAudioFile] = useState();

    const { id }=useParams();
    
    const[loading,setLoading]=useState(false);

    // to call actions from redux
    const dispatch= useDispatch();

    // To navigate to diff page
    const navigate=useNavigate();

    const audioFileHandle=(file)=>{
        setAudioFile(audioFile);
    }
    const handleSubmit=async()=>{
        setLoading(true);
        if(title,desc,audioFile,id){
            try{
                const audioRef=ref(storage,`podcast-episodes/${auth.currentUser.uid}/${Date.now()}`);
                await uploadBytes(audioRef,audioFile);

                const audioURL=await getDownloadURL(audioRef);
                const episodeData={
                    title:title,
                    description:desc,
                    audioFile:audioURL
                };
                await addDoc(collection(db,"podcasts",id,"episodes"),episodeData);
                toast.success("Episode Created succesfully");
                setLoading(false);
                navigate(`/podcasts/${id}`);
                
                setDesc("");
                setAudioFile(null);
                setTitle("");
            }
            catch(e){
                setLoading(false);
                console.log(e);
                toast.error(e.message);       
            }
        }
        else{
            // validate();
            setLoading(false);
        }
    }
    function validate(){
        if(!title){
          toast.error("Title is Required")
        }
        else if(!desc){
          toast.error("Please Write Description");
        }
        else if(!audioFile){
          toast.error("Please Select an Audio File");
        }
      }
  return (
    <div>
        <Header/>
            <div className="input-wrapper">
                <h1>Create an Episode</h1>
                <Input
                state={title}
                setState={setTitle}
                placeholder={"Title"}
                type={"text"}
                required={true}/>
                <Input
                state={desc}
                setState={setDesc}
                placeholder={"Description"}
                type={"text"}
                required={true}/>
                <FileInput
                accept={"audio/*"}
                id="audio-file-input"
                fileHandleFnc={audioFileHandle}
                text={"Upload audio File"}
                />
                <Button text={loading ? "Loading..":"Create Episode"}
                disabled={loading}
                onClick={handleSubmit} />
                    
            </div>
        
    </div>
  )
}



export default CreateAnEpisode