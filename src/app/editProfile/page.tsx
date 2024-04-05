'use client'

import { changeUserPassword, updateUserAccount } from '@/functions'
import { redirect } from 'next/navigation'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { userActions } from '@/store/userSlice'
 

export default function EditProfile() {
    const dispatch = useDispatch() 
    const userData =  useSelector((state:any) => state.user)
    const user = userData.user[0] 

    const [errorMsg, setErrorMessage] = useState('')
    const[isProcessing, setIsProcessing] = useState(false)

    const clearLocalStorage = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      };

      const logoutUser = () => {
        clearLocalStorage();
        dispatch(userActions.logoutUser({})
       
        )}

      if(!user) { 
        redirect('/')
      }
    
    const handleChangePasswordForm = async (event: React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault()

        const accessToken = user.accessToken
        const oldPassword = ''
        const newPassword = '1234'


       const response =  await changeUserPassword({accessToken,oldPassword, newPassword})
       if(response.status === true){
        logoutUser()
        
       
       }
       else{
        setErrorMessage(response.data)
       }  
    }

    const handleAccountDetailsForm = async (event: React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault()

        const accessToken = user.accessToken
        const fullName = 'TestUser 1'
        const email = 'TestUser1@email.com'


       const response =  await updateUserAccount({accessToken,fullName, email})
       if(response.status === true){
        logoutUser()
        
       
       
       }
       else{
        setErrorMessage(response.data)
       }  
    }
 
 
  
  return (
    <div className='pt-12 mx-20'>
        {/* change password */}
        <div>
        <Tabs defaultValue="account" className="w-[400px] ">
      <TabsList className="grid w-full grid-cols-2 bg-black">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      {errorMsg && <p className='text-center h-4 text-sm text-red-400'>{errorMsg}</p>}
      {!errorMsg && <p className='text-center h-4 text-sm text-red-400'></p>}
      <TabsContent value="account">
      <form onSubmit={handleAccountDetailsForm} className='space-y-2'>
        <Card className='bg-black'>
           
        
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you&apos;re done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
        
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input  id="name" defaultValue="Pedro Duarte" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input id="username" defaultValue="@peduarte" />
            </div>
            
          </CardContent>
          <CardFooter>
           
            <button className='bg-white text-black px-4 py-2 rounded-lg' type='submit'>Save changes</button>
          </CardFooter>
         
        </Card>
        </form>
      </TabsContent>
      <TabsContent value="password">
      <form onClick={handleChangePasswordForm} className='space-y-2'>
        <Card className='bg-black'>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you&apos;ll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
            
          </CardContent>
          <CardFooter>
          <button className='bg-white text-black px-4 py-2 rounded-lg text-sm font-bold' type='submit'>Save password</button>
          </CardFooter>
        </Card>
        </form>
      </TabsContent>
    </Tabs>
        </div>
    </div>
  )
}
