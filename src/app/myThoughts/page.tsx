'use client'

import { Plus } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { getAllTweets } from '@/functions'
import { useSelector } from 'react-redux'
import { redirect } from 'next/navigation'
import { Textarea } from '@/components/ui/textarea'
import Tweets from '@/components/Tweets'


export default function MyThoughts() {
  const [allTweets, setAllTweets] = useState<any>([])
 const buttonRef = useRef<HTMLButtonElement>(null)
  const data =  useSelector((state:any) => state.user)
  const user = data.user[0] 

  if(!user) {
      redirect('/')
  } 

  useEffect(()=> {
    const getTweets = async() => {
      const response = await getAllTweets({accessToken:user.accessToken})
      if(response.status === true){
        const res_data = response.data
        setAllTweets(res_data.data)
      }
      else{
        console.log(response.data)
      }
    }
    getTweets()
  }, [user])


   const handleFormSubmittion = async (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const fd = new FormData(event.currentTarget)
        const data =  Object.fromEntries(fd.entries())
        const tweet = {
          tweet:data.tweet
        }

        const response = await fetch(process.env.url+'/tweets', {
          method:"POST",
         
            headers:{
              'Authorization': `Bearer ${user.accessToken}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(tweet)
          
        })

        if(response.ok) {
          const res_data = await response.json()
          buttonRef.current?.click()
          console.log(res_data)
        }
        else{
          const error = await response.json()
          console.log(error)

        }
   }
  console.log(allTweets)
  return (
    <div className='flex h-screen flex-col pt-8 space-y-8 justify-start items-center'>
      <h1 className='text-6xl font-bold'>The conversation starts here</h1>
      <h2 className='text-gray-300'>Join the platform for Web enthusiasts and access the latest discussions, news, and insights.</h2>

      <div></div>
      <div className='flex flex-wrap'>{
        allTweets && <>
        {
          allTweets.map((tweet:any) => (
            <Tweets
            key={tweet._id} 
            tweet={tweet.content}
            createdAt={tweet.createdAt}
            userId={tweet.owner}

            
            />
          ))
             }
        </>
        }
       
      </div>
      <div className='w-screen h-screen  flex items-center justify-end pr-4 mr-4'>
      <Dialog>
  <DialogTrigger> <Plus className='' size={40} /></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>What&apos;s on your mind?</DialogTitle>
     
        <form className='flex pt-8 flex-col justify-center items-center space-y-4' onSubmit={handleFormSubmittion}>
          <Textarea name='tweet'/>
        
          <button className='px-8 hover:bg-gray-400 duration-500 text-accent font-bold  py-2 bg-white'>Tweet</button>
         
         
        </form>
     
    </DialogHeader>
    <DialogClose asChild>
    <button ref={buttonRef} className='hidden'>close</button>
  </DialogClose>
  </DialogContent>
  
</Dialog>
      
     
      </div>
      
   
    </div>
  )
}
