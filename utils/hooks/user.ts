import { useEffect, useState } from "react";
import { User } from "@supabase/auth-js";
import supabaseClient from "@/utils/db/supabaseClient";

export function useSupabaseUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabaseClient()
      .auth.getUser()
      .then(({ data }) => {
        setUser(data?.user ?? null);
        setLoading(false);
      });
  }, []);

  return { user, loading };
}