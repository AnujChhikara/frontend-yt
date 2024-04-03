import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    placeholder: string;
    name: string;
    type: string;
  }

 const Input: React.FC<InputProps> = ({ placeholder, name, type, ...props}) => {
  return (
    <div>
   <input {...props} type={type} placeholder={placeholder} name={name} id={name} className=' w-72 rounded-md h-10 px-4 py-2 bg-transparent border border-gray-200' />
   </div>
  )
}

export default Input