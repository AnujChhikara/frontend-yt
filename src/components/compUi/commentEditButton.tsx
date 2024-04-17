import {EllipsisVerticalIcon } from 'lucide-react'
import React from 'react'
import { Pencil,Settings2, Trash} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
import { Textarea } from "../ui/textarea"
import { userActions } from "@/store/userSlice"
import { toast } from "sonner"
import { DeleteComment, UpdateComment } from '@/functions'

export default function CommentEditButton({commentId, comment}:{commentId:string, comment:string}) {
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
 

//updating tweet
  const handleUpdateComment = async() => {
    const updatedComment = textareaRef.current!.value
    setIsUpdating(true)
    const response = await UpdateComment({commentId , accessToken:user!.accessToken,updatedComment})

    if(response.status === true){
        toast("Comment Updated", {
            description: 'Your Comment has been updated Successfully',
            action: {
              label: "Okay",
              onClick: () => {},
            },
          })
        dispatch(userActions.isChanged({}))
    } 

    else{
        toast("Comment Updated Failed!", {
            description: 'failed to update your comment right now',
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
  const handleDeleteComment = async() => {
 
    setIsDeleting(true)
    const response = await DeleteComment({commentId, accessToken:user!.accessToken})

    if(response.status === true){
        toast("Comment Deleted", {
            description: 'Your Comment has been Deleted Successfully',
            action: {
              label: "Okay",
              onClick: () => {},
            },
          })
        dispatch(userActions.isChanged({}))
    } 

    else{
        toast("Deleting Comment Failed!", {
            description: 'failed to delete your comment right now',
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
      
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
        
          <EllipsisVerticalIcon/>
         
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px]">
      
          <DropdownMenuGroup>
          <AlertDialog>
        <AlertDialogTrigger className='py-1 pl-2  rounded'>
        <div className="flex justify-center items-center space-x-1">
        <Pencil size={20} className="mr-" />
              <h5>{
                    isUpdating? ' Updating comment' : 'Edit comment'
                 }</h5>
              </div> 
        </AlertDialogTrigger>
        <AlertDialogContent className="flex flex-col justify-center items-center">
          <AlertDialogHeader>
            <AlertDialogTitle> 
                <Textarea ref={textareaRef} rows={2} className="w-[300px]" defaultValue={comment}/>
            </AlertDialogTitle>
           
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-6" >
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction > <div onClick={handleUpdateComment}>Update comment</div></AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
           
            <DropdownMenuSeparator />
         
            <AlertDialog>
        <AlertDialogTrigger className='py-1 pl-2 text-red-600  font-bold text-[15px] rounded'>
        <div className="flex justify-center items-center space-x-1">
                <Trash className="mr-2 h-4 w-4" />
                 {
                    isDeleting? ' Deleting comment' : ' Delete comment'
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
            <AlertDialogAction className="bg-red-500" > <div onClick={handleDeleteComment}  >Delete</div></AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

  
    

          
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

