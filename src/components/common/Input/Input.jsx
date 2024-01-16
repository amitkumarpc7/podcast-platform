import React from 'react'
import './Input.css'


const Input = ({type,state,setState,placeholder,required}) => {
  return <input 
  type={type} 
  value={state} 
  onChange={(e)=>setState(e.target.value)}
  placeholder={placeholder}
  required={required}
  className='custom-input'/>
}

export default Input