'use client'


import Image from "next/image"
import Link from "next/link"
import { useSelector } from "react-redux"
import { Button } from "@/components/ui/button"
import Video from "@/components/video"

export default function UserProfile() {
  const data =  useSelector((state:any) => state.user)
  const userData = data.user[0]
  
  
    
  return (
    <div className="px-12 pt-6">
        {
            userData &&<>
            <div className="flex flex-col space-y-12 ">
                <div className="flex items-center space-x-4 justify-start">
            <Link href='/viewChannel' className="flex space-x-4 items-center ">
             <Image width={100} height={100} className="w-40 h-40 rounded-full" src={userData.avatar} alt="user image" />
            <div>
                <h2 className="font-semibold text-4xl">{userData.fullName}</h2>
                <p className="flex items-center gap-2">@{userData.username}. <p className="text-sm text-gray-400">Explore Your Channel</p></p>
            </div>
            </Link>
       
            </div>
           {/* user history div start */}
            <div className="flex flex-col">

                <h3 className="flex space-x-2">
                <svg className="w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.96336 6.30713C1.74958 6.66192 1.86389 7.12283 2.21868 7.33661C2.57346 7.55038 3.03437 7.43607 3.24815 7.08129L1.96336 6.30713ZM2.5879 15.8197C2.43 15.4367 1.99156 15.2543 1.60863 15.4122C1.22569 15.5701 1.04326 16.0086 1.20116 16.3915L2.5879 15.8197ZM11.6058 2.35559C16.9905 2.35559 21.3558 6.72082 21.3558 12.1056L22.8558 12.1056C22.8558 5.89239 17.819 0.855592 11.6058 0.855592L11.6058 2.35559ZM21.3558 12.1056C21.3558 17.4904 16.9905 21.8556 11.6058 21.8556L11.6058 23.3556C17.819 23.3556 22.8558 18.3188 22.8558 12.1056L21.3558 12.1056ZM3.24815 7.08129C4.95544 4.24789 8.05998 2.35559 11.6058 2.35559L11.6058 0.855592C7.51256 0.855591 3.93077 3.04204 1.96336 6.30713L3.24815 7.08129ZM11.6058 21.8556C7.53732 21.8556 4.04917 19.3635 2.5879 15.8197L1.20116 16.3915C2.88598 20.4774 6.90887 23.3556 11.6058 23.3556L11.6058 21.8556Z" fill="#71717A"/>
                    <path d="M2.10477 4.10559L2.10477 7.10559L5.00342 6.62248" stroke="#71717A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M15 11.5L11 13.5V7" stroke="#71717A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                    <p className="text-2xl font-bold">History</p>
                </h3>
                <div>
                    <Video
                    videoId="66051c5fe9a65eab955fd124"
                    videoUrl="http://res.cloudinary.com/dlahahicg/video/upload/v1711610958/moqqc7d34k2cqpzioyvt.mp4" 
                    thumbnailUrl="http://res.cloudinary.com/dlahahicg/image/upload/v1711610960/rxku9gardygblph6qqej.jpg"
                     duration="30.03"
                      owner="Anuj"
                       views="50"
                        createdAt="4days" 
                    
                    />
                </div>

            </div>
             {/* user history div end */}

             {/* user playlist div start */}
            <div className="flex flex-col">

                    <h3 className="flex space-x-2">
                    <svg className="w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
                    <g id="SVGRepo_iconCarrier"> <path d="M11 14L3 14" stroke="#c4c4c4" strokeWidth="1.5" strokeLinecap="round"/> <path d="M11 18H3" stroke="#c4c4c4" strokeWidth="1.5" strokeLinecap="round"/> <path d="M18.875 14.1183C20.5288 15.0732 21.3558 15.5506 21.4772 16.2394C21.5076 16.4118 21.5076 16.5881 21.4772 16.7604C21.3558 17.4492 20.5288 17.9266 18.875 18.8815C17.2212 19.8363 16.3942 20.3137 15.737 20.0745C15.5725 20.0147 15.4199 19.9265 15.2858 19.814C14.75 19.3644 14.75 18.4096 14.75 16.4999C14.75 14.5902 14.75 13.6354 15.2858 13.1858C15.4199 13.0733 15.5725 12.9852 15.737 12.9253C16.3942 12.6861 17.2212 13.1635 18.875 14.1183Z" stroke="#c4c4c4" strokeWidth="1.5"/> <path d="M3 6L13.5 6M20 6L17.75 6" stroke="#c4c4c4" strokeWidth="1.5" strokeLinecap="round"/> <path d="M20 10L9.5 10M3 10H5.25" stroke="#c4c4c4" strokeWidth="1.5" strokeLinecap="round"/> </g>
                    </svg>
                        <p className="text-2xl font-bold">Playlists</p>
                    </h3>

                    </div>
                    {/* user playlist div end */}
            </div>
            </> 
        }
       
        
        </div>
  )
}
