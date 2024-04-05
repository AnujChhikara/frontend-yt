
import {toast} from 'sonner'

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


export async function fetchVideoByid({videoId, accessToken}:{accessToken:string, videoId:string}) {
 
    try {
      const response = await fetch(process.env.url + '/videos/'+ videoId,{
        method:'Get',
        headers:{
          'Authorization': `Bearer ${accessToken}`
        }

      })

      if(response.ok){
         const res_data = await response.json()
         const video = res_data.video
         return video
       
        
      }
      else{
        const error = await response.json()
        console.log(error)
      }
    } catch (error) {
      console.log(error)
    }
  }


export async function getChannelStats({channelId, accessToken}: {channelId:string, accessToken:string}){
 
  const response = await fetch(process.env.url+'/dashboard/stats/'+channelId,
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

export async function changeUserPassword({accessToken,oldPassword, newPassword}: {oldPassword:any, newPassword:any, accessToken:string}) {
  const data = 
    {
      oldPassword:oldPassword,
      newPassword:newPassword
  }

  const response = await fetch(process.env.url+'/users/changePassword',
  {
    method:"POST",
    headers:{
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type' : 'application/json'
    },

    body:JSON.stringify(data)
  })

  if(response.ok) {
    toast("Account Details Updated", {
      description: 'Please login with new credentials',
      action: {
        label: "Okay",
        onClick: () => console.log('Sorry'),
      },
    })
    const data = await response.json()
     return {status:true, data:data }
  } 
  else{
    const error = await response.json()
    return {status:false, data: error.msg }  
  }
}

export async function updateUserAccount({accessToken,fullName, email}: {fullName:any, email:any, accessToken:string}) {
  const data = 
    {
      fullName:fullName,
      email:email
  }

  const response = await fetch(process.env.url+'/users/updateDetails',
  {
    method:"POST",
    headers:{
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type' : 'application/json'
    },

    body:JSON.stringify(data)
  })

  if(response.ok) {
    toast("Account Details Updated", {
      description: 'Please login with new credentials',
      action: {
        label: "Okay",
        onClick: () => console.log('Sorry'),
      },
    })
    const data = await response.json()
     return {status:true, data:data }
  } 
  else{
    const error = await response.json()
    return {status:false, data: error.msg }  
  }
}