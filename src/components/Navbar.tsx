
'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userActions } from '@/store/userSlice'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { healthCheck } from '@/functions/indes'
import { toast } from "sonner"




function Navbar() {
  const userData =  useSelector((state:any) => state.user)
   const user = userData.user[0]   
   
   const dispatch = useDispatch()
  const logoutUser = () => {
    toast("Logout Successful", {
      description: 'User has been logged out successfully',
      action: {
        label: "Okay",
        onClick: () => console.log("Welcome back to the App"),
      },
    })
    dispatch(userActions.logoutUser({})
    
    )}
  return (
    <div className='flex   bg-zinc-900 justify-between  px-16 pt-4 pb-3'>
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
            
            
            <DropdownMenu>
              <DropdownMenuTrigger ><Avatar>
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>AC</AvatarFallback>
                  </Avatar></DropdownMenuTrigger>
              <DropdownMenuContent className='bg-gray-800 opacity-90 font-bold'>
                <DropdownMenuLabel>{user.username}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className='cursor-pointer '><Link href='/profile'>Profile</Link></DropdownMenuItem>
                <DropdownMenuItem className='cursor-pointer '>Channel Stats</DropdownMenuItem>
                
                <DropdownMenuItem className=' my-2 cursor-pointer   font-bold'><div 
                onClick={healthCheck}
                >Health Checkup</div></DropdownMenuItem>
                <AlertDialog>
                  <AlertDialogTrigger className='py-1  pl-3 font-bold text-[15px] rounded'>Log Out</AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                     
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction> <div onClick={logoutUser}>Continue</div></AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                
              </DropdownMenuContent>
            </DropdownMenu>
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
  )
}

export default Navbar