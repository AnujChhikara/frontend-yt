/* eslint-disable react/no-unescaped-entities */
'use client'
import React, { useState } from 'react'
import Input from '../../components/input'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { userActions } from '../../store/userSlice'
import { redirect } from 'next/navigation'
import { toast } from "sonner"

export default function LoginPage() {
    const [errorMsg, setErrorMessage] = useState('')
    const[isProcessing, setIsProcessing] = useState(false)
    const url = process.env.url
    const dispatch =  useDispatch()
    const[isLoggedIn, setIsLoggedIn] = useState(false)

  

    const handleFormSubmittion = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsProcessing(true)

        const fd = new FormData(event.currentTarget)
        const data =  Object.fromEntries(fd.entries())
        const userData = {
            email : data.email, 
            password: data.password,
            username:data.username
        
          }

        
        const response = await fetch(url +'/users/login',
        {
            method:"POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(userData)
        })

        if(response.ok){
            const res_data = await response.json()
            const data =res_data.data
            const userData = data.user

            // Store user data in local storage
            const currentTime = new Date().getTime();
            localStorage.setItem('user', JSON.stringify(userData));
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
            localStorage.setItem('timestamp',JSON.stringify(currentTime));
            

            dispatch(userActions.updateUser({
              username:userData.username,
                email:userData.email,
                avatar:userData.avatar,
                coverImage:userData.coverImage,
                fullName:userData.fullName,
                watchHistory: userData.watchHistory,
                accessToken: data.accessToken,
                refreshToken: data.refreshToken,
                id:userData._id
            }))

            setIsProcessing(false)
            setIsLoggedIn(true)
            toast("Login Successful", {
              description: 'User has been logged in successfully',
              action: {
                label: "Okay",
                onClick: () => console.log("Welcome back to the App"),
              },
            })
            
        }
        else{
            const error = await response.json()
            
            setErrorMessage(error.msg)
            setIsProcessing(false)
            setIsLoggedIn(false)
           
        }

    }
    
      if(isLoggedIn){
        
        redirect('/')
      } 
    
    
    return (
      <main className='w-screen  flex justify-center pt-8 '>
      <div className='flex bg-transparent px-4 py-4 border-gray-700 border rounded-xl  justify-center  items-center '>
          <div className=' rounded  text-white flex  md:px-12 sm:px-4 flex-col space-y-6 justify-center items-center'>
              <div className='flex flex-col items-center'>
                <h3 className='font-semibold text-3xl'>Welcome Back!
                </h3>
                <p className='text-[12px] text-gray-300'>Don't have account yet? <Link href='/register' className='font-bold underline '>Register</Link></p>
                {
                errorMsg? <p className='text-red-400 text-sm relative'>{errorMsg}</p>: <></>
              }
               {
                !errorMsg? <p className='text-red-400 text-sm relative'></p>: <></>
              }
                </div>
               
                
               
              <form className='flex flex-col space-y-6 ' onSubmit={handleFormSubmittion}>
                  <div className='flex flex-col space-y-4 '>
                  <Input  name="email" placeholder="email" type="email" />
                  <p className='text-center'>or</p>
                  </div>
                  
                  <Input name="username" placeholder="username" type="text" />

               
                  
                  <Input name="password" placeholder="password" type="password" required />
                  
                  <div className='flex flex-col justify-center items-center space-y-4 pt-6'>
                  {
                    isProcessing && <button className='bg-black animate-pulse opacity-90 w-72 text-white hover:opacity-90 duration-500 px-4 py-4 rounded'>Logging in...</button>
                  }
                  {
                    !isProcessing && <button className='bg-gray-900 w-72 border text-white  hover:bg-gray-700 duration-500 px-4 py-4 rounded'>Log in</button>
                  }
                  
                  </div>
              </form>
          </div>
      
         
  
      </div></main>
    )
  }