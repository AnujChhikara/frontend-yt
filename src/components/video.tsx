import { addVideoToWatchHistory, getUserByID } from '@/functions';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar" 
import { BadgeCheck, Dot, Pencil } from 'lucide-react';



interface VideoProps {
  title:string,
    videoUrl: string;
    thumbnailUrl: string;
    duration: number;
    owner: string;
    views: number;
    videoId:string;
    createdAt: string;
    description: string
  }
 

  const Video: React.FC<VideoProps> = ({title, videoUrl,description, videoId, thumbnailUrl, duration, owner, views, createdAt }) => {
    const data =  useSelector((state:any) => state.user)
    const user = data.user[0]
    const [ownerDetails, setOwnerDetails]  = useState<any>()
    const [videoOwner, setVideoOwner] = useState(false)
    
    //getting video owner details
    useEffect(()=> {
      const fetchVideoOwner = async() => { 
       const response = await getUserByID({userId:owner, accessToken:user.accessToken})
       if(response.status === true){
        setOwnerDetails(response.data)

       }
       else{
        console.log(response.data)
       } 
       
       
      }
      if(user) {
        fetchVideoOwner()
      }
    }, [user, owner])

    //checking if logged in user is owner of video

    useEffect(()=> {
      if(user.id === ownerDetails?._id){
        setVideoOwner(true)
      }
    }, [user, ownerDetails])

//coverting created at to real time
const timestampUTC = new Date(createdAt);
const timestampIST:any = new Date(timestampUTC.getTime())
const currentTimeIST:any = new Date();
const timeDifference = currentTimeIST - timestampIST;
const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));

   
    function formatSecondsToMinutes(second:number) {
      // Calculate minutes and remaining seconds
      const minutes = Math.floor(second / 60);
      const remainingSeconds = Math.round(second % 60);
      
      // Format the result as minutes:seconds
      const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
      const formattedSeconds = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;
  
      return `${formattedMinutes}:${formattedSeconds}`;
  }

  const videoDuration = formatSecondsToMinutes(duration)
  

  function handleClick () {
    const addingVideoToWatchHistory = async() => { 
      const response = await addVideoToWatchHistory({videoId:videoId, accessToken:user.accessToken})
     }
   
     addingVideoToWatchHistory()
  }

    
    return (
      <div className='flex flex-col  justify-center items-start space-y-2 font-bold text-gray-300'>
        <div className='flex space-x-2'>
        <Link onClick={handleClick} href={`/watchVideo/${videoId}+${ownerDetails?._id}`}
         className='flex items-end justify-end'>
        <Image width={320} height={0} className='w-80 h-48 rounded-md' src={thumbnailUrl} alt="Thumbnail" />
        <span  className='bg-black absolute text-white rounded-xl px-2  py-0.5 mb-1 text-[12px] '>
            {videoDuration}
        </span>
        </Link>
        {
          videoOwner && <Link href={`/editVideo/${videoId}`}> <Pencil size={20} /> </Link> 
        }
        

        </div>
        
        <div className='flex items-start space-x-2'>
        <Avatar className='w-10 h-10'>
        <AvatarImage src={ownerDetails?.avatar} />
        <AvatarFallback>AC</AvatarFallback>
        </Avatar>
        <div className='flex flex-col'> 
          <h3 className='text-sm'>{title}</h3>
          <Link href={`/viewChannel/${owner}`}>
          <div className='flex items-center space-x-1'>
          <h4 className='text-[12px] text-gray-400'>by {ownerDetails?.fullName}</h4><p><BadgeCheck size={14} /></p></div>
        </Link>
        <div className='text-[12px] flex items-center   text-gray-500'>
          <p>
            {views} views
          </p>
          <Dot />
          <p>{hoursDifference} Hours Ago</p>
        </div>
        
        </div>
        
        
        </div >
        
      </div>
    );
  };
  
  export default Video;