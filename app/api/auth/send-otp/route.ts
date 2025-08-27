// send-otp/route.ts
import { type NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/utils/db/supabaseServer";

export async function POST(request: NextRequest) {
    const supabase = await supabaseServer();
    const { email } = await request.json();
    
    if (!email) {
        return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }
    
    const { data, error } = await supabase.auth.signInWithOtp({
        email,
        options: {
        emailRedirectTo: `${process.env.WEBSITE_URL}/verify-otp`,
        },
    });
    
    if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
    
    return NextResponse.json({ message: "OTP sent to email" }, { status: 200 });
}