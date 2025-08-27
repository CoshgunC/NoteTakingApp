import { type NextRequest, NextResponse } from "next/server";
import supabaseClient from "@/utils/db/supabaseClient";

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const params = await context.params
  const supabase = supabaseClient()

  const { data, error } = await supabase.from("notes").select("*").eq("id", params.id).single()

  if (error) {
    console.log(error?.message + " ---- " + error?.details)

    if (error.code === "PGRST116") {
      return NextResponse.json({ error: "Note not found" }, { status: 404 })
    }

    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json(data)
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params;
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

  return NextResponse.json({ data }, { status: 200 });
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params;
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
