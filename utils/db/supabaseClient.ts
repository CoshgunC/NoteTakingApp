import { createBrowserClient } from "@supabase/ssr";

export default function supabaseClient(){
    return createBrowserClient(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_ANON_KEY!
    )
}
