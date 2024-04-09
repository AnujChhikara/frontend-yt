
'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LikeVideo, addVideoToWatchHistory, checkLiked, fetchVideoByid, getUserByID } from "@/functions";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

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


export default function ViewVideo({params}:{params: {slug:any}}) {

  const encodedId = params.slug
  const decodedId = decodeURIComponent(encodedId);
  const [videoId, ownerId] = decodedId.split('+');


  const [videoData, setVideoData] = useState<VideoData>()
  const [liked, setLiked] = useState(false);
  const [ownerDetails, setOwnerDetails]  = useState<any>()
  const data =  useSelector((state:any) => state.user)
  const user = data.user[0]
  


  if(!user) { 
    redirect('/')
  }
  
 
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
    if(user ) {
      fetchVideoOwner()
 
    }
  }, [user, ownerId])
 

  //checking if user already liked the video or not
   useEffect(()=> {
     const checkLike = async() =>{
      const response = await checkLiked({accessToken:user.accessToken, id:videoId})

      if(response?.liked === true) {
        const data = response.data
        setLiked(data.liked)
      } 
      else{
        setLiked(false)
      }
     }
     checkLike()
   }, [videoId, user])

  const handleLikeButton = () => {
    setLiked(!liked)
    LikeVideo({videoId:videoId, accessToken:user.accessToken})
  }

 
  return (
    <div className="flex flex-col justify-center items-start mt-10 mx-10">
      {videoData && <div className="flex flex-col space-y- justify-start">
         <video className="rounded-2xl shadow-inner shadow-gray-200 mb-6" width="700" height="500" controls>
        <source src={videoData!.videoFile} type="video/mp4"/>
        
      Your browser does not support the video tag.
      </video>
      <h3 className="text-xl font-bold">{videoData.title}</h3>
     
      <div className="flex justify-between items-center"> 
      <div className="flex space-x-4 pt-2 items-center">
      <Avatar className="w-12 h-12" >
          <AvatarImage src={ownerDetails?.avatar} />
          <AvatarFallback>AC</AvatarFallback>
      </Avatar>
      <div>
      <h3 className="font-semibold text-lg">{ownerDetails?.fullName}</h3>
      <p className="text-[12px] text-gray-400">xx Subscribers</p>
      </div>
      </div>
      <div className="flex space-x-4 font-bold bg-gray-900 px-4 py-2 rounded-3xl ">
        <div className="flex items-end space-x-2 ">
          <div className="flex items-end space-x-1 ">
            <button onClick={handleLikeButton}>
            {liked && <ThumbsUp size={24} color="#FF004D" />}
            {!liked && <ThumbsUp size={24} color="#6c6a6a"  />}
            
            </button>
           
            </div>
            <div className="h-full bg-gray-300 w-[1px]"></div>
        </div>
        {
          liked? <button disabled onClick={handleLikeButton} className="flex items-end">
          <ThumbsDown  size={24} color="#6c6a6a" />
           </button> : <button  onClick={handleLikeButton} className="flex items-end">
        <ThumbsDown  size={24} color="#6c6a6a" />
         </button>
        }
      
        
      </div>
      </div>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-gray-300">Description</AccordionTrigger>
          <AccordionContent className="w-[600px]">
          {videoData.description}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      </div>
}
    </div>
  )
}
