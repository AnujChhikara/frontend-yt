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
      <h2 className="text-4xl font-bold">What&apos; New</h2>
      <p className="text-sm pb-4">Explore the latest videos added to our collection. Stay updated with fresh content!</p>
        <div className="flex flex-wrap  gap-y-8">
        

      
      {videosData && <>
             {
             
              videosData.data.slice(0, 10).reverse().map((video:any = {}) => (
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
                  isPublished={video.isPublished}
                
                />
                
              ))
             }
             </>}
    </div>
    </div>
  )
}
