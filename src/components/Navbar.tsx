
'use client'

import { Button } from "@/components/ui/button"
import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux'
import {} from '@/store/userSlice'
import Navigation from './Navigation'
import { Clapperboard, ListVideo, Menu, MessageSquareQuote,History, ThumbsUp, Upload, Home } from 'lucide-react'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetDescription,
} from "@/components/ui/sheet"

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
    <div className='w-screen shadow-lg py-2 shadow-black'>
      <div className='flex justify-between items-center px-12 py-2'>
        <div className='flex space-x-4'>
       {user &&  <Sheet>
            <SheetTrigger><Menu /></SheetTrigger>
            <SheetContent side={'left'} className='w-60'>
              <SheetHeader>
                <SheetTitle className='pt-4 underline mb-8'>Welcome to Vidloom</SheetTitle>
                </SheetHeader>
          
                <SheetDescription className="flex flex-col space-y-4">
                <SheetClose asChild>
          
          <Link  href='/'>
           <Button className="flex w-48 pl-8 items-end justify-start text-start space-x-1"><Home size={20} /><p>Home Page</p></Button>
           </Link>
         </SheetClose>
              <SheetClose asChild>
          
              <Link href='/likedVideos'>
               <Button className="flex w-48 pl-8  items-end justify-start space-x-1"><ThumbsUp size={20} /><p>Like Videos</p></Button>
               </Link>
             </SheetClose>
             <SheetClose asChild>
              <Link href='/watchHistory'>
               <Button className="flex w-48 pl-8  items-end justify-start space-x-1"><History size={20}/><p>Watch History</p></Button>
               </Link>
               </SheetClose>
               <SheetClose asChild>
               <Link href='/'>
               <Button className="flex w-48 pl-8  items-end justify-start space-x-1"><ListVideo size={20} /><p>Your Playlists</p></Button>
               </Link>
               </SheetClose>
               <SheetClose asChild>
               <Link href='/myThoughts'>
               <Button className="flex w-48 pl-8   items-end justify-start space-x-1"><MessageSquareQuote size={20} /><p>Thoughts</p></Button>
               </Link>
               </SheetClose>
              
               </SheetDescription>
               </SheetContent>
          </Sheet>}
          <Link href='/'>
        <div className='flex justify-center items-center gap-1'>
        <Clapperboard/>
  
            <h1 className='font-semibold  text-2xl text-white'>Vidloom</h1>
        </div></Link>
        </div>
      
        
        
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