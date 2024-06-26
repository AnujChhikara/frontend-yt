
'use client'
import Image from 'next/image'
import React, { useRef, useState } from 'react'
import Link from 'next/link'
import { toast } from "sonner"
import { redirect } from 'next/navigation'
import { Input } from '@/components/ui/input'


export default function RegsiterPage()  {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(null);
  const [errorMsg, setErrorMessage] = useState('')
  const[isProcessing, setIsProcessing] = useState(false)
  const[isRegisteredSuccessfully, setIsRegisteredSuccessfully] = useState(false)
 
  const avatarFileInputRef = useRef<HTMLInputElement>(null)
  const coverImageFileInputRef = useRef<HTMLInputElement>(null)

  const handleAvatarFileSelect =() =>{
    avatarFileInputRef.current!.click();
  }

  const handleAvatarFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target!.files![0];
    if (file) {
      // Read the selected file and create a data URL representing the image
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setAvatarPreview(result); // Set the data URL as the image preview
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverImageFileSelect =() =>{
    coverImageFileInputRef.current!.click();
  }

  const handleCoverImageFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target!.files![0];
    if (file) {
      // Read the selected file and create a data URL representing the image
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setCoverImagePreview(result); // Set the data URL as the image preview
      };
      reader.readAsDataURL(file);
    }
  };

  const handelFormSubmittion= async(event: React.FormEvent<HTMLFormElement>) => {
   event.preventDefault()
   setIsProcessing(true)
   if(!avatarPreview){
    setErrorMessage("avatar required!")
    setIsProcessing(false)
    return
   }
    
   const formData = new FormData();
   formData.append('fullName', event.currentTarget.fullName.value);
   formData.append('username', event.currentTarget.username.value);
   formData.append('email', event.currentTarget.email.value);
   formData.append('password', event.currentTarget.password.value);
   formData.append('avatar', avatarFileInputRef.current!.files![0]);
   formData.append('coverImage', coverImageFileInputRef.current!.files![0])
         
   

   const response = await fetch(process.env.url + '/users/register',{
    method:"POST",
    
    body:formData
   })

   if(response.ok) {
    setIsRegisteredSuccessfully(true)
    
    setIsProcessing(false)
    toast("Registration Successful", {
      description: 'User has been register successfully',
      action: {
        label: "Okay",
        onClick: () => console.log("Welcome to the App"),
      },
    })
 
    
   }
   else{
    const error = await response.json()
    setErrorMessage(error.msg)
    setIsProcessing(false)
   }

  }

  if(isRegisteredSuccessfully){
    redirect('/userAuth/login')
  }

  return (
    <main className='w-screen  flex justify-center pt-8'>
    <div className='   flex justify-center bg-transparent border border-gray-700 rounded-xl  items-center'>
        <div className=' rounded py-8 text-white flex px-6 flex-col space-y-4 justify-start items-start '>
          <div>
            <h3 className='font-bold text-3xl mb-8'>Registration</h3>
            {
                errorMsg? <p className='text-red-400 text-sm relative'>{errorMsg}</p>: <></>
              }
               {
                !errorMsg? <p className='text-red-400 text-sm relative'></p>: <></>
              }</div>
            <form className='flex flex-col space-y-8 ' onSubmit={handelFormSubmittion}>
              <div className='md:flex sm:flex sm:flex-col md:flex-row md:space-x-8  sm:space-y-4 md:space-y-0'>
       
              <Input name="username" placeholder="username" type="text" required  />
             
                <Input name="email" placeholder="email" type="email" required   />
              </div>
              <div className='md:flex sm:flex sm:flex-col md:flex-row md:space-x-8  sm:space-y-8 md:space-y-0'>
                <Input name="fullName" placeholder="full name" type="text" required  />
                <Input name="password" placeholder="password" type="password" required   />
              </div>
              <div className='md:flex sm:flex sm:flex-col md:flex-row md:space-x-16  sm:space-y-4 md:space-y-0'>
              <div className=''>
                  <input ref={avatarFileInputRef} accept='image/jpeg, image/png, image/jpg' onChange={handleAvatarFileChange}  type='file' hidden name='avatar' id='avatar' className=' w-80 rounded-md h-10 px-4 py-2 bg-transparent border border-gray-200' />
                  <div onClick={handleAvatarFileSelect} className='flex text-gray-400 space-x-4 items-center cursor-pointer'>
                  {avatarPreview && (
                    <Image width={100} height={100}
                     src={avatarPreview} alt="Avatar Preview"
                     className='rounded-full w-12 h-12'  />
                  )}
                      
                      <Image width={30} height={30} src="https://www.svgrepo.com/show/530408/upload.svg" alt='avatar upload'/>
                    <h4>Upload your avatar</h4>
                  </div>
                </div>
                <div>
                  <input type='file' ref={coverImageFileInputRef} accept='image/jpeg, image/png, image/jpg' onChange={handleCoverImageFileChange} hidden  name='coverImage' id='coverImage' className=' w-80 rounded-md h-10 px-4 py-2 bg-transparent border border-gray-200' />
                  <div onClick={handleCoverImageFileSelect}  className='flex text-gray-400 space-x-4 items-center cursor-pointer'>
                  {coverImagePreview && (
                    <Image width={100} height={100}
                     src={coverImagePreview} alt="cover image Preview"
                     className=' w-24 h-6'  />
                  )}
                     
                      <Image width={30} height={30} src="https://www.svgrepo.com/show/530408/upload.svg" alt='avatar upload'/>
                    <h4>Upload your Cover Image</h4>
                  </div>
                </div>
                </div>

                    

                <div className='flex sm:flex sm:flex-col md:flex-row justify-start items-center md:space-x-12 sm:space-y-2 md:space-y-0 md:pt-6'>   {
                  isProcessing && <button type='submit' className='bg-gray-900 border text-white w-72 animate-pulse hover:bg-gray-700 duration-700 px-4 py-4 rounded'>Registering user</button>
                }
                {
                  !isProcessing && <button type='submit' className='bg-gray-900 border text-white w-72 hover:bg-gray-700 duration-500 px-4 py-4 rounded'>Register</button>
                }
                
               
                <div className='flex flex-col items-center'>
          
                <p className='text-[16px] text-gray-300'>Already registered? <Link href='/userAuth/login' className='font-bold underline '>Login</Link></p>
            
                
                </div>
                </div>
                
                
            </form>
            <div className='flex flex-col items-center text-center'>
           
            <p className='text-[12px] text-gray-400 text-center'>  * By registering here, you agree to our Terms of</p>
            <p className='text-[12px] text-gray-400 text-center'>Service and Privacy Policy.</p>
            
        </div>
        </div>

       
     
        
    </div></main>
  )
}


