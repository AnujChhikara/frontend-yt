
'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux'
import {} from '@/store/userSlice'
import Navigation from './Navigation'
import { Clapperboard, Search, Upload } from 'lucide-react'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { redirect } from 'next/navigation'
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
    <div className='w-screen bg-gradient-to-r from-gray-700 via-gray-900 to-black'>
      <div className='flex justify-between px-20 pt-4 pb-3'>
       <Link href='/'>
        <div className='flex justify-center items-center gap-1'>
        <Clapperboard/>
  
            <h1 className='font-semibold  text-2xl text-white'>Vidloom</h1>
        </div></Link>
        <div className='flex justify-center items-center '>
        <div className=' flex items-center space-x-2 border-gray-400 border w-96 h-10 rounded-3xl'>
            <input type="text"
            placeholder='search..'
             className='bg-transparent px-3 py-1  w-80 h-10 rounded-3xl rounded-r-none ' />
             <button>
             <Search size={32} color="#6c6a6a" /></button>
        </div></div>
        <div className='flex justify-center items-center space-x-2 mr-10'>
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
           <div>
                <svg className='w-8' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="9" r="3" stroke="#FFCF81" strokeWidth="1.5"/>
                    <path d="M17.9691 20C17.81 17.1085 16.9247 15 11.9999 15C7.07521 15 6.18991 17.1085 6.03076 20" stroke="#FFCF81" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="#FFCF81" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
            </div>
            <Link href="/register">Register</Link>
            </>
          }
            
            
        </div>
    
    </div>
    </div>
  )
}

export default Navbar