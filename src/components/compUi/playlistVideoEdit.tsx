'use client'

import { AddVideoToPlaylist, GetUserPlaylists } from "@/functions"
import { userActions } from "@/store/userSlice"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "sonner"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { EllipsisVertical } from "lucide-react"
import { useEffect, useState } from "react"

export default function AddVideoToPlaylistComp({videoId}:{videoId:string}) {
    const data =  useSelector((state:any) => state.user)
    const user = data.user[0] 
    const dispatch = useDispatch()
    const [userPlaylistData, setUserPlaylistData] = useState<any>([]) 
   

    //get user playlists
  
  const handleButtonClick = async (playlistId:string) => {
    const response = await AddVideoToPlaylist({accessToken:user.accessToken, videoId, playlistId})
    if(response.status === true){
      dispatch(userActions.isChanged({})) 
      toast("Video Added", {
        description: 'Video added to playlist successfully',
        action: {
          label: "Okay",
          onClick: () => {},
        },
      }) 
    } else{
      toast("Failed", {
        description: 'failed to add video to playlist',
        action: {
          label: "Okay",
          onClick: () => {},
        },
      }) 
  
    }
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
    <div className="h-5">
   <DropdownMenu>
  <DropdownMenuTrigger><EllipsisVertical/></DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Add To Playlist</DropdownMenuLabel>
    <DropdownMenuSeparator />
   {userPlaylistData && userPlaylistData.map((playlist:any) => (
      <DropdownMenuItem key={playlist._id}><button onClick={()=> handleButtonClick(playlist._id)}>{playlist.name}</button></DropdownMenuItem>
 
   ))}

   
  </DropdownMenuContent>
</DropdownMenu>
      
    </div>
  )
}
