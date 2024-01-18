import React, { useState } from 'react'
import "./FileInput.css"

const FileInput = ({accept,id,fileHandleFnc,text}) => {
    // Used to handle file selection events
    const[fileSelected,setFileSelected]=useState("");

    const onChange=(e)=>{
        console.log(e.target.files);
        setFileSelected(e.target.files[0].name);
        fileHandleFnc(e.target.files[0]);

    }
  return ( 
    <div>
        <label htmlFor={id} className={`custom-input diff-border ${!fileSelected ? "label-input":"active"}`}>
            {fileSelected ? `File ${fileSelected} was selected`:text}
        </label>
        <input type='file' 
        accept={accept} 
        id={id} 
        style={{display:"none"}}
        onChange={onChange}/>

    </div>
  )
}

export default FileInput