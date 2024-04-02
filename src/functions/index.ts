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

export async function fetchVideo(id:string) {
  const response =  await fetch(process.env.url+ '/videos/'+ id)
  if(response.ok) {
    const res_data = await response.json()
    return res_data
  } else{
    const error = await response.json()
    console.log(error)
    return error
  }
}