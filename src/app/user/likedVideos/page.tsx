'use client'

import Video from "@/components/video"
import { getUserLikedVideo } from "@/functions"

import { redirect } from "next/navigation"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

export default function LikedVideo() {

    const userData = useSelector((state:any)=> state.user)
    const user = userData.user[0]
    const [likedVideo, setLikedVideo]= useState<any[]>()

    if(!user){
        redirect('/')
    }

    useEffect(()=> {
        const userLikedVideo = async() => {
            const response = await getUserLikedVideo({accessToken:user.accessToken})

            if(response.status === true) {
        
                const data = response.data.data
                setLikedVideo(data)
               
            }
            else{
                const error = response.data
                console.log(error)
                
            }
        }

        userLikedVideo()
    },[user])

    
  return (
    <div className="md:pt-20 sm:pt-8 px-10 flex flex-col space-y-8 justify-center items-start " >
        <div className="flex items-center space-x-2">
           
        <h2 className="text-3xl font-semibold">Liked Videos</h2>
        </div>
        
        {
           likedVideo && <div className="gap-4 sm:flex sm:flex-col md:flex md:flex-row md:flex-wrap">
            {
               likedVideo.map(item=> {
                return  item.map((video:any)=> ( 
                    video.isPublished && <div key={video._id}>
                        <Video
                        key={video._id}
                        videoId={video._id}
                        title={video.title}
                        videoUrl={video.videoFile}
                        thumbnailUrl={video.thumbnail}
                        owner={video.owner}
                        views={video.view}
                        createdAt={video.createdAt}
                        duration={video.duration}
                        description={video.description}
                        isPublished={video.isPublished}
                        edit={false}
                      />
                      </div>    
                   ))
               })
}</div>
        }
        
    </div>
  )
}
