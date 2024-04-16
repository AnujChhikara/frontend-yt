'use client'

import Video from '@/components/video'
import { getChannelStats } from '@/functions'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

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
export default function ChannelStats() {
    const userData =  useSelector((state:any) => state.user)
    const user = userData.user[0] 
   const [channelStats, setChannelStats] = useState<MyData>()
  
      if(!user) { 
        redirect('/')
      }


      useEffect(()=>{

        const getUserChannel = async() => {
         const stats =  await getChannelStats({accessToken:user.accessToken, channelId:user.id})
         setChannelStats(stats)

        }

        getUserChannel()

     
      },[user])


  return (
    <div className='w-scree h-auto flex justify-center '>
        <div className='border flex flex-col justify-start items-center space-y-8 border-zinc-700 px-4 rounded-xl md:p-8 sm:w-11/12 sm:pt-4  md:w-5/6 md:h-5/6 md:mt-12 sm:mt-6'>
           <h2 className='font-bold mb-4 text-4xl  underline'>Dashboard</h2>
           <div className='md:flex md:flex-row md:space-y-0 sm:flex sm:flex-col sm:space-y-3 justify-start md:space-x-20'>
            <div className='w-60 h-32 p-4 flex justify-start items-center flex-col space-y-4 rounded-lg border border-zinc-700'>
                <h3 className='font-semibold '>Videos Uploaded</h3>
                <p>{channelStats?.allVideos.length}</p>
            </div>
            <div className='w-60 h-32 p-4 flex justify-start items-center flex-col space-y-4 rounded-lg border border-zinc-700'>
                <h3 className='font-semibold '>Total Subscribers</h3>
                <p>{channelStats?.totalSubscribers
}</p>
            </div>
            <div className='w-60 h-32 p-4 flex justify-start items-center flex-col space-y-4 rounded-lg border border-zinc-700'>
                <h3 className='font-semibold '>Total Views</h3>
                <p>{channelStats?.totalViews}</p>
            </div>
           </div>
           <div className='flex flex-col justify-center items-center'>
            <h2 className='font-bold mb-4 text-3xl  underline'>Recent Videos</h2>
            <div className='grid md:grid-cols-2 sm:grid-cols-1 md:gap-6 sm:gap-4 py-4'>
            {channelStats && <>
             {
          
              channelStats.allVideos.slice(0, 3).map((video:any = {}) => (
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
                  edit={true}
                  isPublished={video.isPublished}
                />
                
              ))
             }
             </>}
            </div>
           </div>
        </div>

    </div>
  )
}
