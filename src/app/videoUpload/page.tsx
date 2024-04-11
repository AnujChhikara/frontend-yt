'use client'


import { Label } from '@/components/ui/label';
import { ArrowRightFromLine, BadgeCheck, HardDriveUpload, ImageUp } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { toast } from "sonner"

type Owner = {
  _id: string;
  username: string;
  email: string;
  fullName: string;
  avatar: string;
  // Add more properties if necessary
}

type VideoData = {
  createdAt: string; // Should be a valid ISO 8601 date string
  description: string;
  duration: number;
  isPublished: boolean;
  owner: Owner;
  thumbnail: string;
  title: string;
  updatedAt: string; // Should be a valid ISO 8601 date string
  videoFile: string;
  view: number;
  __v: number;
  _id: string;
}

export default function VideoUpload() {
  const userData =  useSelector((state:any) => state.user)
  const user = userData.user[0] 
  
  if(!user) {
    redirect('/')
  }
  
  
  
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [errorMsg, setErrorMessage] = useState('')
  const[isProcessing, setIsProcessing] = useState(false)
  const[videoData, setVideoData] = useState<VideoData>()

  const thumbnailFileInputRef = useRef<HTMLInputElement>(null)
  const videoFileInputRef = useRef<HTMLInputElement>(null)
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);


  const handleThumbnailFileSelect =() =>{
    thumbnailFileInputRef.current!.click();
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

  const handleVideoFileSelect =() =>{
    videoFileInputRef.current!.click();
  }

 
  const handleVideoFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target!.files![0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setVideoPreview(result);
      };
      reader.readAsDataURL(file);
    }
  };
  


  const handelFormSubmittion= async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsProcessing(true)
    const selectElement:any = document.getElementById('category');
    const category = selectElement?.value;
      
    const formData = new FormData();
    formData.append('title', titleRef.current!.value);
    formData.append('description', descriptionRef.current!.value);
    formData.append('thumbnail', thumbnailFileInputRef.current!.files![0]);
    formData.append('video', videoFileInputRef.current!.files![0])
    formData.append('category', category)
    
    try {
      const response = await fetch(process.env.url + '/videos',{
        method:"POST",
        headers:{
         'Authorization': `Bearer ${user.accessToken}`
        },
        
        body:formData
       })
    
       if(response.ok) {
        const res_data = await response.json()
        setIsProcessing(false)
   
        setVideoData(res_data.data)
        // resting value
        if (thumbnailFileInputRef.current) thumbnailFileInputRef.current.value = '';
        if (videoFileInputRef.current) videoFileInputRef.current.value = '';
        if (titleRef.current) titleRef.current.value = '';
        if (descriptionRef.current) descriptionRef.current.value = '';
        setThumbnailPreview(null)
        setVideoPreview(null)


        toast("Video Uploaded", {
          description: 'Video has been uploaded successfully',
          action: {
            label: "Okay",
            onClick: () => console.log("Welcome to the App"),
          },
        }) 
       }
       else{
        const error = await response.json()
        console.log(error)
        setErrorMessage(error.msg)
        setIsProcessing(false)
       }
    } catch (error) {
      console.log("error")
      
        toast("Video upload failed", {
          description:"Please try again or after some time",
          action: {
            label: "Okay",
            onClick: () => console.log("Welcome to the App"),
          }
        }) 
        setIsProcessing(false)   
    }
 
   }

   


  
  return (
    <div className='flex flex-col w-screen justify-center items-center'>
      <h2 className='text-4xl font-semibold md:py-12 sm:py-6 underline '>Upload Your Video</h2>
      <div className='border p-4 rounded-lg border-input' >
        {errorMsg && <p className='text-red-400 text-sm relative'>{errorMsg}</p>}
        <form className='flex flex-col px-4justify-center items-start space-y-6' onSubmit={handelFormSubmittion}>
          
          
           <div className='md:flex md:space-x-4 sm:space-y-4 md:space-y-0 md:flex-row sm:flex sm:flex-col'>

        
              {/* video upload */}
           <div onClick={handleVideoFileSelect} className='border md:w-60 sm:w-80 h-40 px-8 py-8 border-dotted cursor-pointer '>
            
                  <input required type='file' ref={videoFileInputRef} accept="video/*" onChange={handleVideoFileChange} hidden  name='coverImage' id='coverImage' className=' w-80 rounded-md h-10 px-4 py-2 bg-transparent border border-gray-200' />
                  <div   className='flex flex-col space-y-4 text-gray-400  items-center '>
                  {videoPreview && (
                    <BadgeCheck color="#2ac200" />
                  )}
                      {
                        !videoPreview &&   <HardDriveUpload size={32} color="#949494" />
                      }
                    
                      <h4>Upload your Video</h4>
                   
                  </div>
                </div>

                {/* thumbnail upload */}

              <div onClick={handleThumbnailFileSelect} className='border px-8 py-8 border-dotted cursor-pointer'>
                  <input required ref={thumbnailFileInputRef} accept='image/jpeg, image/png, image/jpg' onChange={handleThumbnailFileChange}  type='file' hidden name='avatar' id='avatar' className=' w-80 rounded-md h-10 px-4 py-2 bg-transparent border border-gray-200' />
                  <div  className='flex flex-col space-y-4 text-gray-400 space-x-4 items-center '>
                  {thumbnailPreview && (
                    <BadgeCheck color="#2ac200" />
                  )} {
                    !thumbnailPreview && (
                      <ImageUp size={32} color="#949494" />
                    )
                  }                 
                    <h4>Upload your Video Thumbnail</h4>
                  </div>
                </div>
                </div>
                <div className='sm:flex sm:flex-col md:flex md:flex-row sm:space-y-4 md:space-y-0 justify-center md:items-center md:space-x-4'>
                <div className='flex flex-col space-y-2 justify-start items-start'>
                  <Label htmlFor='title'>Video Title</Label>
                <input required maxLength={50} ref={titleRef} type="text" name="title" id='title' placeholder='video title' className=' bg-transparent px-4 py-1 rounded-lg border border-input ' />
                </div>
                <div className='flex flex-col bg-transparent space-y-2 justify-start items-start'>
                  
                <Label htmlFor="category">Select Video Category</Label>
                  <select className='' id="category" >
                    <option className='' value="general">General</option>
                    <option className='' value="gaming">Gaming</option>
                    <option className='' value="tech">Tech</option>
                    <option className='' value="comedy">Comedy</option>
                    <option className='' value="music">Music</option>
                  </select>
                 
                </div>
               
                </div>
       
        <div className='flex flex-col space-y-2 w-full'>
        <Label htmlFor='description'>Video Description</Label>
        <textarea required ref={descriptionRef} placeholder='video description' id='description' className='"flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",'/>
        </div>
                
                 {
                  isProcessing &&  <button className='px-8 rounded-xl animate-pulse hover:bg-blue-500 duration-7s00 py-2 bg-blue-400 text-lg font-semibold'>Uploading your video</button>
                } {
                  !isProcessing && <button className='px-8 rounded-xl hover:bg-blue-500 duration-300 py-2 bg-blue-400 text-lg font-semibold'>Upload</button>
                }

                
        
        </form>

      
      </div>
      {videoData?._id && <>
        <Link className='text-lg flex items-center space-x-2 bg-primary text-accent px-4 py-2 mb-4 mt-8 rounded-lg font-semibold' href={`/watchVideo/${videoData._id}+${videoData.owner._id}`}>
          <p>Watch Your Video here</p> <ArrowRightFromLine />
        </Link></>}
    </div>
  )
}
