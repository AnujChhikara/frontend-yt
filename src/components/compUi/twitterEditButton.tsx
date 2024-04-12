
"use client"

import * as React from "react"
import { Pencil, Settings2, Trash} from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
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
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { DeleteTweet, UpdateTweet } from "@/functions"
import { toast } from "sonner"



export function TweetEditButton({tweetId, tweet}:{tweetId:string, tweet:string}) {

    const dispatch = useDispatch()


    const data =  useSelector((state:any) => state.user)
    const user = data.user[0] 
    const textareaRef = React.useRef<HTMLTextAreaElement>(null)

    if(!user) {
        redirect('/login')
    }

  const [open, setOpen] = React.useState(false)
  const [isDeleting, setIsDeleting] = React.useState(false)
  const [isUpdating, setIsUpdating] = React.useState(false)
//   const deletingVideo = async () => await deleteVideo({id:videoId, accessToken:user.accessToken})
//   const togglePublishStatus = async() => await TogglePublish({videoId:videoId, accessToken:user.accessToken})

//   const handleDeleteVideo = async() => {
//     setIsDeleting(true)
//      const response = await deletingVideo()
//      if(response.data.response.acknowledged === true) {
//          dispatch(userActions.isChanged({}))
        
//      }
   
//     setIsDeleting(false)
//   }

//   const handlePublishToggle = async() => {

//      const response = await togglePublishStatus()
//      if(response.success === true) {
//      const publishStatus =response.data.data.isPublished
//       setIsPublishedStatus(publishStatus)
//          dispatch(userActions.isChanged({}))
        
//      }

//      else{
//       console.log(response.data)
//      }
   
//     setIsDeleting(false)
//   }

//updating tweet
  const handleUpdateTweet = async() => {
    const updatedTweet = textareaRef.current!.value
    setIsUpdating(true)
    const response = await UpdateTweet({tweetId , accessToken:user!.accessToken,updatedTweet})

    if(response.status === true){
        toast("Tweet Updated", {
            description: 'Your Tweet has been updated Successfully',
            action: {
              label: "Okay",
              onClick: () => {},
            },
          })
        dispatch(userActions.isChanged({}))
    } 

    else{
        toast("Tweet Updated Failed!", {
            description: 'failed to update your tweet right now',
            action: {
              label: "Okay",
              onClick: () => {},
            },
          })
          setIsUpdating(false)
    }

    setIsUpdating(false)
  }

  //deleting tweet
  const handleDeleteTweet = async() => {
 
    setIsDeleting(true)
    const response = await DeleteTweet({tweetId , accessToken:user!.accessToken})

    if(response.status === true){
        toast("Tweet Deleted", {
            description: 'Your Tweet has been Deleted Successfully',
            action: {
              label: "Okay",
              onClick: () => {},
            },
          })
        dispatch(userActions.isChanged({}))
    } 

    else{
        toast("Deleting Tweet Failed!", {
            description: 'failed to delete your tweet right now',
            action: {
              label: "Okay",
              onClick: () => {},
            },
          })
          setIsDeleting(false)
    }

    setIsDeleting(false)
  }

  return (
    <div className="w-4">
      
      <DropdownMenu  open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button className="rotate-90 focus:bg-transparent" variant="ghost" size="sm">
          <Settings2 />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px]">
      
          <DropdownMenuGroup>
          <AlertDialog>
        <AlertDialogTrigger className='py-1 pl-2  rounded'>
        <div className="flex justify-center items-center space-x-1">
        <Pencil size={20} className="mr-" />
              <h5>{
                    isUpdating? ' Updating Tweet' : 'Edit Tweet'
                 }</h5>
              </div> 
        </AlertDialogTrigger>
        <AlertDialogContent className="flex flex-col justify-center items-center">
          <AlertDialogHeader>
            <AlertDialogTitle>
                <Textarea ref={textareaRef} rows={2} className="w-[300px]" defaultValue={tweet}/>
            </AlertDialogTitle>
           
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-6" >
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction > <div onClick={handleUpdateTweet}>Update Tweet</div></AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
           
            <DropdownMenuSeparator />
         
            <AlertDialog>
        <AlertDialogTrigger className='py-1 pl-2 text-red-600  font-bold text-[15px] rounded'>
        <div className="flex justify-center items-center space-x-1">
                <Trash className="mr-2 h-4 w-4" />
                 {
                    isDeleting? ' Deleting Tweet' : ' Delete Tweet'
                 }
              <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                </div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Click Delete to confirm.</AlertDialogTitle>
           
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-red-500" > <div onClick={handleDeleteTweet}  >Delete</div></AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

  
    

          
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
