import React from 'react'

const NewsLetterBox = () => {

    const onSubmitHandler = (event) => {
        event.preventDefault();
        
    }
    
  return (
    <div className='mt-10 text-center '>
        <p className='text-2xl font-medium text-gray-800'>Unlock 20% Off | Subscribe Today!</p>
        <p className='mt-3 text-gray-400'>Don't miss out—unlock your savings now by subscribing below!</p>
        <form onSubmit={onSubmitHandler} className='flex items-center w-full gap-3 pl-3 mx-auto my-6 border sm:w-1/2 rounded'>
            <input 
                id="newsletter-email"
                name="newsletter_email"
                autoComplete="email"
                className='w-full outline-none sm:flex-1 py-2' 
                type="email" 
                placeholder='hello@gmail.com'
                required 
                aria-label="Newsletter email address"
            />
            <button type='submit' className='px-10 py-4 text-xs text-white bg-black hover:bg-gray-800 transition'>SUBSCRIBE</button>
        </form>
    </div>
  )
}

export default NewsLetterBox
