'use client'
import React, { useState } from 'react'
import Input from '@/components/Input'
import Image from 'next/image'
import Link from 'next/link'


export default function LoginPage() {
    const [errorMsg, setErrorMessage] = useState('')

    const handleFormSubmittion = async (event) => {
        event.preventDefault()

        const fd = new FormData(event.target)
        const data =  Object.fromEntries(fd.entries())
        const userData = {
            email : data.email, 
            password: data.password,
            username:data.username
        
          }
        
        const response = await fetch('http://localhost:8000/api/v1/users/login',
        {
            method:"POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(userData)
        })

        if(response.ok){
            const res_data = await response.json()
            const userData =res_data.data
            window.location.href = '/';
        }
        else{
            const error = await response.json()
            setErrorMessage(error.msg)
        }
    }

    
    return (
      <main className='w-screen  flex justify-center pt-12'>
      <div className='w-3/5  h-[600px] flex justify-center  items-center '>
          <div className='bg-white rounded w-1/2 h-[500px] text-black flex px-12 flex-col space-y-8 justify-center items-start'>
              <div>
                <h3 className='font-bold text-3xl'>Login
                </h3>
                {
                errorMsg? <p className='text-red-400 text-sm absolute'>{errorMsg}</p>: <></>
              }
                
                </div>
             
              <form className='flex flex-col space-y-6 ' onSubmit={handleFormSubmittion}>
                  
                  <Input name="email" placeholder="email" type="email" />
                  <div className='text-center text-gray-600 font-bold'>or</div>
                  <Input name="username" placeholder="username" type="text" />
                  <Input name="password" placeholder="password" type="password" required />
                  
  
                  <button className='bg-black text-white hover:opacity-90 duration-500 px-4 py-4 rounded'>Log in</button>
                  <Link href='/register' className='border text-center px-4 py-4 hover:bg-green-300 rounded duration-500 '>Register</Link>
              </form>
          </div>
      
          <Image unoptimized className='rounded-xl' width={500} height={400} src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExbHZhYXFud3M3OTVtbjFha292OGl1bDdzdG5ybHZvYnQ5aWppcXkzZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IcZhFmufozDCij3p22/giphy.gif" alt="matrix" />
       
          <div></div>
  
      </div></main>
    )
  }
