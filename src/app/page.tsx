'use client'

import HomePage from "@/components/HomePage";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";


export default function Home() {
  const userData =  useSelector((state:any) => state.user)
  const user = userData.user[0]  
  
  
  if(!user) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        
        <Image priority className="blur-md " src='/hero.png' alt='hero' width={800} height={400} />
        <h1 className="fixed text-5xl font-extrabold mt-20">Ready to Begin?
         <Link href='/register' className=" underline text-orange-300 mx-3" >Register</Link> and Dive In!</h1>
      </main>
    );

  } 

 

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      
     
      <div>
        <HomePage/>
      </div>
      
    
    </main>
  );
  


}
