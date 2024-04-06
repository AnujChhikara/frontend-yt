'use client'
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
      <div className=" mx-12 flex flex-col items-start justify-center space-y-4">
        <h2 className="text-2xl font-semibold">Editor&apos;s Choice</h2>
        <div className="flex items-center justify-center gap-4 w-11/12 ">
        <iframe width="380" height="220" src="https://www.youtube.com/embed/gyxqIvQIHQw?si=hGakicX_UmdJsAvY" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        <iframe width="380" height="220"  src="https://www.youtube.com/embed/l8hTo_GBrBI?si=hXIFqDg5o10S2igP" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        <iframe width="380" height="220"  src="https://www.youtube.com/embed/EH3vGeqeIAo?si=t15SwgoQvich88il" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        <iframe className="lg:hidden 2xl:block" width="380" height="220"  src="https://www.youtube.com/embed/7rd3c8hrhME?si=BEvZdtuAshIYVv05" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>
      
      </div>
      
    
    </main>
  );
  


}
