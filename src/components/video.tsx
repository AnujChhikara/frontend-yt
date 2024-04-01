import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

interface VideoProps {
    videoUrl: string;
    thumbnailUrl: string;
    duration: string;
    owner: string;
    views: string;
    videoId:string;
    createdAt: string;
  }
 

  const Video: React.FC<VideoProps> = ({ videoUrl,videoId, thumbnailUrl, duration, owner, views, createdAt }) => {
    return (
      <div className='flex flex-col space-y-2 font-bold text-gray-300'>
        <Link href={`/watchVideo/${videoId}`}
         className='flex items-end space-x-[185px]'>
        <Image width={100} height={100} className='w-60 h-40 rounded-md m-2 ml-0 shadow-sm shadow-white' src={thumbnailUrl} alt="Thumbnail" />
        <span  className='bg-black absolute text-white rounded-xl px-1 py-0.5 mb-3  text-sm '>
            {duration}
        </span>
        </Link>
        
        <h3>Title: Video Title here</h3>
        <h4 className='text-sm text-gray-300'>by {owner}</h4>
      </div>
    );
  };
  
  export default Video;