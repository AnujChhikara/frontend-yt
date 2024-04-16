import Link from 'next/link'

export default function Footer() {
  return (
    <div
     className='text-center flex justify-center space-x-1 mt-auto p-4 pt-12 text-sm'>
    <p>Made by</p>
    <Link className='underline pr-1' 
    href='https://github.com/AnujChhikara'>
     Anuj 
    </Link>
    🚀 
    </div>
  )
}
