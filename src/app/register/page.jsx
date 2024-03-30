'use client'
import Image from 'next/image'
import React, { useRef, useState } from 'react'
import Input from '@/components/Input'
import Link from 'next/link'


function RegsiterPage() {
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [coverImagePreview, setCoverImagePreview] = useState(null);

 
  const avatarFileInputRef = useRef(null)
  const coverImageFileInputRef = useRef(null)

  const handleAvatarFileSelect =() =>{
    avatarFileInputRef.current.click();
  }

  const handleAvatarFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Read the selected file and create a data URL representing the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result); // Set the data URL as the image preview
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverImageFileSelect =() =>{
    coverImageFileInputRef.current.click();
  }

  const handleCoverImageFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Read the selected file and create a data URL representing the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImagePreview(reader.result); // Set the data URL as the image preview
      };
      reader.readAsDataURL(file);
    }
  };

  const handelFormSubmittion= async(event) => {
   event.preventDefault()
    
   const formData = new FormData();
   formData.append('fullName', event.target.fullName.value);
   formData.append('username', event.target.username.value);
   formData.append('email', event.target.email.value);
   formData.append('password', event.target.password.value);
   formData.append('avatar', avatarFileInputRef.current.files[0]);
   formData.append('coverImage', coverImageFileInputRef.current.files[0])
         
   

   const response = await fetch('http://localhost:8000/api/v1/users/register',{
    method:"POST",
    
    body:formData
   })

   if(response.ok) {
    const res_data = await response.json()
    window.location.href = '/login';
   }
   else{
    const error = await response.json()
    console.log(error)
   }

   

  }

  return (
    <main className='w-screen  flex justify-center pt-12'>
    <div className='w-3/5  h-[600px] flex justify-center  items-center'>
        <div className='bg-white rounded w-1/2 h-[650px] text-black flex px-12 flex-col space-y-4 justify-start items-start py-8'>
            <h3 className='font-bold text-3xl'>Registration</h3>
            <form className='flex flex-col space-y-6 ' onSubmit={handelFormSubmittion}>
                <Input name="fullName" placeholder="full name" type="text" required  />
                <Input name="username" placeholder="username" type="text" required  />
                <Input name="email" placeholder="email" type="text" required   />
           
                <Input name="password" placeholder="password" type="text" required   />
                <div>
                  <input required ref={avatarFileInputRef} accept='image/jpeg, image/png, image/jpg' onChange={handleAvatarFileChange}  type='file' hidden name='avatar' id='avatar' className=' w-80 rounded-md h-10 px-4 py-2 bg-transparent border border-gray-200' />
                  <div onClick={handleAvatarFileSelect} className='flex text-gray-500 space-x-4 items-center cursor-pointer'>
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
                  <input required type='file' ref={coverImageFileInputRef} accept='image/jpeg, image/png, image/jpg' onChange={handleCoverImageFileChange} hidden  name='coverImage' id='coverImage' className=' w-80 rounded-md h-10 px-4 py-2 bg-transparent border border-gray-200' />
                  <div onClick={handleCoverImageFileSelect}  className='flex text-gray-500 space-x-4 items-center cursor-pointer'>
                  {coverImagePreview && (
                    <Image width={100} height={100}
                     src={coverImagePreview} alt="cover image Preview"
                     className='rounded-full w-20 h-10'  />
                  )}
                     
                      <Image width={30} height={30} src="https://www.svgrepo.com/show/530408/upload.svg" alt='avatar upload'/>
                    <h4>Upload your Cover Image</h4>
                  </div>
                </div>


                <button type='submit' className='bg-black text-white hover:opacity-90 duration-500 px-4 py-4 rounded'>Register</button>
                
                <Link href='/login' className='border text-center px-4 py-4 hover:bg-green-300 rounded duration-500 font-semibold '>Log in</Link>
            </form>
        </div>
    
        <Image unoptimized className='rounded-xl' width={560} height={560} src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExOGlvNHExc2t2dGR1YW84eXFzank3azI4b3drYm1zYWZvNWx5OXE0ZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/wwg1suUiTbCY8H8vIA/giphy.gif" alt="matrix" />
     
        <div></div>

    </div></main>
  )
}

export default RegsiterPage