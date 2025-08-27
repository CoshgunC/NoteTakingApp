"use client"
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React, { useState } from 'react'

const VerifyOtpUI = () => {
    const search = useSearchParams();
    const email = search.get("email");

    const [otp, setOtp] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await fetch('/api/auth/verify-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, otp }),
            })

            const data = await res.json();
            if (res.ok && res.status === 200) {
                window.location.href = '/';
            } else {
                console.log(data);
                alert(data.error || "Something went wrong. Please try again later.");
            }
        } catch (error) {
            alert("Something went wrong. Please try again later.");
            console.log(error);
        }
    }

    return (
        <div className='w-full h-full flex items-center justify-center'>
            <section className='w-fit min-w-[300px] h-fit flex flex-col p-8 rounded-3xl bg-accent gap-8'>
                <form onSubmit={handleSubmit} className='flex flex-col items-center gap-4 w-full'>
                    <header className='w-full h-fit mb-6'>
                        <p className='font-bold text-4xl'>Create an account</p>
                        <span>We have sent an OTP code to: <i className='text-gray-700'>{email}</i></span>
                    </header>
                    <div className='flex flex-col w-full'>
                        <input
                            value={otp}
                            onChange={(e) => {setOtp(e.target.value)}}
                            id="otp"
                            name="otp"
                            type="text"
                            maxLength={6}
                            inputMode='decimal'
                            pattern="[0-9]*"
                            required
                            placeholder='OTP code'
                            className='w-full h-12 px-4 py-2 rounded-lg border-2 border-primary text-foreground'
                        />

                    </div>
                    <button type='submit' className='w-full h-12 bg-primary rounded-lg'>Verify OTP</button>
                </form>
                <Link href="/signup" className='mt-4 text-center hover:underline'>Want to send the code to different email? Go back</Link>
            </section>
        </div>
    )
}

export default VerifyOtpUI