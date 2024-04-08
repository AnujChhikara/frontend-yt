'use client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar" 
import { Separator } from "@/components/ui/separator"

export default function Tweets({userId, tweet, createdAt}:{userId:string, tweet:string, createdAt:string}) {
  return (
    <div>

        <div>
          {tweet}
            <div>
                <Avatar>
                <AvatarImage src='' />
                <AvatarFallback>AC</AvatarFallback>
                </Avatar>
                <div>Name</div>
                <p>2 hours Ago</p>
                </div>
            </div>
            <div>
      <div className="space-y-1">
        <h4 className="text-sm font-medium leading-none">Radix Primitives</h4>
        <p className="text-sm text-muted-foreground">
          An open-source UI component library.
        </p>
      </div>
      <Separator className="my-4 w-48" />
      <div className="flex h-5 items-center space-x-4 text-sm">
        <div>Blog</div>
        <Separator orientation="vertical" />
        <div>Docs</div>
        <Separator orientation="vertical" />
        <div>Source</div>
      </div>
    </div>

      
    </div>
  )
}
