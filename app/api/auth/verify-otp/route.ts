import { type NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/utils/db/supabaseServer";

export async function POST(request: NextRequest) {
    const supabase = await supabaseServer();
    const { otp, email } = await request.json();
    
    if (!otp || !email) {
        return NextResponse.json({ error: "OTP and Email are required" }, { status: 400 });
    }
    
    const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: "email"
    });
    
    if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
    
    return NextResponse.json({ message: "OTP verified successfully", user: data.user }, { status: 200 });
}