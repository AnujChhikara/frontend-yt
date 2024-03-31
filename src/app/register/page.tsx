
'use client'
import Image from 'next/image'
import React, { useRef, useState } from 'react'
import Input from '../../components/input'
import Link from 'next/link'


export default function RegsiterPage()  {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(null);

 
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
    
   const formData = new FormData();
   formData.append('fullName', event.currentTarget.fullName.value);
   formData.append('username', event.currentTarget.username.value);
   formData.append('email', event.currentTarget.email.value);
   formData.append('password', event.currentTarget.password.value);
   formData.append('avatar', avatarFileInputRef.current!.files![0]);
   formData.append('coverImage', coverImageFileInputRef.current!.files![0])
         
   

   const response = await fetch('http://localhost:8000/api/v1/users/register',{
    method:"POST",
    
    body:formData
   })

   if(response.ok) {
    const res_data = await response.json()
    console.log(res_data)
    window.location.href = '/login';
   }
   else{
    const error = await response.json()
    console.log(error)
   }

   

  }

  return (
    <main className='w-screen  flex justify-center pt-8'>
    <div className='   flex justify-center bg-transparent border border-gray-700 rounded  items-center'>
        <div className=' rounded py-8 text-white flex px-6 flex-col space-y-4 justify-start items-start '>
            <h3 className='font-bold text-3xl mb-8'>Registration</h3>
            <form className='flex flex-col space-y-8 ' onSubmit={handelFormSubmittion}>
              <div className='flex space-x-8'>
              <Input name="username" placeholder="username" type="text" required  />
                <Input name="email" placeholder="email" type="text" required   />
              </div>
              <div className='flex space-x-8'>
                <Input name="fullName" placeholder="full name" type="text" required  />
                <Input name="password" placeholder="password" type="text" required   />
              </div>
              <div className='flex space-x-32'>
              <div className=''>
                  <input required ref={avatarFileInputRef} accept='image/jpeg, image/png, image/jpg' onChange={handleAvatarFileChange}  type='file' hidden name='avatar' id='avatar' className=' w-80 rounded-md h-10 px-4 py-2 bg-transparent border border-gray-200' />
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
                  <input required type='file' ref={coverImageFileInputRef} accept='image/jpeg, image/png, image/jpg' onChange={handleCoverImageFileChange} hidden  name='coverImage' id='coverImage' className=' w-80 rounded-md h-10 px-4 py-2 bg-transparent border border-gray-200' />
                  <div onClick={handleCoverImageFileSelect}  className='flex text-gray-400 space-x-4 items-center cursor-pointer'>
                  {coverImagePreview && (
                    <Image width={100} height={100}
                     src={coverImagePreview} alt="cover image Preview"
                     className='rounded-full w-20 h-10'  />
                  )}
                     
                      <Image width={30} height={30} src="https://www.svgrepo.com/show/530408/upload.svg" alt='avatar upload'/>
                    <h4>Upload your Cover Image</h4>
                  </div>
                </div>
                </div>

                    

                <div className='flex justify-center items-center space-x-8 pt-6'>   
                <button type='submit' className='bg-gray-900 border text-white w-72 hover:bg-gray-700 duration-500 px-4 py-4 rounded'>Register</button>
               
                <Link href='/login' className='border text-center w-72 px-4 py-4 hover:bg-green-300 hover:text-black rounded duration-500 font-semibold '>Log in</Link>
                </div>
                
                
            </form>
        </div>
     <div>
      <Image className='m-4  shadow-lg shadow-[#b9b9b9] rounded-2xl ' width={450} height={450} src="https://images.unsplash.com/photo-1531857454108-c65232a962a8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTAyfHxtb3RpdmF0aW9uYWwlMjBxdW90ZXN8ZW58MHx8MHx8fDA%3D"
      alt="random quote" />
     </div>
       
     
        
    </div></main>
  )
}


