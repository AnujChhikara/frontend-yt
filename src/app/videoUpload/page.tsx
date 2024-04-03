'use client'


import { ArrowRightFromLine, HardDriveUpload, ImageUp } from 'lucide-react';
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
      // Read the selected file and create a data URL representing the image
      const reader = new FileReader();
      reader.readAsDataURL(file);
    }
  };
 

  const handelFormSubmittion= async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsProcessing(true)
     
    const formData = new FormData();
    formData.append('title', titleRef.current!.value);
    formData.append('description', descriptionRef.current!.value);
    formData.append('thumbnail', thumbnailFileInputRef.current!.files![0]);
    formData.append('video', videoFileInputRef.current!.files![0])
    
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
      <h2 className='text-4xl font-semibold py-12 underline '>Upload Your Video</h2>
      <div className='border p-4 rounded-lg border-input' >
        {errorMsg && <p className='text-red-400 text-sm relative'>{errorMsg}</p>}
        <form className='flex flex-col justify-center items-start space-y-6' onSubmit={handelFormSubmittion}>

        <input required  ref={titleRef} type="text" name="title" id='title' placeholder='video title' className=' bg-transparent px-4 py-1 rounded-lg border border-input ' />
        <textarea required ref={descriptionRef} placeholder='video description' id='description' className='"flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",'/>
        <div className='flex space-x-16'>

          {/* thumbnail upload */}

              <div className=''>
                  <input required ref={thumbnailFileInputRef} accept='image/jpeg, image/png, image/jpg' onChange={handleThumbnailFileChange}  type='file' hidden name='avatar' id='avatar' className=' w-80 rounded-md h-10 px-4 py-2 bg-transparent border border-gray-200' />
                  <div onClick={handleThumbnailFileSelect} className='flex text-gray-400 space-x-4 items-center cursor-pointer'>
                  {thumbnailPreview && (
                    <Image width={100} height={100}
                     src={thumbnailPreview} alt="Thumbnail Preview"
                     className='rounded-xl w-20 h-12'  />
                  )}
                      
                      <ImageUp size={32} color="#949494" />
                    <h4>Upload your Video Thumbnail</h4>
                  </div>
                </div>

              {/* video upload */}

                <div>
                  <input required type='file' ref={videoFileInputRef} accept="video/*" onChange={handleVideoFileChange} hidden  name='coverImage' id='coverImage' className=' w-80 rounded-md h-10 px-4 py-2 bg-transparent border border-gray-200' />
                  <div onClick={handleVideoFileSelect}  className='flex text-gray-400 space-x-4 items-center cursor-pointer'>
                 
                     <HardDriveUpload size={32} color="#949494" />
                    <h4>Upload your Video</h4>
                  </div>
                </div>
                </div> {
                  isProcessing &&  <button className='px-8 rounded-xl animate-pulse hover:bg-blue-500 duration-7s00 py-2 bg-blue-400 text-lg font-semibold'>Uploading your video</button>
                } {
                  !isProcessing && <button className='px-8 rounded-xl hover:bg-blue-500 duration-300 py-2 bg-blue-400 text-lg font-semibold'>Upload</button>
                }

                
        
        </form>

      
      </div>
      {videoData?._id && <>
        <Link className='text-lg flex items-center space-x-2 bg-primary text-accent px-4 py-2 mt-8 rounded-lg font-semibold' href={`/watchVideo/${videoData._id}`}>
          <p>Watch Your Video here</p> <ArrowRightFromLine />
        </Link></>}
    </div>
  )
}
