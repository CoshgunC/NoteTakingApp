import React from 'react'

const NoteView = (note: NoteType) => {
  const { id, title, content } = note;
  return (
    <article className='w-full bg-background rounded-2xl p-4 flex flex-col justify-between gap-4'>
      <div className='w-full h-fit'>
        <header className='w-full h-fit '>
          <p className='font-bold text-3xl'>{title + " - " + "#" + id}</p>
        </header>
        <p className='mt-4'>{content.slice(0, 100) + "..."}</p>
      </div>
      <div className='flex items-center gap-4'>
        <button onClick={() => {window.location.href = `/note?id=${id}`}} className='bg-accent px-2 py-1 rounded-md'>Edit</button>
        <button className='bg-dangerous text-white px-2 py-1 rounded-md'>Delete</button>
      </div>
    </article>
  )
}

export default NoteView