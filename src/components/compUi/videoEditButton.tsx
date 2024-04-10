
"use client"

import * as React from "react"
import { MoreHorizontal, Pencil, Trash} from "lucide-react"

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
import { deleteVideo } from "@/functions"
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



export function VideoEditButton({videoId}:{videoId:string}) {

    const dispatch = useDispatch()


    const data =  useSelector((state:any) => state.user)
    const user = data.user[0] 
    const [isVideoDeleted, setIsVideoDeleted] = React.useState(false)

    if(!user) {
        redirect('/login')
    }

  const [open, setOpen] = React.useState(false)
  const [isDeleting, setIsDeleting] = React.useState(false)
  const deletingVideo = async () => await deleteVideo({id:videoId, accessToken:user.accessToken})


  const handleDeleteVideo = async() => {
    setIsDeleting(true)
     const response = await deletingVideo()
     if(response.data.response.acknowledged === true) {
         dispatch(userActions.isChanged({}))
        setIsVideoDeleted(true)
     }
   
    setIsDeleting(false)
  }

  return (
    <div className="">
      
      <DropdownMenu open={open} onOpenChange={setOpen}>
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
        <AlertDialogTrigger className='py-1 text-red-600  font-bold text-[15px] rounded'>
        <div className="flex space-x-1">
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
             
              
          
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
