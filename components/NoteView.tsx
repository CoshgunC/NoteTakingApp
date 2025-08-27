import React from 'react'

const NoteView = () => {
  const text = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex officiis et dignissimos incidunt expedita ad aperiam laudantium sequi! Aliquam incidunt officia laboriosam quas beatae sed porro minus delectus corporis et."
  return (
    <article className='w-full bg-background rounded-2xl p-4 flex flex-col justify-between gap-4'>
      <div className='w-full h-fit'>
        <header className='w-full h-fit '>
          <p className='font-bold text-3xl'>Title</p>
        </header>
        <p className='mt-4'>{text.slice(0, 100) + "..."}</p>
      </div>
      <div className='flex items-center gap-4'>
        <button className='bg-accent px-2 py-1 rounded-md'>Edit</button>
        <button className='bg-accent px-2 py-1 rounded-md'>View</button>
        <button className='bg-dangerous text-white px-2 py-1 rounded-md'>Delete</button>
      </div>
    </article>
  )
}

export default NoteView