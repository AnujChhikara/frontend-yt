'use client'

import React from 'react'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import {
    Cloud,
    CreditCard,
    Github,
    Keyboard,
    LifeBuoy,
    LogOut,
    Mail,
    MessageSquare,
    Plus,
    PlusCircle,
    Settings,
    User,
    UserPlus,
    Users,
  } from "lucide-react" 
 
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar" 
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { healthCheck } from '@/functions'
import { userActions } from '@/store/userSlice'
import { toast } from "sonner"


export default function Navigation() {
    const dispatch = useDispatch()
    const userData =  useSelector((state:any) => state.user)
    const user = userData.user[0] 

    
    
    const clearLocalStorage = () => {
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    };
    const logoutUser = () => {

      toast("Logout Successful", {
        description: 'User has been logged out successfully',
        action: {
          label: "Okay",
          onClick: () => console.log("Welcome back to the App"),
        },
      })
      clearLocalStorage();
      dispatch(userActions.logoutUser({})
      )}



 
  return (
  <>
   <DropdownMenu>
      <DropdownMenuTrigger className='cursor-pointer' asChild>
        
        <Avatar>
        <AvatarImage src={user.avatar} />
        <AvatarFallback>AC</AvatarFallback>
        </Avatar>
       
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
        <Link href='/profile'> <DropdownMenuItem>
            
            <User className="mr-2 h-4 w-4" />
            <span className='text-[13px]'>{user.fullName}</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
           
            </DropdownMenuItem></Link>
          <DropdownMenuItem>
            <CreditCard className="mr-2 h-4 w-4" />
            <div 
            onClick={healthCheck}
            >Health Checkup
            </div>
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <Link href='/channelStats'>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Channel Stats</span>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <UserPlus className="mr-2 h-4 w-4" />
              <span>Invite users</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>
                  <Mail className="mr-2 h-4 w-4" />
                  <span>Email</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  <span>Message</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  <span>More...</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem>
            <Plus className="mr-2 h-4 w-4" />
            <span>Contact Me</span>
            <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        
        <DropdownMenuItem>
          <LifeBuoy className="mr-2 h-4 w-4" />
          <span>Support</span>
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          <Cloud className="mr-2 h-4 w-4" />
          <span>API</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
       <div className='flex justify-center items-center px-3'>
          <LogOut className="mr-2 h-4 w-4" />
          <AlertDialog>
        <AlertDialogTrigger className='py-1   font-bold text-[15px] rounded'>Log Out</AlertDialogTrigger>
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
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </div>
      </DropdownMenuContent>
    </DropdownMenu>
    

      
 
  </>)
}
