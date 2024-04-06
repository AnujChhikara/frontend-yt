
'use client'
import { Button } from '@/components/ui/button'
import { BadgeInfo, ListVideo, Youtube } from 'lucide-react'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getUserVideos } from '@/functions'
import Video from '@/components/video'

export default function ViewChannel() {
  const userData =  useSelector((state:any) => state.user)
  const user = userData.user[0] 

  const[userVideos, setUserVideos] = useState<any>()
    
    if(!user) { 
      redirect('/')
    }

   
    useEffect( () => {
      const fetchUserVideos = async () => {
        try {
            // Call getUserVideos when user.id or user.accessToken changes
            const userVideos = await getUserVideos({ userId: user.id, accessToken: user.accessToken });
            setUserVideos(userVideos);
        } catch (error) {
            // Handle error if any
            console.error('Error fetching user videos:', error);
        }
    };
  
    fetchUserVideos();
  
  }, [user.id, user.accessToken]);

 
     

  return (
    <div className='w-screen flex justify-center items-center'>
    <div className='flex flex-col pt-4 justify-center items-center'>
      <div className='flex flex-col items-start space-y-8'>
      <div>
        <Image width={800} height={200} className='w-[800px] h-40 rounded-lg'  alt="banner" src={user.coverImage? user.coverImage : 'https://imgs.search.brave.com/ZdnvNA_L2tghfSRYQYSV-HMY0g7bE0PV7WJ_-rrcD98/rs:fit:860:0:0/g:ce/aHR0cHM6Ly92aXNt/ZS5jby9ibG9nL3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDE3LzA0/L3lvdXR1YmUtYmFu/bmVyLXRlbXBsYXRl/cy1oZWFkZXItd2lk/ZS5qcGc'}/>
      </div>
      <div className='flex space-x-8'>
        <Image width={200} height={200} className='rounded-xl shadow-md shadow-white'  alt="banner" src={user.avatar}/>
        <div className='mt-4 space-y-2'><h4 className='font-bold text-4xl'>{user.fullName}</h4>
        <div className='text-gray-400 flex space-x-4 justify-center items-center'><div>@{user.username}</div> <div className='bg-gray-800 text-gray-300 px-2  rounded-2xl opacity-60'>11K Subscribers</div></div>
        <Button className=' rounded-2xl opacity-90' variant="outline">Subscribe</Button>
        </div>
      </div>
      
      
      </div>
      <hr className='border-gray-300 h-1 w-[800px] my-6' />
      <div className='flex flex-col ' >
      <Tabs defaultValue="account" className="w-[800px] ">
        <TabsList className='w-[800px] justify-around'>
          <TabsTrigger value="videos"> <div className='flex items-center space-x-1 cursor-pointer'><ListVideo /><p>Videos</p></div> </TabsTrigger>
          <TabsTrigger value="playlist"><div className='flex items-center space-x-1  cursor-pointer'> <Youtube /><p>Playlists</p></div> </TabsTrigger>
          
        </TabsList>
        <TabsContent value="videos">{
          <div className='flex flex-wrap gap-4'>
             {userVideos && <>
             {
             
              userVideos.map((video:any = {}) => (
                <Video
                key={video._id}
                videoId={video._id}
                title={video.title}
                videoUrl={video.videoFile}
                thumbnailUrl={video.thumbnail}
                  owner={video.owner}
                  views={video.view}
                  createdAt= {video.createdAt}
                  duration = {video.duration}
                  description= {video.description}
                
                />
                
              ))
             }
             </>}
          </div>
        }</TabsContent>
        <TabsContent value="playlist">Change your password here.</TabsContent>
      
      </Tabs>

       

      </div>
    </div></div>
  )
}
