
'use client'
import { Button } from '@/components/ui/button'
import { BadgeInfo, ListVideo, Youtube } from 'lucide-react'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { redirect } from 'next/navigation'

export default function ViewChannel() {
  const userData =  useSelector((state:any) => state.user)
    const user = userData.user[0] 
    
    if(!user) { 
      redirect('/')
    }
    else{

  return (
    <div className='w-screen flex justify-center items-center'>
    <div className='w-1/2 flex flex-col pt-4 justify-center items-center'>
      <div className='flex flex-col items-start space-y-8'>
      <div>
        <Image width={800} height={200} className='w-[800px] h-40 rounded-lg'  alt="banner" src={user.coverImage}/>
      </div>
      <div className='flex justify-start items-start space-x-4'>
        <Image width={200} height={200} className='rounded-full'  alt="banner" src={user.avatar}/>
        <div className='mt-4 space-y-2'><h4 className='font-bold text-4xl'>{user.fullName}</h4>
        <p className='text-gray-400 flex space-x-4 justify-center items-center'><div>@{user.username}</div> <div className='bg-gray-800 text-gray-300 px-2  rounded-2xl opacity-60'>11K Subscribers</div></p>
        <Button className=' rounded-2xl opacity-90' variant="outline">Subscribe</Button>
        </div>
      </div>
      
      
      </div>
      <hr className='border-gray-300 h-1 w-[800px] my-6' />
      <div className='flex flex-col ' >
      <Tabs defaultValue="account" className="w-[800px] ">
        <TabsList className='w-[800px] justify-around'>
          <TabsTrigger value="videos"> <button className='flex'><ListVideo />Videos</button> </TabsTrigger>
          <TabsTrigger value="playlist"><button className='flex'> <Youtube />Playlists</button> </TabsTrigger>
          <TabsTrigger value="info"><button className='flex'> <BadgeInfo />Info</button></TabsTrigger>
        </TabsList>
        <TabsContent value="videos">Make changes to your account here.</TabsContent>
        <TabsContent value="playlist">Change your password here.</TabsContent>
        <TabsContent value="info">Change your password here.</TabsContent>
      </Tabs>

       

      </div>
    </div></div>
  )
}}
