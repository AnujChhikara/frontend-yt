'use client'


import Image from "next/image"
import Link from "next/link"
import { useSelector } from "react-redux"
import Video from "@/components/video"
import { useEffect, useState } from "react"
import PlaylistCard from '@/components/PlaylistCard'

interface Owner {
    _id: string;
    username: string;
    fullName: string;
    avatar: string;
}
  
interface HistoryData {
    _id: string;
    title: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    duration: number;
    isPublished: boolean;
    owner: Owner;
    thumbnail: string;
    videoFile: string;
    view: number;
    __v: number;
}

interface Video {
    _id: string;
    createdAt: string;
    description: string;
    name: string;
    owner: string;
    updatedAt: string;
    videos: any[]; // This should be defined as per the structure of the videos array
    __v: number;
}
  
type Playlist = {
    _id: string;
    createdAt: string;
    description: string;
    name: string;
    owner: string;
    updatedAt: string;
    videos: Video[];
    __v: number;
};
  
export default function UserProfile() {
    const[userHistoryData, setUserHistoryData] = useState<HistoryData[]>([]);
    const[userPlaylists, setUserPlaylists] = useState<Playlist[]>([]);
    const data =  useSelector((state:any) => state.user)
    const user = data.user[0]


    if(!user){
        return <div>
          Not Authorized or please login first
        </div>
      }
      else{
      const accessToken = user.accessToken

      //fetching user watch history 
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {

        const fetchVideo = async() => {
          try {
            const response = await fetch(process.env.url + '/users/history',{
              method:'Get',
              headers:{
                'Authorization': `Bearer ${accessToken}`
              }
    
            })
    
            if(response.ok){
               const res_data = await response.json()
               const watchHistory = res_data.data
               setUserHistoryData(watchHistory)
               
            }
            else{
              const error = await response.json()
              console.log(error)
            }
          } catch (error) {
            console.log(error)
          }
        }
       
          fetchVideo()
        
      }, [data, accessToken]);
  
     //fetching user playlists
     // eslint-disable-next-line react-hooks/rules-of-hooks
     useEffect(() => {

        const fetchPlaylists = async() => {
          try {
            const response = await fetch(process.env.url + '/playlist/user/66052f4e5ff551c458b6f9d4',{
              method:'Get',
              headers:{
                'Authorization': `Bearer ${accessToken}`
              }
    
            })
    
            if(response.ok){
               const res_data = await response.json()
               const userplaylitsData = res_data.data
               setUserPlaylists(userplaylitsData)
               
            }
            else{
              const error = await response.json()
              console.log(error)
            }
          } catch (error) {
            console.log(error)
          }
        }
       
          fetchPlaylists()
        
      }, [data, accessToken]);

      

  return (
    <div className="px-12 pt-6">
        {
            user &&<>
            <div className="flex flex-col space-y-12 ">
                <div className="flex items-center space-x-4 justify-start">
            <Link href='/viewChannel' className="flex space-x-4 items-center ">
             <Image width={100} height={100} className="w-40 h-40 rounded-full" src={user.avatar} alt="user image" />
            <div>
                <h2 className="font-semibold text-4xl">{user.fullName}</h2>
                <h3 className="flex items-center gap-2">@{user.username}. <p className="text-sm text-gray-400">Explore Your Channel</p></h3>
            </div>
            </Link>
       
            </div>
           {/* user history div start */}
            <div className="flex flex-col space-y-4">

                <h3 className="flex space-x-2">
                <svg className="w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.96336 6.30713C1.74958 6.66192 1.86389 7.12283 2.21868 7.33661C2.57346 7.55038 3.03437 7.43607 3.24815 7.08129L1.96336 6.30713ZM2.5879 15.8197C2.43 15.4367 1.99156 15.2543 1.60863 15.4122C1.22569 15.5701 1.04326 16.0086 1.20116 16.3915L2.5879 15.8197ZM11.6058 2.35559C16.9905 2.35559 21.3558 6.72082 21.3558 12.1056L22.8558 12.1056C22.8558 5.89239 17.819 0.855592 11.6058 0.855592L11.6058 2.35559ZM21.3558 12.1056C21.3558 17.4904 16.9905 21.8556 11.6058 21.8556L11.6058 23.3556C17.819 23.3556 22.8558 18.3188 22.8558 12.1056L21.3558 12.1056ZM3.24815 7.08129C4.95544 4.24789 8.05998 2.35559 11.6058 2.35559L11.6058 0.855592C7.51256 0.855591 3.93077 3.04204 1.96336 6.30713L3.24815 7.08129ZM11.6058 21.8556C7.53732 21.8556 4.04917 19.3635 2.5879 15.8197L1.20116 16.3915C2.88598 20.4774 6.90887 23.3556 11.6058 23.3556L11.6058 21.8556Z" fill="#71717A"/>
                    <path d="M2.10477 4.10559L2.10477 7.10559L5.00342 6.62248" stroke="#71717A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M15 11.5L11 13.5V7" stroke="#71717A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                    <p className="text-2xl font-bold">History</p>
                </h3>
                <div className="flex flex-wrap gap-12">
                  {userHistoryData && <>
                  {
                    userHistoryData.map((video) => (
                      
                        <Video
                        key={video._id}
                        videoId={video._id}
                        videoUrl={video.videoFile}
                        thumbnailUrl={video.thumbnail}
                          owner={video.owner}
                          views={video.view}
                          createdAt= {video.createdAt}
                          duration = {video.duration}
                          description= {video.description}
                        
                        />
                        
                    ))
                  }
                  
                  
                  </>}
                </div>

            </div>
             {/* user history div end */}

             {/* user playlist div start */}
            <div className="flex flex-col space-y-4">

                    <h3 className="flex space-x-2">
                    <svg className="w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
                    <g id="SVGRepo_iconCarrier"> <path d="M11 14L3 14" stroke="#c4c4c4" strokeWidth="1.5" strokeLinecap="round"/> <path d="M11 18H3" stroke="#c4c4c4" strokeWidth="1.5" strokeLinecap="round"/> <path d="M18.875 14.1183C20.5288 15.0732 21.3558 15.5506 21.4772 16.2394C21.5076 16.4118 21.5076 16.5881 21.4772 16.7604C21.3558 17.4492 20.5288 17.9266 18.875 18.8815C17.2212 19.8363 16.3942 20.3137 15.737 20.0745C15.5725 20.0147 15.4199 19.9265 15.2858 19.814C14.75 19.3644 14.75 18.4096 14.75 16.4999C14.75 14.5902 14.75 13.6354 15.2858 13.1858C15.4199 13.0733 15.5725 12.9852 15.737 12.9253C16.3942 12.6861 17.2212 13.1635 18.875 14.1183Z" stroke="#c4c4c4" strokeWidth="1.5"/> <path d="M3 6L13.5 6M20 6L17.75 6" stroke="#c4c4c4" strokeWidth="1.5" strokeLinecap="round"/> <path d="M20 10L9.5 10M3 10H5.25" stroke="#c4c4c4" strokeWidth="1.5" strokeLinecap="round"/> </g>
                    </svg>
                        <p className="text-2xl font-bold">Playlists</p>
                    </h3>
                    <div className="flex flex-wrap gap-12">
                        {userPlaylists && <>
                        {
                            userPlaylists.map((playlist) => (
                                <PlaylistCard
                                key={playlist._id}
                                name={playlist.name}
                                description={playlist.description}
                                owner={playlist.owner}
                                
                                />))
                        }
                        
                        </>}
                    </div>

                    </div>
                    {/* user playlist div end */}
            </div>
            </> 
        }
       
        
        </div>
  )
}
}