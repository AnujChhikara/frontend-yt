import Image from 'next/image'
import React from 'react'

export default function PlaylistCard({owner, name, description}) {
  
  return (
    <div className=''>
      <div className=''>
       <Image width={100} height={100} className='w-60 h-40 rounded-xl  ' src='https://images.unsplash.com/photo-1470019693664-1d202d2c0907?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG11c2ljJTIwcGFseWxpc3R8ZW58MHx8MHx8fDA%3D' alt='playlist thumbnail'/>
       </div>
        <div className='flex flex-col space-y-1 '>
        <div className='font-semibold text-xl'>{name}</div>
        <div>{description}</div>
        <p className='text-gray-400'>by {owner}</p>
        </div>
        
    </div>
  )
}
