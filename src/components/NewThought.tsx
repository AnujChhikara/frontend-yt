
import React from 'react'
import Input from './input'

export default function NewTweet() {

  return (
    <div>
        <form action="">
            <label htmlFor="tweet">new tweet</label>
             <Input id='tweet' name='tweet' placeholder='share your thoughts..' type='text'/>
        </form>
        
      
    </div>
  )
}
