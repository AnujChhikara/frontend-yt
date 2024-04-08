
'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LikeVideo, addVideoToWatchHistory, fetchVideoByid, getUserByID } from "@/functions";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface VideoData {
  _id: string;
  title: string;
  description: string;
  createdAt: string; // This should be a date string, you might want to use Date type instead
  updatedAt: string; // This should be a date string, you might want to use Date type instead
  duration: number;
  isPublished: boolean;
  owner: string;
  thumbnail: string;
  videoFile: string;
  view: number;
  __v: number;
}


export default function ViewVideo({params}:{params: {slug:string}}) {
  const [videoData, setVideoData] = useState<VideoData>()
  const [liked, setLiked] = useState(false);
  const [ownerDetails, setOwnerDetails]  = useState<any>()

  const id = params.slug
  const data =  useSelector((state:any) => state.user)
  const user = data.user[0]

  

  if(!user) { 
    redirect('/')
  }
  
 
  //fetching video by id
  useEffect(()=> {
    const fetchVideo = async() => {
      const response = await fetchVideoByid({videoId:id, accessToken:user.accessToken})

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

 [id, user]

)
  


 
  
  const ownerId = videoData?.owner
  //getting video owner details
  useEffect(()=> { 
    const fetchVideoOwner = async() => { 
     const response = await getUserByID({userId:ownerId, accessToken:user.accessToken})
     if(response.status === true){
      setOwnerDetails(response.data)
      const addingVideoToWatchHistory = async() => {
        addVideoToWatchHistory({videoId:id, accessToken:user.accessToken})
      }
    
      addingVideoToWatchHistory()
    

     }
     else{
      console.log(response.data)
     } 
     
     
    }
    if(user) {
      fetchVideoOwner()
    }
  }, [user, ownerId, id])
   


  const handleLikeButton = () => {
    setLiked(!liked)
    LikeVideo({videoId:id, accessToken:user.accessToken})
  }

 
  return (
    <div className="flex flex-col justify-center items-center mt-20">

      Hello
      {videoData && <div className="flex flex-col space-y-4 justify-start">
         <video className="rounded-2xl shadow-gray-400 shadow-lg mb-6" width="800" height="800" controls>
        <source src={videoData!.videoFile} type="video/mp4"/>
        
      Your browser does not support the video tag.
      </video>
      <h3 className="text-3xl font-bold">{videoData.title}</h3>
      <p>{videoData.description}</p>
      <div className="flex justify-between items-center"> 
      <div className="flex space-x-4 items-center">
      <Avatar className="w-20 h-20" >
          <AvatarImage src={ownerDetails?.avatar} />
          <AvatarFallback>AC</AvatarFallback>
      </Avatar>
      <div>
      <h3 className="font-semibold text-xl">{ownerDetails?.fullName}</h3>
      <p className="tex-sm text-gray-400">xx Subscribers</p>
      </div>
      </div>
      <div className="flex space-x-4 font-bold bg-gray-900 px-4 py-2 rounded-3xl ">
        <div className="flex items-end space-x-2 ">
          <div className="flex items-end space-x-1 ">
            <button onClick={handleLikeButton}>
            {liked && <ThumbsUp size={32} color="#6c6a6a" />}
            {!liked && <ThumbsUp size={32} color="#FF3EA5" />}
            
            </button>
           
            </div>
            <div className="h-full bg-gray-300 w-[1px]"></div>
        </div>
        {
          liked? <button disabled onClick={handleLikeButton} className="flex items-end">
          <ThumbsDown  size={32} color="#6c6a6a" />
           </button> : <button  onClick={handleLikeButton} className="flex items-end">
        <ThumbsDown  size={32} color="#6c6a6a" />
         </button>
        }
      
        
      </div>
      </div>
      </div>
}
    </div>
  )
}
