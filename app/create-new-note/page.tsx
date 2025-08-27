"use client"
import { FormEvent, useState } from 'react'

const NotePage = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSave = async (e: FormEvent) => {
        e.preventDefault()

        try {
            const res = await fetch('/api/note', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, content }),
            });

            if(res.ok) {
                console.log("Note saved successfully");
            } else {
                console.error("Failed to save note");
            }
        } catch (error) {
            console.error("Error saving note:", error);
        }
    }

    return (
        <form onSubmit={handleSave} className='w-full h-full p-16 flex flex-col rounded-3xl gap-8 bg-accent'>
            <header className='w-full h-fit flex items-center gap-12'>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    id="title"
                    name="title"
                    type="text"
                    placeholder='Title'
                    className='bg-background max-w-[400px] border-2 border-primary rounded-lg w-full h-12 px-4 py-2 text-xl font-bold text-foreground'
                />
                <div className='flex gap-4 lg:gp-8'>
                    <button type="submit" className='h-12 px-6 bg-primary rounded-lg text-foreground font-bold'>
                        Save
                    </button>
                    <button onClick={() => {window.location.href = "/"}} type="button" className='min-w-[115px] text-nowrap flex-nowrap h-12 px-6 bg-dangerous rounded-lg text-background font-bold w-fit'>
                        Go back
                    </button>
                </div>
            </header>
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                id="content"
                name="content"
                placeholder='Start writing your note here...'
                className='bg-background w-full h-[600px] p-4 rounded-lg border-2 border-primary text-foreground text-lg resize-none'
            />
        </form>
    )
}

export default NotePage