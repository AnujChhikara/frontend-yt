
import { subscribe } from 'diagnostics_channel'
import {toast} from 'sonner'



export async function healthCheck  () {
   const response =  await fetch(process.env.url+ '/healthcheck')
   if(response.ok){
      const res_data = await response.json()
      
      
         toast("App Health", {
           description: res_data.msg,
           action: {
             label: "Okay",
             onClick: () => {},
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
           onClick: () => {},
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

export async function LikeTweet({tweetId ,accessToken}:{tweetId:string, accessToken:string} ){
  const response = await fetch(process.env.url+'/likes/toggle/t/' +tweetId,
  
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
        onClick: () => {},
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
        onClick: () => {},
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
        onClick: () => {},
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
        onClick: () => {},
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

export async function getUserWatchHistory({accessToken}:{accessToken:string}) {
  
  const response =await fetch(process.env.url+ '/users/history',{
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

export async function getUserLikedVideo({accessToken}: {accessToken:string}){
  const response =await fetch(process.env.url+ '/likes/videos',{
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
export async function getUserLikedTweets({accessToken}: {accessToken:string}){
  const response =await fetch(process.env.url+ '/likes/tweets',{
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


export async function getAllTweets({ accessToken} : { accessToken:string}){
  const response =await fetch(process.env.url+ '/tweets/getAllTweets',{
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

export async function checkLiked({ accessToken, id} : { accessToken:string, id:string}){
  const response =await fetch(process.env.url+ '/likes/isLiked/v/'+id,{
    headers:{
      'Authorization': `Bearer ${accessToken}`,
    },

  })

    if(response.ok) {
      const data = await response.json() 
      return { liked: true, data:data }
    } 
    else if (response.status === 400) {
      // Video not liked
      return { liked: false, msg: 'Video not liked' }}
}

export async function checkTweetLiked({ accessToken, id} : { accessToken:string, id:string}){
  const response =await fetch(process.env.url+ '/likes/isLiked/t/'+id,{
    headers:{
      'Authorization': `Bearer ${accessToken}`,
    },

  })

    if(response.ok) {
      const data = await response.json() 
      return { liked: true, data:data }
    } 
    else if (response.status === 400) {
      // Video not liked
      return { liked: false, msg: 'Video not liked' }}
}

export async function checkIfSubscribed({ accessToken, channelId} : { accessToken:string, channelId:string}){
  const response =await fetch(process.env.url+ '/subscriptions/isSubscribed/'+ channelId,{
    headers:{
      'Authorization': `Bearer ${accessToken}`,
    },

  })

    if(response.ok) {
      const data = await response.json() 
      return { subscribe: true, data:data }
    } 
    else if (response.status === 400) {
      // Video not liked
      return { subscribe: false, msg: 'Server Error' }}
}

export async function deleteVideo({ accessToken, id} : { accessToken:string, id:string}){
  const response =await fetch(process.env.url+ '/videos/'+id,{
    method:"DELETE",
    headers:{
      'Authorization': `Bearer ${accessToken}`,
    },

  })

    if(response.ok) {
      const data = await response.json() 
      return data
    } 
    else if (response.status === 400) {
      // Video not liked
      return {msg:"Failed to delete Video"}}
}

export async function ToggleSubscription({channelId ,accessToken}:{channelId:string, accessToken:string} ){
  const response = await fetch(process.env.url+'/subscriptions/c/' +channelId,
  
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

export async function TogglePublish({videoId ,accessToken}:{videoId:string, accessToken:string} ){
  const response = await fetch(process.env.url+'/videos/toggle/publish/' +videoId,
  
  {
    method: "PATCH",
    headers:{
      'Authorization': `Bearer ${accessToken}`
    }
  })

  if(response.ok) {
    const res_data = await response.json()
     return {success:true, data:res_data}
  } 
  else{
    const error = await response.json()
    return {success:false, data:error}
  }
}


export  async function editVideo({accessToken, videoId, formData}:{accessToken:string, videoId:string, formData:any}){
  const response = await fetch(process.env.url+ '/videos/' + videoId,{
    method:"PATCH",
    headers:{
      'Authorization': `Bearer ${accessToken}`
    },
    body:formData

  })

  if(response.ok){
    const res_data = await response.json()
    return {status:true, data:res_data}
  }

  else{
    const error = await response.json()
    return {status:true, data:error}
  }
}

export async function UpdateTweet({accessToken, tweetId, updatedTweet} : {accessToken:string, tweetId:string, updatedTweet:string}){
  const data = {
    "tweet": updatedTweet
  }
  const response = await fetch(process.env.url+'/tweets/'+tweetId ,{
    method:"PATCH",
    headers:{
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type':"application/json"
    },
    body:JSON.stringify(data)

  })

  if(response.ok) {
    const res_data = await response.json()
    return {status:true, data:res_data}
  }
  else{
    const error = await response.json()
    return {status:false, data:error}

  }
}

export async function DeleteTweet({accessToken, tweetId} : {accessToken:string, tweetId:string}){
 
  const response = await fetch(process.env.url+'/tweets/'+tweetId ,{
    method:"Delete",
    headers:{
      'Authorization': `Bearer ${accessToken}`,
    },
   

  })

  if(response.ok) {
    const res_data = await response.json()
    return {status:true, data:res_data}
  }
  else{
    const error = await response.json()
    return {status:false, data:error}

  }
}
export async function getUserTweets({accessToken, userId} : {accessToken:string, userId:string}){
 
  const response = await fetch(process.env.url+'/tweets/user/'+userId ,{
    headers:{
      'Authorization': `Bearer ${accessToken}`,
    },
   

  })

  if(response.ok) {
    const res_data = await response.json()
    return {status:true, data:res_data}
  }
  else{
    const error = await response.json()
    return {status:false, data:error}

  }
}

export function formatTimeDifference(createdAt: string) {
  const timestampUTC = new Date(createdAt);
  const timestampIST: any = new Date(timestampUTC.getTime());
  const currentTimeIST: any = new Date();
  const timeDifference = currentTimeIST - timestampIST;
  const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));

  if (hoursDifference < 1) {
    const minutesDifference = Math.floor(timeDifference / (1000 * 60));
    if (minutesDifference < 1) {
      return 'Just now';
    } else {
      return `${minutesDifference} minute${minutesDifference > 1 ? 's' : ''} ago`;
    }
  } else if (hoursDifference < 24) {
    return `${hoursDifference} hour${hoursDifference > 1 ? 's' : ''} ago`;
  } else {
    const daysDifference = Math.floor(hoursDifference / 24);
    if (daysDifference === 1) {
      return `1 day ago`;
    } else {
      return `${daysDifference} days ago`;
    }
  }
}

export function formatSecondsToMinutes(second:number) {
  // Calculate minutes and remaining seconds
  const minutes = Math.floor(second / 60);
  const remainingSeconds = Math.round(second % 60);
  
  // Format the result as minutes:seconds
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
  const formattedSeconds = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;

  return `${formattedMinutes}:${formattedSeconds}`;
}

//comment functions

export async function AddComment({accessToken, videoId, comment}:{accessToken:string, videoId:string, comment:string} ){
  const data = {
    comment: comment
  }
  const response = await fetch(process.env.url+'/comments/'+videoId, {
    method:"POST",
    headers:{
      'Authorization' : `Bearer ${accessToken}`,
      'Content-Type':'application/json'
    },
    body:JSON.stringify(data)
  })

  if(response.ok){
    const res_data = await response.json()
    return {status:true, data:res_data}
  }
  else{
    const error = await response.json()
    return {status:false, data:error}

  }
}

export async function GetVideoComment({accessToken, videoId}:{accessToken:string, videoId:string} ){
 
  const response = await fetch(process.env.url+'/comments/'+videoId, {
    headers:{
      'Authorization' : `Bearer ${accessToken}`,
    },
   
  })

  if(response.ok){
    const res_data = await response.json()
    return {status:true, data:res_data}
  }
  else{
    const error = await response.json()
    return {status:false, data:error}

  }
}


export async function UpdateComment({accessToken, commentId, updatedComment}
  : {accessToken:string, commentId:string, updatedComment:string}){
  const data = {
    "newComment": updatedComment
  }
  const response = await fetch(process.env.url+'/comments/c/'+commentId ,{
    method:"PATCH",
    headers:{
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type':"application/json"
    },
    body:JSON.stringify(data)

  })

  if(response.ok) {
    const res_data = await response.json()
    return {status:true, data:res_data}
  }
  else{
    const error = await response.json()
    return {status:false, data:error}

  }
}

export async function DeleteComment({accessToken, commentId}
  : {accessToken:string, commentId:string, }){
 
  const response = await fetch(process.env.url+'/comments/c/'+commentId ,{
    method:"Delete",
    headers:{
      'Authorization': `Bearer ${accessToken}`,
    },
   

  })

  if(response.ok) {
    const res_data = await response.json()
    return {status:true, data:res_data}
  }
  else{
    const error = await response.json()
    return {status:false, data:error}

  }
}

export async function LikeComment({commentId ,accessToken}:{commentId:string, accessToken:string} ){
  const response = await fetch(process.env.url+'/likes/toggle/c/' +commentId,
  
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
  } }

  export async function checkCommentLiked({ accessToken, id} : { accessToken:string, id:string}){
    const response =await fetch(process.env.url+ '/likes/isLiked/c/'+id,{
      headers:{
        'Authorization': `Bearer ${accessToken}`,
      },
  
    })
  
      if(response.ok) {
        const data = await response.json() 
        return { liked: true, data:data }
      } 
      else if (response.status === 400) {
        // Video not liked
        return { liked: false, msg: 'Video not liked' }}
  }

//playist functions

export async function CreatePlaylist({accessToken, name, description, category}:
  {accessToken:string, name:any, description:any, category:string}){
    const data = {
      name,
      description,
      category
    }
    const response = await fetch(process.env.url+ '/playlist',{
      method:"POST",
        headers:{
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type':"application/json"
        },
        body:JSON.stringify(data)

    })

   
      if(response.ok) {
        const res_data = await response.json()
        return {status:true, data:res_data}
      }
      else{
        const error = await response.json()
        return {status:false, data:error}
    
    }
  }

export async function GetUserPlaylists({accessToken, userId}:{accessToken:string, userId:string}){
  const response = await fetch(process.env.url+'/playlist/user/'+userId, {
    headers:{
      'Authorization' : `Bearer ${accessToken}`
    }
  })
  if(response.ok) {
    const res_data = await response.json()
    return {status:true, data:res_data}
  }
  else{
    const error = await response.json()
    return {status:false, data:error}
}}

export async function GetPlaylistById({accessToken, playlistId}:{accessToken:string, playlistId:string}){
  const response = await fetch(process.env.url+'/playlist/'+playlistId, {
    headers:{
      'Authorization' : `Bearer ${accessToken}`
    }
  })
  if(response.ok) {
    const res_data = await response.json()
    return {status:true, data:res_data}
  }
  else{
    const error = await response.json()
    return {status:false, data:error}
}}

export async function AddVideoToPlaylist({accessToken, playlistId, videoId}:{accessToken:string, playlistId:string, videoId:string}){
  const response = await fetch(process.env.url+'/playlist/add/'+videoId+'/'+playlistId, {
    method:"PATCH",
    headers:{
      'Authorization' : `Bearer ${accessToken}`
    }
  })
  if(response.ok) {
    const res_data = await response.json()
    return {status:true, data:res_data}
  }
  else{
    const error = await response.json()
    return {status:false, data:error}
}}

export async function DeletedPlaylist({accessToken, playlistId}:{accessToken:string, playlistId:string}){
  const response = await fetch(process.env.url+'/playlist/'+playlistId, {
    method:"DELETE",
    headers:{
      'Authorization' : `Bearer ${accessToken}`
    }
  })
  if(response.ok) {
    const res_data = await response.json()
    return {status:true, data:res_data}
  }
  else{
    const error = await response.json()
    return {status:false, data:error}
}}

export async function RemoveVideoFromPlaylist({accessToken, playlistId, videoId}:{accessToken:string, playlistId:string,videoId:string}){
  const response = await fetch(process.env.url+'/playlist/remove/'+videoId+'/'+playlistId , {
    method:"PATCH",
    headers:{
      'Authorization' : `Bearer ${accessToken}`
    }
  })
  if(response.ok) {
    const res_data = await response.json()
    return {status:true, data:res_data}
  }
  else{
    const error = await response.json()
    return {status:false, data:error}
}}
