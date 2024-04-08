'use client'
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { fetchVideoByid } from '@/functions';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Textarea } from "@/components/ui/textarea"
import { Button } from '@/components/ui/button';

interface VideoData {
    _id: string;
    title: string;
    description: string;
    createdAt: string; 
    updatedAt: string; 
    duration: number;
    isPublished: boolean;
    owner: string;
    thumbnail: string;
    videoFile: string;
    view: number;
    __v: number;
  }

  
export default function EditVideo({params}:{params: {slug:string}}) {
    const [videoData, setVideoData] = useState<VideoData>()
    const data =  useSelector((state:any) => state.user)
    const user = data.user[0] 
    const id = params.slug 

    if(!user) {
        redirect('/')
    }

      //fetching video by id
  useEffect(() => {
    if(id) {
    const fetchVideo = async  () =>
    {  
     const video = await fetchVideoByid({videoId:id, accessToken:user.accessToken})
     setVideoData(video.data.video)
   }
      fetchVideo()
  
  }
                  
    
  }, [id, data, user.accessToken]);
  

  if(user.id === videoData?.owner){ 
    return (
        <div className='m-10'>
            <form className='flex space-x-10' action="">
          <div>
            <Image width={400} height={100} className='w-96 h-60 rounded-lg' src={videoData!.thumbnail} alt='vidoe thumbnail'/>
          </div>
          <div className='flex flex-col space-y-4'>
                <div>
                <Label htmlFor="title">Video Title</Label>
                <Input className='w-80' id="title" defaultValue={videoData!.title} name='text'  />
                </div>
                <div>
                <Label htmlFor="description">Video Description</Label>
                <Textarea placeholder={videoData!.description} />
                </div>

                <Button className='w-40 ' variant="secondary">Update Video</Button>
          </div>
         
          </form>
        </div>
      )
    
  } 
 
}
