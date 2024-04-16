'use client'


import Image from "next/image"
import Link from "next/link"
import { useSelector } from "react-redux"
import Video from "@/components/video"
import { useEffect, useState } from "react"
import PlaylistCard from '@/components/PlaylistCard'
import { FolderLock, History, ListVideo, Pencil } from "lucide-react"
import { redirect } from "next/navigation"
import { GetUserPlaylists, deleteVideo, formatTimeDifference } from "@/functions"


  
interface HistoryData {
    _id: string;
    title: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    duration: number;
    isPublished: boolean;
    owner: any;
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
    owner: any;
    updatedAt: string;
    videos: any[]; // This should be defined as per the structure of the videos array
    __v: number;
}
  
type Playlist = {
    _id: string;
    createdAt: string;
    description: string;
    name: string;
    owner: any;
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
        
      }, [ user]);
  
     //fetching user playlists
     useEffect(()=>{
      const getUserPlaylist = async()=> { 
        const response = await GetUserPlaylists({accessToken:user.accessToken, userId:user.id})
        if(response.status===true){
          setUserPlaylists(response.data.data)
        }
        else{
          console.log('Error fetching user playlist')
        }
      }
       if(user){
        getUserPlaylist()
       }
    }, [user])
 



  return (
    <div className="md:px-40 sm:px-4 pt-12">
        {
            user &&<>
            <div className="flex flex-col space-y-12 ">
                <div className="md:flex sm:flex sm:flex-col sm:items-start sm:space-y-4 md:space-y-0 md:flex-row items-center  md:space-x-20
                 justify-between">
            <Link href={`/viewChannel/${user.id}`} className="flex space-x-4 items-center ">
             <Image width={100} height={100} className="md:w-40 md:h-40 sm:w-32 sm:h-32 rounded-full" src={user.avatar} alt="user image" />
            <div className="">
                <h2 className="font-semibold md:text-4xl sm:text-2xl">{user.fullName}</h2>
                <h3 className="flex  text-gray-400 font-semibold items-center gap-2">@{user.username}. <p className="md:text-sm  sm:text-[12px] font-bold text-gray-500">Explore Your Channel</p></h3>
            </div>
            </Link>
            <div className="bg-accent text-lg shadow-sm shadow-slate-50 px-4 py-2 rounded-md hover:opacity-50 duration-500">
              <Link className="flex items-center  space-x-2" href='/editProfile'>
               <p>Edit Profile</p><Pencil size={20}/>
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
                    userHistoryData.slice(0.8).map((video) => (
                      
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
                      edit={true}
                    />
                    </div>    
                        
                    ))
                  }
                  
                  
                  </>}
                </div>

            </div>
             {/* user history div end */}

             {/* user playlist div start */}
            <div className="flex flex-col space-y-4">

                    <h3 className="flex space-x-2">
                    <FolderLock size={32} color="#6c6a6a" />
                    
                        <p className="text-2xl font-bold">Private Videos</p>
                    </h3>
                    <div className="flex flex-wrap gap-12">
                  {userHistoryData && <>
                  {
                    userHistoryData.map((video) => (
                      
                      !video.isPublished && <div key={video._id}>
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
                      edit={true}
                    />
                    </div>    
                        
                    ))
                  }
                  
                  
                  </>}
                </div>

                    </div>
                    {/* user playlist div end */}

                    
             {/* user private video div start */}
            <div className="flex flex-col space-y-4">

                  <h3 className="flex space-x-2">
                  <ListVideo size={32} color="#6c6a6a" />
                      <p className="text-2xl font-bold">Playlists</p>
                  </h3>
                  <div className="flex flex-wrap gap-12">
                  {
              userPlaylists && 
              userPlaylists.map((playlist:any)=>{ 
              const updatedAt = formatTimeDifference(playlist.updatedAt)
              const videoCount = playlist.videos ? playlist.videos.length : 0;
              const thumbnail = playlist && playlist.videos && playlist.videos[0] && playlist.videos[0].thumbnail ? playlist.videos[0].thumbnail : 'https://res.cloudinary.com/dlahahicg/image/upload/v1713085405/imgEmpty_n2fiyp.jpg';
          
                        return (
                      <PlaylistCard 
                      key={playlist._id}
                      playlistId={playlist._id}
                      description={playlist.description}
                      owner={user!.fullName}
                      name={playlist.name}
                      thumbnail={thumbnail}
                      videoCount={videoCount}
                      ownerId={playlist.owner}
                      userId={user.id}
                      accessToken={user.accessToken}
                      updatedAt={updatedAt}/>)
          })
                  }
                  </div>

                  </div>
                  {/* user private video div end */}
            </div>
            </> 
        }
       
        
        </div>
  )
}
