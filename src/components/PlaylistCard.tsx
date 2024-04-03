import Image from 'next/image'
import Link from 'next/link'

interface Video {
  _id: string;
  createdAt: string;
  description: string;
  name: string;
  owner: string;
  updatedAt: string;
  videos: any[]; // This should be defined as per the structure of the videos array
  __v: number;
}

type Playlist = {
  // _id: string;
  // createdAt: string;
  description: string;
  name: string;
  owner: string;
  // updatedAt: string;
  // videos: Video[];
  // __v: number;
};

export default function PlaylistCard({owner, name, description}:Playlist) {
  
  return (
    <div className=''>
      <Link href='/' className=''>
       <Image width={100} height={100} className='w-60 h-40 rounded-xl  ' src='https://images.unsplash.com/photo-1470019693664-1d202d2c0907?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG11c2ljJTIwcGFseWxpc3R8ZW58MHx8MHx8fDA%3D' alt='playlist thumbnail'/>
       </Link>
        <div className='flex flex-col space-y-1 '>
        <div className='font-semibold text-xl'>{name}</div>
        <div>{description}</div>
        <p className='text-gray-400'>by {owner}</p>
        </div>
        
    </div>
  )
}
