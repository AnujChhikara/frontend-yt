'use client'

import Video from "@/components/video"
import { getUserWatchHistory } from "@/functions"
import { History } from "lucide-react"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

export default function WatchHistory() {

    const userData = useSelector((state:any)=> state.user)
    const user = userData.user[0]
    const [watchHistory, setWatchHistory]= useState<any[]>()

    if(!user){
        redirect('/')
    }

    useEffect(()=> {
        const userWatchHistory = async() => {
            const response = await getUserWatchHistory({accessToken:user.accessToken})

            if(response.status === true) {
                const data = response.data
                setWatchHistory(data.data)
            }
            else{
                const error = response.data
                console.log(error)
                
            }
        }

        userWatchHistory()
    },[user])

    
  return (
    <div className="md:pt-20 sm:pt-8 px-10 flex flex-col space-y-8 justify-center items-start" >
        <div className="flex items-center space-x-2">
            <History size={32} />
        <h2 className="text-3xl font-semibold">Watch History</h2>
        </div>
        
        {
            watchHistory && <div className="gap-4 sm:flex sm:flex-col md:flex md:flex-row md:flex-wrap">
            {
               watchHistory.map((video)=> (
                video.isPublished && <div key={video._id}>
                        <Video
                        key={video._id}
                        videoId={video._id}
                        title={video.title}
                        videoUrl={video.videoFile}
                        thumbnailUrl={video.thumbnail}
                        owner={video.owner._id}
                        views={video.view}
                        createdAt={video.createdAt}
                        duration={video.duration}
                        description={video.description}
                        isPublished={video.isPublished}
                        edit={false}
                      />
                      </div>    
               ))
}</div>
        }
        
    </div>
  )
}
