import { RemoveVideoFromPlaylist, addVideoToWatchHistory, fetchVideoByid, formatSecondsToMinutes, formatTimeDifference, getUserByID } from '@/functions';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar" 
import { BadgeCheck, EllipsisVertical} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from 'sonner';
import { userActions } from '@/store/userSlice';



 

export default function PlaylistVideo({videoId, playlistId}:{videoId:string, playlistId:string}) {
    const data =  useSelector((state:any) => state.user)
    const user = data.user[0]
    const dispatch = useDispatch()
    const [ownerDetails, setOwnerDetails]  = useState<any>()
    const [videoData, setVideoData]  = useState<any>()


  //   //fetching video by id
  useEffect(()=> {
    const fetchVideo = async() => {
      const response = await fetchVideoByid({videoId, accessToken:user.accessToken})

      if(response.status === true) {
        setVideoData(response.data.video)
       
      }
      else{
        console.log(response.status)
      }
    }
    if(user){
      fetchVideo()
      
    }
  },

 [videoId, user]

)
let ownerId:any;

if(videoData) {
   ownerId =videoData.owner
}
//   //getting video owner details
  useEffect(()=> { 
    const fetchVideoOwner = async() => { 
     const response = await getUserByID({userId:ownerId, accessToken:user.accessToken})
     if(response.status === true){
      setOwnerDetails(response.data)

     }
     else{
      console.log(response.data)
     } 
     
     
    }
    if(ownerId) {
      fetchVideoOwner()
 
    }
  }, [user, ownerId])


//coverting created at to real time

const formattedTimeDifference = formatTimeDifference(videoData?.createdAt);
const videoDuration = formatSecondsToMinutes(videoData?.duration) 
  

function handleClick () {
    const addingVideoToWatchHistory = async() => { 
      await addVideoToWatchHistory({videoId:videoId, accessToken:user.accessToken})
     }
   
     addingVideoToWatchHistory()
  }
 
  //removing video from playlist
 const handleButtonClick = async () => {
  const response = await RemoveVideoFromPlaylist({accessToken:user.accessToken, videoId, playlistId})
  if(response.status === true){
    dispatch(userActions.isChanged({}))
    toast("Video Removed", {
      description: 'Video removed from playlist successfully',
      action: {
        label: "Okay",
        onClick: () => {},
      },
    }) 
  } else{
    toast("Failed", {
      description: 'failed to remove video from playlist',
      action: {
        label: "Okay",
        onClick: () => {},
      },
    }) 

  }
}
    return (
      <div className='flex flex-col items-start space-y-2 font-bold text-gray-300'>
        {
            videoData && <>
             <div className='flex'>
        <Link onClick={handleClick} href={`/watchVideo/${videoId}`}
         className='flex items-end justify-end'>
          <div className=''>
          <Image  width={320}  height={180} className='w-80 h-[180px] rounded-md' src={videoData.thumbnail} alt="Thumbnail" />
          </div>
        
        <span  className='bg-black absolute text-white rounded-xl px-2  py-0.5 mb-1 text-[12px] '>
            {videoDuration}
        </span>
        </Link>
        <DropdownMenu >
      <DropdownMenuTrigger asChild>
      <EllipsisVertical/>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-28 px-2 bg-black border-white">
      <button onClick={handleButtonClick}>Remove Video</button>

      </DropdownMenuContent>
    </DropdownMenu>
       
                 
        </div>
        
        <div className='flex items-start space-x-2'>
        <Avatar className='w-10 h-10'>
        <AvatarImage src={ownerDetails?.avatar} />
        <AvatarFallback>AC</AvatarFallback>
        </Avatar>
        <div className='flex flex-col'> 
          <h3 className='md:w-60 text-sm'>{videoData.title}</h3>
          <div className=' md:w-60 sm:w-60  flex items-center justify-between'>

          <Link href={`/viewChannel/${ownerDetails?._id}`}>
          <div className='flex items-center space-x-1'>
          <h4 className='text-[12px] text-gray-300'> {ownerDetails?.fullName}</h4><p><BadgeCheck size={14} /></p></div>
        </Link>
        

          <div className='text-[11px] flex items-center space-x-2   text-gray-400'>
          <p>
            {videoData.views} views
          </p>
          
          <p>{formattedTimeDifference}</p>
        </div>
          </div>
         
        
        </div>
        
        
        </div >
            
            </>
        }
       
        
      </div>
    );
  };
  
