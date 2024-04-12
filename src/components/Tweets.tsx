'use client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar" 
import { Separator } from "@/components/ui/separator"
import { LikeTweet, formatTimeDifference, getUserByID } from "@/functions"
import { Star } from "lucide-react"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { TweetEditButton } from "./compUi/twitterEditButton"


export default function Tweets({userId, tweet, createdAt, accessToken, id}:{userId:string, tweet:string, createdAt:string, accessToken:string, id:string}) {
  const [ownerDetails, setOwnerDetails]  = useState<any>() 
  const[tweetOwner, setTweetOwner] = useState(false)
  const [isLiked, setIsLiked]  = useState(false) 
  const data =  useSelector((state:any) => state.user)
  const user = data.user[0]  

  

   //getting tweet owner details
   useEffect(()=> {
    const fetchVideoOwner = async() => { 
     const response = await getUserByID({userId, accessToken})
     if(response.status === true){
      setOwnerDetails(response.data)

     }
     else{
      console.log(response.data)
     } 
     
     
    }
    if(accessToken) {
      fetchVideoOwner()
    }
  }, [accessToken, userId])

  //liking user tweet
  const handleLikeButton = () => {
    setIsLiked(!isLiked)
    LikeTweet({tweetId:id, accessToken})
  }

  //check if logged in user is owner of tweet
  useEffect(()=> {
    if(user.id === ownerDetails?._id){
      setTweetOwner(true)
    }
  }, [user, ownerDetails])



  const formattedTimeDifference = formatTimeDifference(createdAt);
  const tweetContent= tweet
  return (
    <div className="flex flex-col space-y-4 bg-black/[90%] px-6 py-4 rounded-3xl  shadow-inner shadow-gray-900 hover:scale-105 duration-500">

        <div className="flex space-x-4 items-center">
        <Avatar>
            <AvatarImage src={ownerDetails?.avatar} />
            <AvatarFallback>AC</AvatarFallback>
      </Avatar>

      <h3 className="underline">{ownerDetails?.fullName}</h3>
      </div>
      <div className="text-sm flex text-gray-300">
        <p className=" w-60">{tweetContent} </p>
        
       </div>
     
   

     <div>
  
      <Separator  className="my-2 w-60 bg-white" />
      <div className="flex h-5 items-center space-x-4 text-sm">
      
        
       
        <p className="text-sm text-gray-400">{formattedTimeDifference}</p>
        <Separator className="bg-white" orientation="vertical" />
        {
          isLiked? <button onClick={handleLikeButton} className="flex items-end">
           <Star  color="#FF004D" />
           </button> : <button  onClick={handleLikeButton} className="flex items-end">
         <Star color="#6c6a6a" />
         </button>
        }

        {
          tweetOwner && <>
          <Separator className="bg-white" orientation="vertical" />
          
          <TweetEditButton tweetId={id} tweet={tweetContent}/>
          
          </>
        }
      
      </div>
    </div>

      
    </div>
  )
}
