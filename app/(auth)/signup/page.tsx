"use client"
import Link from 'next/link'
import React, { useState } from 'react'

const SignupPage = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch('/api/auth/send-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            })

            const data = await res.json();
            if (res.ok && res.status === 200) {
                window.location.href = `/verify-otp?email=${email}`;
            } else {
                setError(data.error || "Something went wrong. Please try again later.");
            }
        } catch (error) {
            setError("Something went wrong. Please try again later.");
            console.log(error);
        }
    }


    return (
        <div className='w-full h-full flex items-center justify-center'>
            <section className='w-fit min-w-[300px] h-fit flex flex-col p-8 rounded-3xl bg-accent gap-8'>
                <form onSubmit={handleSubmit} className='flex flex-col items-center gap-4 w-full'>
                    <header className='w-full h-fit mb-6'>
                        <p className='font-bold text-4xl'>Create an account</p>
                    </header>
                    <div className='flex flex-col w-full'>
                        <input
                            value={email}
                            onChange={(e) => {setEmail(e.target.value)}}
                            id="email"
                            name="email"
                            type="email"
                            disabled={loading}
                            required
                            placeholder='Email'
                            className='w-full h-12 px-4 py-2 rounded-lg border-2 border-primary text-foreground' />
                    </div>
                    <button type='submit' className='w-full h-12 bg-primary rounded-lg'>Send Code</button>
                </form>
                <Link href="/signin" className='mt-4 text-center hover:underline'>Already have an account? Sign In</Link>
                {error && <p className='text-red-500 text-center'>{error}</p>}
            </section>
        </div>
    )
}

export default SignupPage