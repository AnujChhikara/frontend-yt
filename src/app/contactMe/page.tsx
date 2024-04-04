/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar" 
import Link from 'next/link'
import { Github, Twitter } from 'lucide-react'


export default function ContactMe() {
  return (
    <div className='mt-10 w-auto flex flex-row justify-center'>
     <main>
      <div>

      <div className="space-y-1">
        <div className='flex justify-start space-x-2 items-center'>
      <Avatar>
        <AvatarImage src='/profile.jpg' />
        <AvatarFallback>AC</AvatarFallback>
        </Avatar>
        <h4 className="text-lg font-medium ">Anuj Chhikara</h4></div>
        <p className="text-sm text-muted-foreground">
          Hi, I'm a Full Stack Developer
        </p>
      </div>
      <Separator className="my-4 w-64" />
      <div className="flex h-5 items-center space-x-4 text-sm">
        <Link href="https://anujchhikara.vercel.app/">Profile</Link>
        <Separator orientation="vertical" />
        <Link className='flex items-center space-x-1'   href="https://twitter.com/AnujChhikara07"><Twitter /><p>Twitter</p></Link>
        <Separator orientation="vertical" />
        <Link className='flex items-center space-x-1' href="https://github.com/AnujChhikara"> <Github /><p>Github</p> </Link>
        
      </div>
    </div>
    </main>

    </div>
  )
}
