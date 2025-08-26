import React from 'react'

const NoteView = () => {
    const text = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex officiis et dignissimos incidunt expedita ad aperiam laudantium sequi! Aliquam incidunt officia laboriosam quas beatae sed porro minus delectus corporis et."
  return (
    <article className='w-full bg-secondary rounded-2xl p-4 flex flex-col gap-4'>
        <header className='w-full h-fit '>
            <p className='font-bold'>Title</p>
        </header>
        <p>{text.slice(0, 100) + "..."}</p>
        <div className='flex items-center gap-4'>
            <button className='bg-accent px-2 py-1 rounded-md'>Edit</button>
            <button className='bg-accent px-2 py-1 rounded-md'>View</button>
            <button className='bg-red-900/80 px-2 py-1 rounded-md'>Delete</button>
        </div>
    </article>
  )
}

export default NoteView