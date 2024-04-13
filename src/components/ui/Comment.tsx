import React, { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useSelector } from 'react-redux'
import { redirect } from 'next/navigation'
import { LikeComment, checkCommentLiked, formatTimeDifference, getUserByID } from '@/functions'
import { ThumbsDown, ThumbsUp } from 'lucide-react'
import CommentEditButton from '../compUi/commentEditButton'

export default function CommentComponent({commentId, ownerId, createdAt, comment}
    :{commentId:string, ownerId:string, createdAt:string, comment:string}) {

        const [ownerDetails, setOwnerDetails] = useState<any>({})
        const data =  useSelector((state:any) => state.user)
        const user = data.user[0] 
        const[isOwner, setIsOwner]= useState(false)
        const [liked, setLiked] = useState(false);
        if(!user) { 
            redirect('/')
          } 

        //getting comment owner details

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
         const postedTime = formatTimeDifference(createdAt)

         //checking if logged in user is owner of comment
         useEffect(()=> {
            if(ownerId === user.id){
                setIsOwner(true)
             }
         }, [ownerId, user])

         //check if user already liked the comment
         useEffect(()=> {
          const checkLike = async() =>{
           const response = await checkCommentLiked({accessToken:user.accessToken, id:commentId})
     
           if(response?.liked === true) {
             const data = response.data
             setLiked(data.liked)
           } 
           else{
             setLiked(false)
           }
          }
          
          checkLike()
        }, [commentId, user])

         const handleLikeButton = async () => {
          setLiked(!liked) 
         await LikeComment({commentId, accessToken:user.accessToken})
        }
      
  return (
    <div className='flex justify-between items-center'>

   
    <div className='flex items-start space-x-4 py-4'>
        <Avatar className="w-12 h-12" >
          <AvatarImage src={ownerDetails?.avatar} />
          <AvatarFallback>AC</AvatarFallback>
      </Avatar>
      <div className='flex flex-col space-y-2'>
            <div className='flex space-x-2 items-center'>
            <h3 className='font-bold'>@{ownerDetails?.username}</h3>
            <p className='text-gray-400 text-sm'>{postedTime}</p>
            </div>
            <p className='text-sm'>
                {comment}
            </p>
            <div className='flex space-x-4'>
            <button onClick={handleLikeButton}>
            {liked && <ThumbsUp size={24} color="#FF004D" />}
            {!liked && <ThumbsUp size={24} color="#6c6a6a"  />}
            
            </button>
            {
          liked? <button onClick={handleLikeButton} className="flex items-end">
          <ThumbsDown  size={24} color="#6c6a6a" />
           </button> : <button disabled className="flex items-end">
        <ThumbsDown  size={24} color="#6c6a6a" />
         </button>
        }
      
            </div>
      </div>
     


    </div>
    <div>
        {isOwner && <CommentEditButton commentId={commentId} comment={comment}/>}
      </div>

    </div>
  )
}
