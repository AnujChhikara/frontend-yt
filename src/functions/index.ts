
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
           onClick: () => console.log('Okay'),
         },
       })

   }
}

export async function getUserVideos({userId, accessToken}: {userId:string, accessToken:string}) {
  const response = await fetch(process.env.url+'/dashboard/videos/' +userId,
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
 
      const response = await fetch(process.env.url + '/videos/'+ videoId,{
        method:'Get',
        headers:{
          'Authorization': `Bearer ${accessToken}`
        }

      })

      if(response.ok) {

        const data = await response.json()
     
         return {status:true, data:data }
      } 
      else{
        const error = await response.json()
        return {status:false, data: error.msg }  
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
        onClick: () => console.log('Okay'),
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
    method:"PATCH",
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

export async function updateUserAvatar({accessToken,file}: {accessToken:string, file:any}) {

  const response = await fetch(process.env.url+'/users/updateAvatar',
  {
    method:"PATCH",
    headers:{
      'Authorization': `Bearer ${accessToken}`,
    },

    body:file
  })

  if(response.ok) {
    toast("User Avatar Updated", {
      description: 'You can see new avatar in top navbar',
      action: {
        label: "Okay",
        onClick: () => console.log('Okay'),
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


export async function updateUserCoverImage({accessToken,file}: {accessToken:string, file:any}) {

  const response = await fetch(process.env.url+'/users/updateCoverImage',
  {
    method:"PATCH",
    headers:{
      'Authorization': `Bearer ${accessToken}`,
    },

    body:file
  })

  if(response.ok) {
    toast("User Cover Image Updated", {
      description: 'You can see new cover image in your channel',
      action: {
        label: "Okay",
        onClick: () => console.log('Okay'),
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


export async function getAllPublishedVideos({accessToken}:{accessToken:string}){
  const response = await fetch(process.env.url+ '/dashboard/videos/getAllPublishedVideos/published', {
    headers:{
      'Authorization': `Bearer ${accessToken}`
    }
  })

  if(response.ok) {
    const data = await response.json()
     return {status:true, data:data }
  } 
  else{
    const error = await response.json()
    return {status:false, data: error.msg }  
  }
}

export async function getUserByID({userId, accessToken}: {userId:any, accessToken:string}){
  const response =await fetch(process.env.url+ '/users/getUserById/'+userId,{
    headers:{
      'Authorization': `Bearer ${accessToken}`,
    },

  })


    if(response.ok) {
      const data = await response.json()
       return {status:true, data:data }
    } 
    else{
      const error = await response.json()
      return {status:false, data: error.msg }  
    }
}

export async function addVideoToWatchHistory({videoId, accessToken} : {videoId:string, accessToken:string}){
  const response =await fetch(process.env.url+ '/videos/watchHistory/' +videoId,{
    method:"PATCH",
    headers:{
      'Authorization': `Bearer ${accessToken}`,
    },

  })


    if(response.ok) {
      const data = await response.json()
       return {status:true, data:data }
    } 
    else{
      const error = await response.json()
      return {status:false, data: error.msg }  
    }
}