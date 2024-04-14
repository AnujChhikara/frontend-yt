'use client'

import PlaylistVideo from "@/components/PlaylistVideo"
import { GetPlaylistById, formatTimeDifference, getUserByID } from "@/functions"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

export default function PlaylistInfo({params}:{params: {slug:string}}) {
    const playlistId = params.slug 
    const data =  useSelector((state:any) => state.user)
    const user = data.user[0]  
    const [playlistData, setPlaylistData] = useState<any>({})
    const[ownerDetails, setOwnerDetails] = useState<any>({})

    if(!user){
        redirect('/')
    }

    //getting playlist
    useEffect(()=>{
        const getPlaylistData = async() => {
            const response = await GetPlaylistById({playlistId, accessToken:user.accessToken})

            if(response.status===true){
                setPlaylistData(response.data.data)
            } else{
                console.log('error fetching data')
            }
        }
        if(user){
            getPlaylistData()
        } 
    }, [playlistId,user])

    //getting playlist owner details
    useEffect(()=> { 
        const fetchPlaylistOwner = async() => { 
         const response = await getUserByID({userId:playlistData?.owner, accessToken:user.accessToken})
         if(response.status === true){
          setOwnerDetails(response.data)
    
         }
         else{
          console.log(response.data)
         } 
         
         
        }
        if(playlistData.owner) {
          fetchPlaylistOwner()
     
        }
      }, [user, playlistData])

      let updatedAt;
      let videoCount;

      if(playlistData){
        updatedAt = formatTimeDifference(playlistData.updatedAt)
        videoCount = playlistData.videos ? playlistData.videos.length : 0;
      }

      
  return (
    <div>
      {playlistData?
      <div>
        <div 
        className="flex justify-between bg-gradient-to-t from-gray-700 via-gray-800
         to-black w-screen px-12 py-8">
       <div className="flex-col space-y-3 items-center">
       <h2 className="text-xl font-bold">{playlistData.name}</h2>
      <div className="flex space-x-2" ><h5 className="font-bold">• Description:-</h5> <p> {playlistData.description}</p></div> 
      <div className="flex space-x-2"><h5 className="font-bold">• Total Videos:-</h5>  <p> {videoCount} </p></div> 
      <div className="flex space-x-2"> <h5 className="font-bold">• Category:-</h5> <p> {playlistData.category}</p></div> 
       </div>
       <div>{ownerDetails && 
       <div>
        <h3 className="font-bold">Owner- {ownerDetails.fullName}</h3>
       <p className="text-sm font-bold">last updated- {
         updatedAt
        }</p>
        
        </div>
        }

       </div>
        
        </div>
        <div className="flex flex-wrap gap-8 m-4">
        {videoCount>0 && playlistData.videos.map((video:any) => (
          <PlaylistVideo
          key={video._id}
          videoId={video.video}
          playlistId={playlistId}
          />
        )) 
        }</div>
      </div>
      :
      
      <p>No Such Playlist Exist.</p>}
    </div>
  )
}
