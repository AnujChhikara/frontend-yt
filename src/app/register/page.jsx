import Image from 'next/image'
import React from 'react'
import Input from '@/components/Input'

function page() {
  return (
    <main className='w-screen  flex justify-center pt-12'>
    <div className='w-3/5  h-[600px] flex justify-center  items-center'>
        <div className='bg-white rounded w-1/2 h-[700px] text-black flex px-12 flex-col space-y-8 justify-start items-start py-8'>
            <h3 className='font-bold text-3xl'>Registration</h3>
            <form className='flex flex-col space-y-6 ' action="">
                <Input name="fullName" placeholder="full name" type="text" />
                <Input name="email" placeholder="email" type="email" />
                <Input name="username" placeholder="username" type="text" />
                <Input name="password" placeholder="password" type="password" />
                <Input name="avatar" placeholder="avatar" type="file" />
                <Input name="coverImage" placeholder="cover image" type="file" />

                <button className='bg-black text-white hover:opacity-90 duration-500 px-4 py-4 rounded'>Register</button>
                <button className='border px-4 py-4 hover:bg-black rounded duration-500 hover:text-white'>Log in</button>
            </form>
        </div>
    
        <Image width={700} height={700} src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExOGlvNHExc2t2dGR1YW84eXFzank3azI4b3drYm1zYWZvNWx5OXE0ZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/wwg1suUiTbCY8H8vIA/giphy.gif" alt="matrix" />
     
        <div></div>

    </div></main>
  )
}

export default page