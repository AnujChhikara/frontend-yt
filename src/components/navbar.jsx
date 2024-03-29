import Link from 'next/link'
import React from 'react'

function Navbar() {
  return (
    <div className='flex justify-between items-center px-20 pt-4 pb-12'>
        <div className='flex justify-center items-end'>

           <svg className='w-20' viewBox="0 0 1024 1024"   version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M358.4 348.16a154.88 94.72 0 1 0 309.76 0 154.88 94.72 0 1 0-309.76 0Z" fill="#486068" /><path d="M513.28 455.68c-93.44 0-167.68-47.36-167.68-107.52s72.96-107.52 167.68-107.52 167.68 47.36 167.68 107.52-72.96 107.52-167.68 107.52z m0-190.72c-76.8 0-142.08 37.12-142.08 81.92s65.28 81.92 142.08 81.92 142.08-37.12 142.08-81.92-65.28-81.92-142.08-81.92z" fill="#231C1C" /><path d="M929.28 893.44c0 12.8-10.24 24.32-24.32 24.32H134.4c-12.8 0-24.32-10.24-24.32-24.32V348.16c0-12.8 10.24-24.32 24.32-24.32h771.84c12.8 0 24.32 10.24 24.32 24.32v545.28z" fill="#D3AC51" /><path d="M904.96 930.56H134.4c-20.48 0-37.12-16.64-37.12-37.12V348.16c0-20.48 16.64-37.12 37.12-37.12h771.84c20.48 0 37.12 16.64 37.12 37.12v546.56c-1.28 19.2-17.92 35.84-38.4 35.84zM134.4 336.64c-6.4 0-11.52 5.12-11.52 11.52v546.56c0 6.4 5.12 11.52 11.52 11.52h771.84c6.4 0 11.52-5.12 11.52-11.52V348.16c0-6.4-5.12-11.52-11.52-11.52H134.4z" fill="#231C1C" /><path d="M691.2 846.08c0 12.8-10.24 24.32-24.32 24.32h-486.4c-12.8 0-24.32-10.24-24.32-24.32V395.52c0-12.8 10.24-24.32 24.32-24.32h486.4c12.8 0 24.32 10.24 24.32 24.32v450.56z" fill="#F8F4BC" /><path d="M668.16 883.2h-486.4c-20.48 0-37.12-16.64-37.12-37.12V395.52c0-20.48 16.64-37.12 37.12-37.12h486.4c20.48 0 37.12 16.64 37.12 37.12v450.56c-1.28 20.48-16.64 37.12-37.12 37.12z m-486.4-499.2c-6.4 0-11.52 5.12-11.52 11.52v450.56c0 6.4 5.12 11.52 11.52 11.52h486.4c6.4 0 11.52-5.12 11.52-11.52V395.52c0-6.4-5.12-11.52-11.52-11.52h-486.4z" fill="#231C1C" /><path d="M323.84 725.76l-66.56-92.16H204.8v-25.6h66.56l52.48 74.24 52.48-74.24h61.44l87.04-88.32 103.68 90.88-16.64 20.48-85.76-75.52-78.08 78.08h-58.88zM739.84 430.08h142.08v25.6H739.84zM739.84 477.44h142.08v25.6H739.84zM739.84 382.72h142.08v25.6H739.84z" fill="#231C1C" /><path d="M810.24 787.2m-58.88 0a58.88 58.88 0 1 0 117.76 0 58.88 58.88 0 1 0-117.76 0Z" fill="#B8CA43" /><path d="M810.24 858.88c-39.68 0-71.68-32-71.68-71.68s32-71.68 71.68-71.68 71.68 32 71.68 71.68-32 71.68-71.68 71.68z m0-119.04c-25.6 0-46.08 20.48-46.08 46.08s20.48 46.08 46.08 46.08 46.08-20.48 46.08-46.08-20.48-46.08-46.08-46.08z" fill="#231C1C" /><path d="M766.0928 813.5936l71.5008-71.5008 18.0992 18.0992-71.5008 71.5008z" fill="#231C1C" /><path d="M338.7392 107.3408l18.0992-18.0992 154.7648 154.7776-18.0992 18.0992z" fill="#231C1C" /><path d="M516.6976 243.2256L671.488 88.448l18.0992 18.112-154.7776 154.752z" fill="#231C1C" /></svg>
        <h1 className='font-bold  text-5xl bg-gradient-to-br from-orange-400 to-white text-transparent bg-clip-text'>VidLoom</h1>
        </div>
        <div className='flex justify-center items-center pt-8'>
        <div className=' flex items-center space-x-2 border-gray-400 border w-96 h-10 rounded-3xl'>
            <input type="text"
            placeholder='search..'
             className='bg-transparent px-3 py-1  w-80 h-10 rounded-3xl rounded-r-none ' />
             <button>
             <svg className='h-8' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.1" d="M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" fill="#323232"/>
                <path d="M15 15L21 21" stroke="#BBBBBB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="#BBBBBB" strokeWidth="2"/>
                </svg></button>
        </div></div>
        <div className='flex justify-center items-center space-x-2'>
            <div>
                <svg className='w-8' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="9" r="3" stroke="#FFCF81" strokeWidth="1.5"/>
                    <path d="M17.9691 20C17.81 17.1085 16.9247 15 11.9999 15C7.07521 15 6.18991 17.1085 6.03076 20" stroke="#FFCF81" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="#FFCF81" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
            </div>
            <Link href="/register">Sign In</Link>
            
        </div>
    </div>
  )
}

export default Navbar