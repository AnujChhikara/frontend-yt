
'use client'
import { Button } from '@/components/ui/button'
import {InfoIcon, ListVideo, Youtube } from 'lucide-react'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEffect, useState } from 'react'
import { ToggleSubscription, checkIfSubscribed, getUserByID, getUserVideos } from '@/functions'
import Video from '@/components/video'
import { redirect } from 'next/navigation'

export default function ViewChannel({params}:{params: {slug:string}}) {
  const userData =  useSelector((state:any) => state.user)
  const user = userData.user[0] 
  const id = params.slug

 if(!user) {
  redirect('/')
 }

  const[userVideos, setUserVideos] = useState<any>()
  const[channelOwner, setChannelOwner] = useState<any>()
  const [subscribe, setSubscribe] = useState(false);
    
   //getting user video
    useEffect( () => {
      const fetchUserVideos = async () => {
        try {
            
            const userVideos = await getUserVideos({ userId: id, accessToken: user.accessToken });
            setUserVideos(userVideos);
        } catch (error) {
            // Handle error if any
            console.error('Error fetching user videos:', error);
        }
    };
  
    fetchUserVideos();
  
  }, [id, user.accessToken]);

 //getting user by id
  useEffect(()=> {
    const fetchVideoOwner = async() => {  
     const response = await getUserByID({userId:id, accessToken:user.accessToken})
     if(response.status === true){
      setChannelOwner(response.data)

     }
     else{
      console.log(response.data)
     } 
     
     
    }
    if(user) {
      fetchVideoOwner()
    }
  }, [id, user])

  if (!channelOwner) {
    // Render loading indicator or return null until channelOwner data is fetched
    redirect
  }
 
   //checking if user already subscribed?
   useEffect(()=> {
    const checkSubscribed= async() =>{ 
     const response = await checkIfSubscribed({accessToken:user.accessToken,channelId:channelOwner?._id})

     if(response?.subscribe === true) {
       const data = response.data
       setSubscribe(data.subscribed)
     } 
     else{
       setSubscribe(false)
     }
    }
    if(channelOwner){
      checkSubscribed()
    }
   
  }, [user, channelOwner])

  const handleSubscribeButton =() =>{ ToggleSubscription
    setSubscribe(!subscribe)
    ToggleSubscription({channelId:channelOwner?._id, accessToken:user.accessToken})
  }

// Convert CreatedAt to IST (India Standard Time)
const createdAtUTC = new Date(channelOwner?.createdAt);
const createdAtIST = createdAtUTC.toLocaleString('en-IN', {
  timeZone: 'Asia/Kolkata'
}); 


  return (
    <div className='w-screen flex justify-center items-center'>
    <div className='flex flex-col pt-4 justify-center items-center'>
      <div className='flex flex-col items-start space-y-8'>
      <div>
        {channelOwner && <Image width={200} height={0} className='w-[800px] h-40 rounded-lg'  alt="banner" src={channelOwner?.coverImage}/> }
        
      </div>
      <div className='flex space-x-8'>
        {
          channelOwner && <Image width={200} height={200} className='rounded-xl shadow-md shadow-white'  alt="banner" src={channelOwner?.avatar}/>
        }
        
        <div className='mt-4 space-y-2'><h4 className='font-bold text-4xl'>{channelOwner?.fullName}</h4>
        <div className='text-gray-400 flex space-x-4 justify-center items-center'><div>@{channelOwner?.username}</div> <div className='bg-gray-800 text-gray-300 px-2  rounded-2xl opacity-60'>11K Subscribers</div></div>
        {subscribe? 
       <button onClick={handleSubscribeButton} className="bg-green-500 px-3 py-2 rounded-3xl">
        Subscribed
      </button> :
       <button onClick={handleSubscribeButton} className="bg-red-500 px-3 py-2 rounded-3xl hover:bg-red-400">
       Subscribe
     </button>}
        </div>
      </div>
      
      
      </div>
      <hr className='border-gray-300 h-1 w-[800px] my-6' />
      <div className='flex flex-col ' >
      <Tabs defaultValue="account" className="w-[800px] ">
        <TabsList className='w-[800px] justify-around'>
          <TabsTrigger value="videos"> <div className='flex items-center space-x-1 cursor-pointer'><ListVideo /><p>Videos</p></div> </TabsTrigger>
          <TabsTrigger value="playlist"><div className='flex items-center space-x-1  cursor-pointer'> <Youtube /><p>Playlists</p></div> </TabsTrigger>
          <TabsTrigger value="info"><div className='flex items-center space-x-1  cursor-pointer'> <InfoIcon /><p>Channel Info</p></div> </TabsTrigger>
        </TabsList>
        <TabsContent value="videos">{
          <div className='flex flex-wrap gap-4'>

{userVideos && userVideos.some((video:any = {})=> video.isPublished) ? (
  <div>
    {userVideos.map((video:any = {}) => (
      video.isPublished && (
        <div key={video._id}>
          <Video
            key={video._id}
            videoId={video._id}
            title={video.title}
            videoUrl={video.videoFile}
            thumbnailUrl={video.thumbnail}
            owner={video.owner._id}
            views={video.view}
            createdAt={video.createdAt}
            duration={video.duration}
            description={video.description}
            isPublished={video.isPublished}
            edit={false}
          />
        </div>
      )
    ))}
  </div>
) : (
  <div>
    {/* Render something else here when there are no published videos */}
    No published videos found.
  </div>
)}
          </div>
        }</TabsContent>
        <TabsContent value="playlist">No Playlist found.</TabsContent>
        <TabsContent value="info">
          <div>
            <h2>Channel Name:- {channelOwner?.fullName}</h2>
            <p>Joined:-{createdAtIST} IST</p>
            <p>username:-@{channelOwner?.username}</p>
          
          </div>
        </TabsContent>
      
      </Tabs>

       

      </div>
    </div></div>
  )
}
