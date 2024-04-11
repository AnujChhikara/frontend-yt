
"use client"

import * as React from "react"
import { MoreHorizontal, Pencil, Trash} from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { TogglePublish, deleteVideo } from "@/functions"
import { useDispatch, useSelector } from "react-redux"
import { redirect } from "next/navigation"
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
import { userActions } from "@/store/userSlice"



export function VideoEditButton({videoId, isPublished}:{videoId:string, isPublished:boolean}) {

    const dispatch = useDispatch()


    const data =  useSelector((state:any) => state.user)
    const user = data.user[0] 
    const[isPublishedStatus, setIsPublishedStatus] = React.useState(isPublished)

    if(!user) {
        redirect('/login')
    }

  const [open, setOpen] = React.useState(false)
  const [isDeleting, setIsDeleting] = React.useState(false)
  const deletingVideo = async () => await deleteVideo({id:videoId, accessToken:user.accessToken})
  const togglePublishStatus = async() => await TogglePublish({videoId:videoId, accessToken:user.accessToken})

  const handleDeleteVideo = async() => {
    setIsDeleting(true)
     const response = await deletingVideo()
     if(response.data.response.acknowledged === true) {
         dispatch(userActions.isChanged({}))
        
     }
   
    setIsDeleting(false)
  }

  const handlePublishToggle = async() => {

     const response = await togglePublishStatus()
     if(response.success === true) {
     const publishStatus =response.data.data.isPublished
      setIsPublishedStatus(publishStatus)
         dispatch(userActions.isChanged({}))
        
     }

     else{
      console.log(response.data)
     }
   
    setIsDeleting(false)
  }

  

  return (
    <div className="w-4">
      
      <DropdownMenu  open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button className="rotate-90 focus:bg-transparent" variant="ghost" size="sm">
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px]">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuGroup>
          <Link href={`/editVideo/${videoId}`}>
            <DropdownMenuItem>
              <Pencil size={20} className="mr-2" />
              Edit Video
            </DropdownMenuItem>
            </Link> 
            <DropdownMenuSeparator />
         
            <AlertDialog>
        <AlertDialogTrigger className='py-1 pl-2 text-red-600  font-bold text-[15px] rounded'>
        <div className="flex justify-center items-center space-x-1">
                <Trash className="mr-2 h-4 w-4" />
                 {
                    isDeleting? ' Deleting Video' : ' Delete Video'
                 }
              <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                </div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Click continue to delete video.</AlertDialogTitle>
           
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction> <div onClick={handleDeleteVideo}>Continue</div></AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <DropdownMenuSeparator />

       <div onClick={handlePublishToggle} className="flex text-sm pl-3 py-2 items-center space-x-2">
        {isPublished?<p>Make It Private</p>:<p>Private Video</p>}<Switch checked={!isPublishedStatus} /></div>      
    

          
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
