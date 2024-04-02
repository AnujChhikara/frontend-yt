
'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

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



export default function ViewVideo({params}:{params: {slug:string}}) {
  const [videoData, setVideoData] = useState<VideoData>()

  const id = params.slug
  const data =  useSelector((state:any) => state.user)
  const user = data.user[0]
  if(!user){
    return <div>
      Not Authorized or please login first
    </div>
  }
  else{
  const accessToken = user.accessToken
  
   
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {

    const fetchVideo = async() => {
      try {
        const response = await fetch(process.env.url + '/videos/'+ id,{
          method:'Get',
          headers:{
            'Authorization': `Bearer ${accessToken}`
          }

        })

        if(response.ok){
           const res_data = await response.json()
           const video = res_data.video
           console.log(res_data)
           setVideoData(video)
        }
        else{
          const error = await response.json()
          console.log(error)
        }
      } catch (error) {
        console.log(error)
      }
    }
    if(id){
      fetchVideo()
    }
  }, [id, data, accessToken]);
 
  
 
  return (
    <div className="flex flex-col justify-center items-center mt-20">
      {videoData && <div className="flex flex-col space-y-4 justify-start">
         <video className="rounded-2xl shadow-gray-400 shadow-lg mb-6" width="800" height="800" controls>
        <source src={videoData!.videoFile} type="video/mp4"/>
        
      Your browser does not support the video tag.
      </video>
      <h3 className="text-3xl font-bold">{videoData.title}</h3>
      <div className="flex justify-between items-center"> 
      <div className="flex space-x-4 items-center">
      <Avatar className="w-20 h-20" >
          <AvatarImage src={user.avatar} />
          <AvatarFallback>AC</AvatarFallback>
      </Avatar>
      <div>
      <h3 className="font-semibold text-xl">{user.fullName}</h3>
      <p className="tex-sm text-gray-400">xx Subscribers</p>
      </div>
      </div>
      <div className="flex space-x-4 font-bold bg-gray-900 px-4 py-2 rounded-3xl ">
        <div className="flex items-end space-x-2 ">
          <div className="flex items-end space-x-1 ">
            <button>
        <svg className="w-8 " viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" stroke-linejoin="round"/>
            <g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12.444 1.35396C11.6474 0.955692 10.6814 1.33507 10.3687 2.16892L7.807 9.00001L4 9.00001C2.34315 9.00001 1 10.3432 1 12V20C1 21.6569 2.34315 23 4 23H18.3737C19.7948 23 21.0208 22.003 21.3107 20.6119L22.9773 12.6119C23.3654 10.7489 21.9433 9.00001 20.0404 9.00001H14.8874L15.6259 6.7846C16.2554 4.89615 15.4005 2.8322 13.62 1.94198L12.444 1.35396ZM9.67966 9.70225L12.0463 3.39119L12.7256 3.73083C13.6158 4.17595 14.0433 5.20792 13.7285 6.15215L12.9901 8.36755C12.5584 9.66261 13.5223 11 14.8874 11H20.0404C20.6747 11 21.1487 11.583 21.0194 12.204L20.8535 13H17C16.4477 13 16 13.4477 16 14C16 14.5523 16.4477 15 17 15H20.4369L20.0202 17H17C16.4477 17 16 17.4477 16 18C16 18.5523 16.4477 19 17 19H19.6035L19.3527 20.204C19.2561 20.6677 18.8474 21 18.3737 21H8V10.9907C8.75416 10.9179 9.40973 10.4221 9.67966 9.70225ZM6 11H4C3.44772 11 3 11.4477 3 12V20C3 20.5523 3.44772 21 4 21H6V11Z" fill="#6b6b6b"/> </g>
            </svg></button>
            <p>Likes No.</p>
            </div>
            <div className="h-full bg-gray-300 w-[1px]"></div>
        </div>
      
        <button className="flex items-end">
          <svg className="w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" stroke-linejoin="round"/>
          <g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M11.556 22.646C12.3525 23.0443 13.3186 22.6649 13.6313 21.8311L16.193 15L20 15C21.6568 15 23 13.6569 23 12L23 4C23 2.34315 21.6568 1 20 1L5.62625 1C4.20523 1 2.97914 1.99698 2.68931 3.38814L1.02265 11.3881C0.634535 13.2511 2.05665 15 3.95959 15H9.11255L8.37409 17.2154C7.7446 19.1039 8.59952 21.1678 10.38 22.058L11.556 22.646ZM14.3203 14.2978L11.9537 20.6088L11.2744 20.2692C10.3842 19.8241 9.95671 18.7921 10.2715 17.8479L11.0099 15.6325C11.4416 14.3374 10.4777 13 9.11256 13H3.95959C3.32527 13 2.85124 12.417 2.98061 11.7961L3.14645 11L6.99998 11C7.55226 11 7.99998 10.5523 7.99998 10C7.99998 9.44772 7.55226 9.00001 6.99998 9.00001L3.56312 9.00001L3.97978 7.00001L6.99998 7.00001C7.55226 7.00001 7.99998 6.55229 7.99998 6.00001C7.99998 5.44772 7.55226 5.00001 6.99998 5.00001L4.39645 5.00001L4.64727 3.79605C4.74388 3.33233 5.15258 3 5.62625 3L16 3L16 13.0093C15.2458 13.0821 14.5903 13.5779 14.3203 14.2978ZM18 13H20C20.5523 13 21 12.5523 21 12L21 4C21 3.44772 20.5523 3 20 3L18 3L18 13Z" fill="#6b6b6b"/> </g>
          </svg>
         </button>
      </div>
      </div>
      </div>
}
    </div>
  )
}}
