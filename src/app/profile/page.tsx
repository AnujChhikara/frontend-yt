'use client'


import Image from "next/image"
import Link from "next/link"
import { useSelector } from "react-redux"
import Video from "@/components/video"
import { useEffect, useState } from "react"
import PlaylistCard from '@/components/PlaylistCard'
import { History, ListVideo, Pencil } from "lucide-react"
import { redirect } from "next/navigation"
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
    
    
    if(!user) {
      redirect('/')
    }

      //fetching user watch history 
    
    useEffect(() => {

        const fetchVideo = async() => {
          try {
            const response = await fetch(process.env.url + '/users/history',{
              method:'Get',
              headers:{
                'Authorization': `Bearer ${user.accessToken}`
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
        
      }, [data, user.accessToken]);
  
     //fetching user playlists

     useEffect(() => {

        const fetchPlaylists = async() => {
          try {
            const response = await fetch(process.env.url + '/playlist/user/66052f4e5ff551c458b6f9d4',{
              method:'Get',
              headers:{
                'Authorization': `Bearer ${user.accessToken}`
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
        
      }, [data, user.accessToken]);
 

    
      

  return (
    <div className="px-40 pt-12">
        {
            user &&<>
            <div className="flex flex-col space-y-12 ">
                <div className="flex items-center  space-x-20
                 justify-between">
            <Link href='/viewChannel' className="flex space-x-4 items-center ">
             <Image width={100} height={100} className="w-40 h-40 rounded-full" src={user.avatar} alt="user image" />
            <div>
                <h2 className="font-semibold text-4xl">{user.fullName}</h2>
                <h3 className="flex items-center gap-2">@{user.username}. <p className="text-sm text-gray-400">Explore Your Channel</p></h3>
            </div>
            </Link>
            <div className="bg-accent text-lg px-4 py-2 rounded-md hover:opacity-50 duration-500">
              <Link className="flex items-center space-x-2" href='/editProfile'>
               <p>Edit Profile</p><Pencil />
              </Link>
            </div>
       
            </div>
           {/* user history div start */}
            <div className="flex flex-col space-y-4">

                <h3 className="flex space-x-2">
                <History size={32} color="#6c6a6a" />
                    <p className="text-2xl font-bold">History</p>
                </h3>
                <div className="flex flex-wrap gap-12">
                  {userHistoryData && <>
                  {
                    userHistoryData.map((video) => (
                      
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
                    <ListVideo size={32} color="#6c6a6a" />
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
