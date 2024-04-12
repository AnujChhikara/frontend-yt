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
    <div className="flex flex-col space-y-8" >
      <div>
      <h2 className="md:text-4xl sm:text-3xl font-bold">What&apos; New</h2>
      <p className="md:text-sm  sm:text-[12px] pb-4">Explore the latest videos added to our collection. Stay updated with fresh content!</p>
        <div className="md:flex md:flex-row md:flex-wrap  md:gap-8 sm:flex sm:flex-col sm:space-y-6 md:space-y-0 ">
      
      {videosData && <>
             {
             
              videosData.data.slice().reverse().slice(0, 4).map((video:any = {}) => (
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
    </div>  </div>
    
    <div>
    <h2 className="sm:text-2xl text-gray-400  font-bold pb-4">Humor that Connects</h2>
     
        <div className="md:flex md:flex-row md:flex-wrap md:gap-8  sm:flex sm:flex-col sm:space-y-6 md:space-y-0 ">
      
      {videosData && <>
             {
             
              videosData.data.slice().reverse().filter((video:any = {}) => video.category === 'comedy').slice(0, 4).map((video:any = {}) => (
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

    <div>
    <h2 className="sm:text-2xl text-gray-400  font-bold pb-4">Play Beyond Limits</h2>
     
        <div className="md:flex md:flex-row md:flex-wrap  md:gap-8 sm:flex sm:flex-col sm:space-y-6 md:space-y-0 ">
      
      {videosData && <>
             {
             
              videosData.data.slice().reverse().filter((video:any = {}) => video.category === 'gaming').slice(0, 4).map((video:any = {}) => (
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

    <div>
    <h2 className=" sm:text-2xl text-gray-400  font-bold pb-4">Melodies Unleashed</h2>
     
        <div className="md:flex md:flex-row md:flex-wrap  md:gap-8 sm:flex sm:flex-col sm:space-y-6 md:space-y-0 ">
      
      {videosData && <>
             {
             
              videosData.data.slice().reverse().slice(0, 4).filter((video:any = {}) => video.category === 'music').map((video:any = {}) => (
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

    <div>
    <h2 className="sm:text-2xl text-gray-400 font-bold pb-4">Tech That Empowers</h2>
     
        <div className="md:flex md:flex-row md:flex-wrap  md:gap-8 sm:flex sm:flex-col sm:space-y-6 md:space-y-0 ">
      
      {videosData && <>
             {
             
              videosData.data.slice().reverse().filter((video:any = {}) => video.category === 'tech').slice(0, 4).map((video:any = {}) => (
          
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

    </div>
  )
}
