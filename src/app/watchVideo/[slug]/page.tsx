
'use client'

import { fetchVideo } from "@/functions/indes";
import {useRouter} from "next/navigation";
import { useEffect, useState } from "react";

export default function ViewVideo({params}:{params: {slug:string}}) {
  const [videoData, setVideoData] = useState({})
  const id = params.slug

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchVideo(id);
        setVideoData(data);
      } catch (error) {
        console.error('Error fetching video:', error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);
  
  console.log(videoData)
  return (
    <div>
      Loading
    </div>
  )
}
