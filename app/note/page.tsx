"use client"
import React from 'react'

const NotePage = () => {
    return (
        <div className='w-full h-full p-16 flex flex-col gap-8'>
            <header className='w-full h-fit flex items-center gap-12'>
                <input
                    id="title"
                    name="title"
                    type="text"
                    placeholder='Title'
                    className='max-w-[400px] border-2 border-primary rounded-lg w-full h-12 px-4 py-2 text-xl font-bold text-foreground'
                />
                <div className='flex gap-8'>
                    <button className='h-12 px-6 bg-primary rounded-lg text-foreground font-bold'>
                        Save
                    </button>
                    <button className='h-12 px-6 bg-dangerous rounded-lg text-background font-bold'>
                        Delete
                    </button>
                </div>
            </header>
            <textarea
                id="content"
                name="content"
                placeholder='Start writing your note here...'
                className='w-full h-[600px] p-4 rounded-lg border-2 border-primary text-foreground text-lg resize-none'
            />
        </div>
    )
}

export default NotePage