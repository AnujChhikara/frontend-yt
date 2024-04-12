
'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AddComment, GetVideoComment, LikeVideo, ToggleSubscription, checkIfSubscribed, checkLiked, fetchVideoByid, getChannelStats, getUserByID } from "@/functions";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { redirect } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { toast } from "sonner";


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

type Video = {
  _id: string;
  videoFile: string;
  thumbnail: string;
  title: string;
  description: string;
  // Add any other properties if needed
}

type MyData = {
  allVideos: Video[];
  channelId: string;
  totalSubscribers: number;
  totalViews: number;
  // Add any other properties if needed
}


export default function ViewVideo({params}:{params: {slug:any}}) {

  const videoId = params.slug


   
  const [videoData, setVideoData] = useState<VideoData>()
  const [liked, setLiked] = useState(false);
  const [videoComments, setVideoComments] = useState<any[]>([]);
  const [subscribe, setSubscribe] = useState(false);
  const [channelStats, setChannelStats] = useState<MyData>()
  const [ownerDetails, setOwnerDetails]  = useState<any>()
  const data =  useSelector((state:any) => state.user)
  const user = data.user[0]
  

  //comment ref
  const commentRef = useRef<HTMLTextAreaElement>(null)


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


   //checking if user already subscribed?
  useEffect(()=> {
    const checkSubscribed= async() =>{
     const response = await checkIfSubscribed({accessToken:user.accessToken,channelId:ownerId})

     if(response?.subscribe === true) {
       const data = response.data
       setSubscribe(data.subscribed)
     } 
     else{
       setSubscribe(false)
     }
    }
    if(ownerId){
      checkSubscribed()
    }
    
  }, [ownerId, user])
 

  // fetching channel stats
  
  useEffect(()=>{ 
    const getUserChannel = async() => {
     const stats =  await getChannelStats({accessToken:user.accessToken, channelId:ownerId})
     setChannelStats(stats)

    }
 if(ownerId){
  getUserChannel()
 }
   

 
  },[user, ownerId])

  //adding comment

  const handleAddTweetForm = async(event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const comment = commentRef.current!.value
    const response = await AddComment({accessToken:user.accessToken, videoId, comment})
    if(response.status === true) {
      toast("Tweet Added", {
        description: "Comment added successfully",
        action: {
          label: "Okay",
          onClick: () =>{},
        },
      })
    
    }
    else{
      toast("Failed", {
        description: "failed to add your tweet",
        action: {
          label: "Okay",
          onClick: () =>{},
        },
      })
    }
  }


  //getting video Comments

  useEffect(()=> {
    const getVideoComments = async() => {
      const response = await GetVideoComment({accessToken:user.accessToken, videoId})
      if(response.status === true){
          setVideoComments(response.data.VideoComments)
      }
      else{
        console.log('Failed to get video comments')
      }
    }

    if(user){
      getVideoComments()
    }
  }, [user, videoId])

  const handleLikeButton = () => {
    setLiked(!liked)
    LikeVideo({videoId:videoId, accessToken:user.accessToken})
  }

  const handleSubscribeButton = async() =>{
    setSubscribe(!subscribe)
    await ToggleSubscription({channelId:ownerId, accessToken:user.accessToken})
    const updatedStats = await getChannelStats({ accessToken: user.accessToken, channelId: ownerId });
    setChannelStats(updatedStats); }
   

    const channelSubscribers = channelStats?.totalSubscribers
    let link;
    if(videoData){
       link  = videoData!.videoFile
      link = link.replace("http://", "https://");

    }


  

  return (
    <div>

      {/* main video */}
    <div className="flex flex-col justify-center md:items-start sm:items-center mt-10 md:mx-10">

      
      {videoData && <div className="flex flex-col justify-start">
         <video  className="rounded-2xl shadow-inner sm:w-[340px] md:w-[700px] md:h-[500px] shadow-gray-200 mb-6" width="700" height="500" controls>
        <source src={link} type="video/mp4"/>
        
      Your browser does not support the video tag.
      </video>
      
      <h3 className="md:text-xl  sm:text-sm font-bold">{videoData!.title}</h3>
     
      <div className="flex justify-between items-center"> 
      <div className="flex space-x-4 pt-2 items-center">
      <Avatar className="w-12 h-12" >
          <AvatarImage src={ownerDetails?.avatar} />
          <AvatarFallback>AC</AvatarFallback>
      </Avatar>
      <div>
      <h3 className="font-semibold md:text-lg">{ownerDetails?.fullName}</h3>
      <p className="text-[12px] text-gray-400">{channelSubscribers} Subscribers</p>
      </div>
      
      </div>
      <div className="flex  justify-center items-center space-x-2">
      {subscribe? 
       <button onClick={handleSubscribeButton} className="bg-green-500 sm:text-sm md:text-base md:px-3 sm:px-1 md:py-2 sm:py-0.5 rounded-3xl">
        Subscribed
      </button> :
       <button onClick={handleSubscribeButton} className="bg-red-500 sm:text-sm md:text-base md:px-3 sm:px-1 md:py-2 sm:py-0.5 rounded-3xl hover:bg-red-400">
       Subscribe
     </button>}
      
      <div className="flex space-x-4 font-bold bg-gray-900 md:px-4 md:py-2 sm:px-2 sm:py-1 rounded-3xl ">
    
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
      </div>
      <Accordion className="bg-[#0f0f0f] mt-4 px-4 pb-4 rounded-2xl" type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-gray-300 text-lg">Description</AccordionTrigger>
          <AccordionContent className="md:w-[600px] sm:w-80">
          {videoData.description}
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="mt-8 px-4">
        <h2 className="text-xl font-bold pb-8 ">Comments</h2>
          <form className="flex flex-col space-y-4 w-full" onSubmit={handleAddTweetForm}>
            <div className="flex items-end space-x-2 ">
            <Avatar className="w-10 h-10" >
          <AvatarImage src={user?.avatar} />
          <AvatarFallback>AC</AvatarFallback>
      </Avatar>

          <textarea ref={commentRef} rows={1} placeholder="Add a comment..." className=" px-2 py-1 w-full text-gray-300 text-sm focus:outline-none bg-transparent border-b-2" />
          </div>
           
            <div className="flex space-x-2 w-full justify-end">
            <button >cancel</button>
          <button className="bg-blue-500 px-3 py-1 rounded-2xl hover:opacity-85" > Comment</button>
            </div>
           
          
          </form>
       <div className="h-96 mt-4">
        {videoComments && videoComments.map((comment:any) => (
          <div key={comment._id}>{comment.content}</div>
        ))}

       </div>
        
      </div>
      </div>
      
}
    </div>

    <div>
      {/* recommendations */}
    </div>
    </div>
  )
}
