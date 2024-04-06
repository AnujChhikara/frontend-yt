import Image from 'next/image';
import Link from 'next/link';
import React from 'react'




interface VideoProps {
  title:string,
    videoUrl: string;
    thumbnailUrl: string;
    duration: number;
    owner: string;
    views: number;
    videoId:string;
    createdAt: string;
    description: string
  }
 

  const Video: React.FC<VideoProps> = ({title, videoUrl,description, videoId, thumbnailUrl, duration, owner, views, createdAt }) => {
   
    function formatSecondsToMinutes(second:number) {
      // Calculate minutes and remaining seconds
      const minutes = Math.floor(second / 60);
      const remainingSeconds = Math.round(second % 60);
      
      // Format the result as minutes:seconds
      const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
      const formattedSeconds = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;
  
      return `${formattedMinutes}:${formattedSeconds}`;
  }

  const videoDuration = formatSecondsToMinutes(duration)
    
    return (
      <div className='flex flex-col  justify-center items-start space-y-2 font-bold text-gray-300'>
        <Link href={`/watchVideo/${videoId}`}
         className='flex items-end space-x-[185px]'>
        <Image width={100} height={100} className='w-60 h-40 rounded-md m-2 ml-0 shadow-sm shadow-white' src={thumbnailUrl} alt="Thumbnail" />
        <span  className='bg-black absolute text-white rounded-xl px-1 py-0.5 mb-3  text-sm '>
            {videoDuration}
        </span>
        </Link>
        
        <h3>{title}</h3>
      
        <h4 className='text-sm text-gray-300'>by  {owner}</h4>
      </div>
    );
  };
  
  export default Video;