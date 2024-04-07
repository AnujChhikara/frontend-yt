
'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux'
import {} from '@/store/userSlice'
import Navigation from './Navigation'
import { Clapperboard, MessageSquareQuote, Upload } from 'lucide-react'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { userActions } from '../store/userSlice';



function Navbar() {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      const storedAccessToken = localStorage.getItem('accessToken');
      const storedRefreshToken = localStorage.getItem('refreshToken');

      // Initialize Redux state with stored user data
      dispatch(userActions.updateUser({
        username: parsedUser.username,
        email: parsedUser.email,
        avatar: parsedUser.avatar,
        coverImage: parsedUser.coverImage,
        fullName: parsedUser.fullName,
        watchHistory: parsedUser.watchHistory,
        accessToken: storedAccessToken,
        refreshToken: storedRefreshToken,
        id: parsedUser._id
      }));
    }
  }, [dispatch]);

  const userData =  useSelector((state:any) => state.user)
  const user = userData.user[0]  
  

 

 
  return (
    <div>
    <div className='w-screen main bg-gradient-to-r from-gray-700 via-gray-900 to-black'>
      <div className='flex justify-between items-center px-12 py-2'>
       <Link href='/'>
        <div className='flex justify-center items-center gap-1'>
        <Clapperboard/>
  
            <h1 className='font-semibold  text-2xl text-white'>Vidloom</h1>
        </div></Link>
        
        
        <div className='flex justify-center items-center space-x-2 '>
        
          {
            user && <>
                 <Navigation/>
                 <HoverCard >
                   <div>
                    <HoverCardTrigger asChild  >
                      <Link href='/videoUpload'>
                    <div className='pl-8 ' >
                     
                      <Upload />

                    </div></Link>
                    </HoverCardTrigger></div>
                    <HoverCardContent className='bg-black text-sm border-none w-40'>
                      Upload your video
                    </HoverCardContent>
                  </HoverCard>
                
            </>
          }
          {
            !user && <>
            <Link className='font-semibold pr-4' href='/login'>Log In</Link>
            <Link className=' font-semibold mt-3' href="/register"><button className="inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white">
                <span className=" px-3 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Register
                </span>
                </button></Link>
            </>
          }
            
            
        </div>
    
    </div>
    </div>
    
    </div>
  )
}

export default Navbar