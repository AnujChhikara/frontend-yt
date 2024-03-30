import React from 'react'

function Input({ placeholder, name, type, ...props}) {
  return (
    <div>
   <input {...props} type={type} placeholder={placeholder} name={name} id={name} className=' w-80 rounded-md h-10 px-4 py-2 bg-transparent border border-gray-200' />
   </div>
  )
}

export default Input