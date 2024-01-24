import React from 'react'
import './Button.css'

const Button = ({text,onClick,disabled,style}) => {
  return <div 
  onClick={onClick} 
  className='custom-btn' 
  disabled={disabled}
  style={style}
  >{text}</div>;
}

export default Button