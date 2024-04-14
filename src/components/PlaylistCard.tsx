import { ListVideo, Video } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'



export default function PlaylistCard({owner,thumbnail,ownerId, name, description,updatedAt, videoCount}
  :
any
) {

  return (
    <div className='w-80 '>
      <Link href='/' className='flex items-end space-x-56 md:hover:opacity-60 duration-500'>
       <Image width={100} height={100} className='w-80 h-[200px] rounded-xl border-double  border-x-4 border-b-4 border-gray-400 ' src={thumbnail} alt='playlist thumbnail'/>
       <span className='bg-black p-0.5 rounded bg-opacity-60 flex justify-center items-center text-white fixed text-sm mb-2'><ListVideo /><p>{videoCount? videoCount: 0} videos</p></span>
       </Link>
        <div className='flex flex-col  pt-2 space-y-2 '>
        <div className='font-semibold text-lg'>{name}</div>
        <div className='flex items-center space-x-4'>
          <Link className='border border-accent px-2 border-dashed py-0.5' href={`/viewChannel/${ownerId}`}>{owner}</Link>
       
        <p className='text-[12px] text-gray-400'>updated {updatedAt}</p>

        </div>
        
        </div>
        
    </div>
  )
}
