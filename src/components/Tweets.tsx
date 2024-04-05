'use client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar" 


export default function Tweets({userId, tweet, createdAt, likes}:{userId:string, tweet:string, createdAt:string, likes:number}) {
  return (
    <div>

        <div>
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
               
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima similique sit atque ut perspiciatis, delectus repellat at aspernatur distinctio nam, quia culpa quaerat in, voluptas deleniti laudantium veniam voluptate nisi.</p>
            </div>
            <div>
                Likes
            </div>

      
    </div>
  )
}
