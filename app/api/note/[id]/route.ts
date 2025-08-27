import { type NextRequest, NextResponse } from "next/server";
import supabaseClient from "@/utils/db/supabaseClient";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = supabaseClient();
  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .eq("id", params.id)
    .single();

    if(error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(data);
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const supabase = supabaseClient();
  const { title, content } = await request.json();

  const { data, error } = await supabase
    .from("notes")
    .update({ title, content })
    .eq("id", params.id)
    .select()
    .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(data);
    
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const supabase = supabaseClient();

  const { data, error } = await supabase
    .from("notes")
    .delete()
    .eq("id", params.id)
    .select()
    .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(data);
    
}