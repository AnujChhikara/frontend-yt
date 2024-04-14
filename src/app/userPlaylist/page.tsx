'use client'

import PlaylistCard from '@/components/PlaylistCard'
import { Plus } from 'lucide-react'
import { redirect } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from '@/components/ui/textarea'
import { useDebugValue, useEffect, useRef, useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { CreatePlaylist, GetUserPlaylists, formatTimeDifference } from '@/functions'
import { title } from 'process'
import { toast } from 'sonner'
import { userActions } from '@/store/userSlice'

export default function PlaylistPage() {
   
  const dispatch = useDispatch()
  const data =  useSelector((state:any) => state.user)
  const user = data.user[0]  
  const [userPlaylistData, setUserPlaylistData] = useState<any>([])
  const [isPosting, setIsPosting] = useState(false) 
  const buttonRef = useRef<HTMLButtonElement>(null) 
  if(!user){
    redirect('/')
  }

  //new Playlist 

  const handleFormSubmittion = async(event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsPosting(true)
    const selectElement:any = document.getElementById('category');
    const category = selectElement?.value;
    const fd = new FormData(event.currentTarget)
    const data =  Object.fromEntries(fd.entries())
    const name = data.name
    const description = data.description

    
    const response = await CreatePlaylist({accessToken:user.accessToken,category,description,name})
    if(response.status === true){
      setIsPosting(false)

      dispatch(userActions.isChanged({})) 
      buttonRef.current?.click()
      toast("Playlist Created", {
        description: 'Plalist has been created successfully',
        action: {
          label: "Okay",
          onClick: () => {},
        },
      }) 

    }
    else{
      setIsPosting(false)
      toast("Failed", {
        description: 'Error while creating playlist',
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
    <div className='mx-12 py-8 flex flex-col space-y-8'>
      <div className='flex justify-between'>
      <h3 className='text-3xl font-semibold'>Playlists</h3>
     
  
        <Dialog>
            <DialogTrigger className=''> 
            <div className='flex items-center rounded-xl hover:opacity-80 duration-700 ease-out bg-accent px-2 py-2 font-semibold space-x-1'>
            <h4>New Playlist </h4><Plus size={24}/></div>
        </DialogTrigger>
            <DialogContent>
              <DialogHeader>
              <DialogTitle className='text-gray-400 text-center'>Create New Playlist</DialogTitle>
        
            <form className='flex pt-8 flex-col justify-start items-start space-y-4' onSubmit={handleFormSubmittion}>
             <div className='flex justify-between items-start space-x-4'>
             <div className='flex flex-col space-y-2'>
             <Label htmlFor='name'>Name</Label>
              <Input id='name' name='name' className='h-8 w-60'/>
             </div>

                   <div className='flex flex-col justify-start space-y-2'>
             <Label htmlFor="category">Select Playlist Category</Label>
                  <select className='w-28 h-8 border border-accent px-2 rounded-lg space-y-2' id="category" >
                    <option className='' value="general">General</option>
                    <option className='' value="gaming">Gaming</option>
                    <option className='' value="tech">Tech</option>
                    <option className='' value="comedy">Comedy</option>
                    <option className='' value="music">Music</option>
                  </select>
                  </div>
             </div>
            
              <div className='flex flex-col space-y-2'>
              <Label htmlFor='description'>Description</Label>
              <Textarea id='description' name='description' className='w-60' />

              </div>

              {
                isPosting? <button disabled className='px-8 bg-gray-400 rounded-xl animate-pulse  duration-500 text-accent font-bold  py-2 '>creating playlist..</button>:
                <button className='px-8 hover:bg-gray-400 rounded-xl duration-500 text-accent font-bold  py-2 bg-white'>Create Playlist</button>
              }
            
            </form>
        
        </DialogHeader>
        <DialogClose asChild>
        <button ref={buttonRef} className='hidden'>close</button>
      </DialogClose>
      </DialogContent>
      
          </Dialog>
      </div>

      <div className='flex flex-wrap gap-8' >
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
