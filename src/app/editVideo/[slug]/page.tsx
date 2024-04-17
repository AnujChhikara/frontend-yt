'use client'
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { editVideo, fetchVideoByid } from '@/functions';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Textarea } from "@/components/ui/textarea"
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import { toast } from 'sonner';

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
    const[isUpdating, setIsUpdating] = useState(false)
    const [videoData, setVideoData] = useState<VideoData>()
    const data =  useSelector((state:any) => state.user)
    const user = data.user[0] 
    const id = params.slug 

    if(!user) {
        redirect('/')
    }

    //video Update
    const titleRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const thumbnailFileRef = useRef<HTMLInputElement>(null)
    const[thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);

    const handleThumbnailFileSelect =() =>{
      thumbnailFileRef.current!.click();
    }
  
    const handleThumbnailFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target!.files![0];
      if (file) {
        // Read the selected file and create a data URL representing the image
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result as string;
          setThumbnailPreview(result); // Set the data URL as the image preview
        };
        reader.readAsDataURL(file);
      }
    };

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
  
//editing video

const handleFormSubmittion = async (event:React.FormEvent<HTMLFormElement>) => {
  event.preventDefault()
  setIsUpdating(true)

  const formData = new FormData();

   formData.append('thumbnail', thumbnailFileRef.current!.files![0]);
   formData.append('title', titleRef.current!.value);
   formData.append('description', descriptionRef.current!.value);

 const response = await editVideo({videoId:id, accessToken:user.accessToken, formData:formData})

 if(response.status===true){
  
  
  toast("Video Updated", {
    description: "Video has been successfully Updated",
    action: {
      label: "Okay",
      onClick: () => console.log('Update Successful'),
    },
  })
   
  
 }
 else{
  toast("Video Not Updated", {
    description: "Updating Video failed!",
    action: {
      label: "Okay",
      onClick: () => console.log('Update failed'),
    },
  })
 
 }

  setIsUpdating(false)
}
  if(user.id === videoData?.owner){ 
    return (
        <div className='m-10'>
            <form onSubmit={handleFormSubmittion} className='sm:flex sm:flex-col md:flex md:flex-row md:space-y-4  sm:space-y-4   md:space-x-10' action="">
          
            <div  className='flex flex-col justify-center items-center space-y-4'>
              <div className='flex flex-col  items-center justify-center border w-80 h-60 p-4'>
            {
              thumbnailPreview? <Image width={200} height={100} className='rounded-xl ' src={thumbnailPreview} alt='user avatar'/>:
              <Image width={300} height={100} className='rounded-xl ' src={videoData!.thumbnail} alt='user avatar'/>
            }
           
           <Pencil color="#ffffff" size={48} className='absolute rounded-xl bg-black bg-opacity-80 p-2 m-2 hover:scale-110 duration-500' onClick={handleThumbnailFileSelect}  />
            <Input  onChange={handleThumbnailFileChange} accept='image/jpeg, image/png, image/jpg'  ref={thumbnailFileRef} className='w-40 hidden' type='file' name='avatar' id='avatar' />

        </div>
         
          </div>
 
          <div className='flex flex-col space-y-4'>
                <div>
                <Label htmlFor="title">Video Title</Label>
                <Input ref={titleRef} className='w-80' id="title" defaultValue={videoData!.title} name='title'  />
                </div>
                <div>
                <Label htmlFor="description">Video Description</Label>
                <Textarea ref={descriptionRef} name='description' id='description' defaultValue={videoData!.description} />
                </div>

                {isUpdating? <Button disabled  className='w-40 animate-pulse duration-500 ' variant="secondary">Updating Video</Button>:
                <Button  className='w-40 ' variant="secondary">Update Video</Button>}
          </div>
         
          </form>
        </div>
      )
    
  } 
 
}
