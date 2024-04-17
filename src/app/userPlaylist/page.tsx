'use client'

import PlaylistCard from '@/components/PlaylistCard'
import { redirect } from 'next/navigation'
import {  useSelector } from 'react-redux'
import { useEffect,useState } from 'react'
import { GetUserPlaylists, formatTimeDifference } from '@/functions'
import AddVideoToPlaylistComp from '@/components/compUi/addVideoToPlaylist'


export default function PlaylistPage() {
   
  const data =  useSelector((state:any) => state.user)
  const user = data.user[0]  
  const [userPlaylistData, setUserPlaylistData] = useState<any>([]) 
  if(!user){
    redirect('/')
  }


  //getting user Playlists
  
  useEffect(()=>{
    const getUserPlaylist = async()=> {
      const response = await GetUserPlaylists({accessToken:user.accessToken, userId:user.id})
      if(response.status===true){
        setUserPlaylistData(response.data.data)
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
    <div className='md:mx-12 sm:mx-4 py-8 flex flex-col space-y-8'>
      <div className='flex justify-between'>
      <h3 className='text-3xl font-semibold'>Playlists</h3>
     
  
       <AddVideoToPlaylistComp videoId='fdjwere' isWatchingPage={false}/>
      </div>

      <div className='flex flex-wrap md:gap-8 sm:space-y-6' >
        {/* get user playlists */}
  
        {
          userPlaylistData && 
          userPlaylistData.map((playlist:any)=>{
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
  )
}
