'use client'

import { getAllPublishedVideos } from "@/functions"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Video from "./video"



export default function HomePage() {
    const [videosData, setVideosData] = useState<any>()
    const userData =  useSelector((state:any) => state.user)
   const user = userData.user[0]   
    useEffect(()=> {
        const fetchVideos = async() => {
        const response = await  getAllPublishedVideos({accessToken:user.accessToken})
        setVideosData(response.data)
        
        }

        if(user){
            fetchVideos()
        }
      }, [user])  

     
  return (
    <div >
        <div className="flex flex-wrap gap-x-4 gap-y-8">

      
      {videosData && <>
             {
             
              videosData.data.map((video:any = {}) => (
                <Video
                key={video._id}
                videoId={video._id}
                title={video.title}
                videoUrl={video.videoFile}
                thumbnailUrl={video.thumbnail}
                  owner={video.owner}
                  views={video.view}
                  createdAt= {video.createdAt}
                  duration = {video.duration}
                  description= {video.description}
                  edit={false}
                
                />
                
              ))
             }
             </>}
    </div>
    </div>
  )
}
