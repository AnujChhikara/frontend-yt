import { toast } from "sonner"

export async function healthCheck  () {
   const response =  await fetch(process.env.url+ '/healthcheck')
   if(response.ok){
      const res_data = await response.json()
      
      
         toast("App Health", {
           description: res_data.msg,
           action: {
             label: "Okay",
             onClick: () => console.log(res_data.msg),
           },
         })
       
   }
   else{
      const error= await response.json()
      console.log(error)
      toast("App Health", {
         description: 'failed to fetch app health',
         action: {
           label: "Okay",
           onClick: () => console.log('Sorry'),
         },
       })

   }
}

export async function getUserVideos({userId, accessToken}: {userId:string, accessToken:string}) {
  const response = await fetch(process.env.url+'/videos/?page=1&limit=10&query=test&sortBy=createdAt&userId=' +userId+'&sortType=newest',
  {
    headers:{
      'Authorization': `Bearer ${accessToken}`
    }
  })

  if(response.ok) {
    const res_data = await response.json()
    return res_data.data
  } 
  else{
    const error = await response.json()
    console.log(error)
  }
}

export async function LikeVideo({videoId ,accessToken}:{videoId:string, accessToken:string} ){
  const response = await fetch(process.env.url+'/likes/toggle/v/' +videoId,
  
  {
    method: "POST",
    headers:{
      'Authorization': `Bearer ${accessToken}`
    }
  })

  if(response.ok) {
    const res_data = await response.json()
     return res_data
  } 
  else{
    const error = await response.json()
    console.log(error.msg)
  }
}


