// /api/note/route.ts
import { type NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/utils/db/supabaseServer";

// getting all notes
export async function GET(request: NextRequest) {
    const supabase = await supabaseServer();
    const { data, error } = await supabase
        .from("notes")
        .select("*");

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(data);
}

// creating a note
export async function POST(request: NextRequest) {
    const supabase = await supabaseServer();
    const { title, content } = await request.json();

    if (!title || !content) {
        return NextResponse.json({ error: "Title and Content are required" }, { status: 400 });
    }

    const { data, error } = await supabase
        .from("notes")
        .insert({ title, content })
        .select()
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(data, { status: 201 });
}