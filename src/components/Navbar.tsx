
'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


function Navbar() {
  const userData =  useSelector((state:any) => state.user)
   const user = userData.user[0]   
   console.log(user)
  return (
    <div className='flex justify-between items-center px-20 pt-8 pb-12'>
       <Link href='/'>
        <div className='flex justify-center items-center'>
          <Image width={40} height={20} src="https://www.svgrepo.com/show/448261/youtube.svg" alt="logo"/>


            <h1 className='font-semibold  text-2xl text-white'>Vidloom</h1>
        </div></Link>
        <div className='flex justify-center items-center '>
        <div className=' flex items-center space-x-2 border-gray-400 border w-96 h-10 rounded-3xl'>
            <input type="text"
            placeholder='search..'
             className='bg-transparent px-3 py-1  w-80 h-10 rounded-3xl rounded-r-none ' />
             <button>
             <svg className='h-8' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.1" d="M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" fill="#323232"/>
                <path d="M15 15L21 21" stroke="#BBBBBB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="#BBBBBB" strokeWidth="2"/>
                </svg></button>
        </div></div>
        <div className='flex justify-center items-center space-x-2'>
          {
            user && <>
            <Avatar>
        <AvatarImage src={user.avatar} />
        <AvatarFallback>AC</AvatarFallback>
        </Avatar>
            <h4>{user.fullName}</h4>
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
            <Link href="/register">Sign In</Link>
            </>
          }
            
            
        </div>
    </div>
  )
}

export default Navbar