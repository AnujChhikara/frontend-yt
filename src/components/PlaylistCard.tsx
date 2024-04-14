import { ListVideo,Trash2Icon} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import {  useEffect, useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { DeletedPlaylist } from '@/functions'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { userActions } from '@/store/userSlice'


export default function PlaylistCard({owner,thumbnail,accessToken,ownerId,playlistId,userId, name,updatedAt, videoCount}:any) {

 const [isOwner, setIsOwner] = useState(false)
 const dispatch = useDispatch()

 useEffect(()=>{
  if(userId === ownerId){
    setIsOwner(true)
  }
 }, [userId, ownerId])

 const handleDeletePlaylist = async() =>{
  const response = await DeletedPlaylist({accessToken:accessToken, playlistId:playlistId})
 if(response.status === true){
  dispatch(userActions.isChanged({}))
  
  toast("Playlist Deleted", {
    description: 'Plalist has been Deleted successfully',
    action: {
      label: "Okay",
      onClick: () => {},
    },
  }) 
 } 
 else{
  toast("Failed", {
    description: 'Error while deleting playlist',
    action: {
      label: "Okay",
      onClick: () => {},
    },
  }) 


 }

}

  return (
    <div className='w-80 '>
      <Link href={`/userPlaylist/playlist/${playlistId}`} className='flex items-end space-x-56 md:hover:opacity-60 duration-500'>
       <Image width={320} height={200} className='w-80 h-[200px] rounded-xl border-double  border-t-4 border-r-4 shadow-md shadow-zinc-400  border-gray-400 ' src={thumbnail} alt='playlist thumbnail'/>
       <span className='bg-black p-0.5 rounded bg-opacity-60 flex justify-center items-center text-white absolute text-sm mb-2'><ListVideo /><p>{videoCount} videos</p></span>
       </Link>
        <div className='flex flex-col  pt-4 space-y-1 '>
        <div className='font-semibold text-lg'>{name}</div>
        <div className='flex items-center space-x-4'>
          <Link className='border border-accent px-2 border-dashed py-0.5' href={`/viewChannel/${ownerId}`}>{owner}</Link>
       
        <p className='text-[12px] text-gray-400'>updated {updatedAt}</p>
        {
          isOwner && 
          <AlertDialog>
      <AlertDialogTrigger className='py-1 pl-2 text-red-600  font-bold text-[15px] rounded'>
      <div className="flex justify-center items-center space-x-1">
              <Trash2Icon size={24} className="mr-2 " />
             
              </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Do you really want to delete the playlist?</AlertDialogTitle>
         
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className='bg-red-500 text-white'> <div onClick={handleDeletePlaylist} className=''>Delete</div></AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
        }
        </div>
       
        
        </div>
        
    </div>
  )
}
