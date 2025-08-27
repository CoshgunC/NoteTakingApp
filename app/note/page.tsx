// /note?id=...
"use client"
import { useSearchParams } from 'next/navigation';
import { type FormEvent, useEffect, useState } from 'react'

const NotePage = () => {
    const searchParam = useSearchParams();
    const id = searchParam.get("id");

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            const fetchNote = async () => {
                try {
                    setLoading(true);
                    console.log("Fetching note with ID:", id);
                    
                    const res = await fetch(`/api/note/${id}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });
                    
                    if (!res.ok) {
                        throw new Error(`Failed to fetch note: ${res.status} ${res.statusText}`);
                    }
                    
                    let note = await res.json();
                    note = note[0]

                    setTitle(note.title ?? "");
                    setContent(note.content ?? "");
                    
                    // Add a small delay to verify state was set
                    setTimeout(() => {
                        console.log("After setState - title:", note.title ?? "");
                        console.log("After setState - content:", note.content ?? "");
                    }, 100);
                } catch (error) {
                    console.error("Failed to fetch note:", error);
                    setError(error instanceof Error ? error.message : "Failed to fetch note");
                } finally {
                    setLoading(false);
                }
            };
            
            fetchNote(); // ✅ Actually call the function!
        } else {
            console.log("No id found, redirecting to error");
            window.location.href = "/";
        }
    }, [id]);

    const handleSave = async (e: FormEvent) => {
        e.preventDefault();
        
        if (!id || !title.trim() || !content.trim()) {
            alert("Please fill in both title and content");
            return;
        }

        try {
            const res = await fetch(`/api/note/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title, content }),
            });

            if (!res.ok) {
                throw new Error("Failed to save note");
            }

            alert("Note saved successfully!");
        } catch (error) {
            console.error("Failed to save note:", error);
            alert("Failed to save note");
        }
    };

    const handleDelete = async (e: FormEvent) => {
        e.preventDefault();
        
        if (!id) return;
        
        if (confirm("Are you sure you want to delete this note?")) {
            try {
                const res = await fetch(`/api/note/${id}`, {
                    method: "DELETE",
                });

                if (!res.ok) {
                    throw new Error("Failed to delete note");
                }

                window.location.href = "/";
            } catch (error) {
                console.error("Failed to delete note:", error);
                alert("Failed to delete note");
            }
        }
    };

    if (loading) {
        return (
            <div className='w-full h-full p-16 flex items-center justify-center rounded-3xl bg-accent'>
                <div className='text-xl'>Loading note...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className='w-full h-full p-16 flex flex-col items-center justify-center rounded-3xl bg-accent gap-4'>
                <div className='text-xl text-red-500'>Error: {error}</div>
                <button 
                    onClick={() => window.location.href = "/"}
                    className='px-4 py-2 bg-primary rounded-lg'
                >
                    Go Home
                </button>
            </div>
        );
    }

    return (
        <div className='w-full h-full p-16 flex flex-col rounded-3xl gap-8 bg-accent'>
            <header className='w-full h-fit flex items-center gap-12'>
                <input
                    value={title || ""} 
                    onChange={(e) => setTitle(e.target.value)}
                    id="title"
                    name="title"
                    type="text"
                    placeholder='Title'
                    className='bg-background max-w-[400px] border-2 border-primary rounded-lg w-full h-12 px-4 py-2 text-xl font-bold text-foreground'
                    data-debug-value={title || "empty"}
                />
                <div className='flex gap-4 lg:gap-8'>
                    <button 
                        type="button" 
                        onClick={handleSave}
                        className='h-12 px-6 bg-primary rounded-lg text-foreground font-bold'
                    >
                        Save
                    </button>
                    <button 
                        type="button" 
                        onClick={handleDelete}
                        className='h-12 px-6 bg-dangerous rounded-lg text-background font-bold w-fit'
                    >
                        Delete
                    </button>
                    <button 
                        type="button" 
                        onClick={() => {window.location.href = "/"}}
                        className='h-12 px-6 bg-dangerous rounded-lg text-background font-bold w-fit'
                    >
                        Go Back
                    </button>
                </div>
            </header>
            <textarea
                value={content || ""}
                onChange={(e) => setContent(e.target.value)}
                id="content"
                name="content"
                placeholder='Start writing your note here...'
                className='bg-background w-full h-[600px] p-4 rounded-lg border-2 border-primary text-foreground text-lg resize-none'
            />
        </div>
    )
}

export default NotePage