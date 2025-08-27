"use client";
import NoteView from "@/components/NoteView";
import { LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { useSupabaseUser } from "@/utils/hooks/user";

export default function Home() {
  const userLoadingData = useSupabaseUser();
  const [notes, setNotes] = useState<NoteType[]>([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await fetch("/api/note", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) throw new Error(res.statusText);
        setNotes(await res.json());
      } catch (error) {
        console.error("Failed to fetch notes:", error);
      }
    };
    fetchNotes();
  }, []); // ✅ only run once

  return (
    <div className="flex flex-col gap-8 w-full h-full bg-accent rounded-2xl p-8">
      {/* Header */}
      <header className="flex items-center gap-4">
        <span className="font-bold text-4xl">
          {userLoadingData.user?.email ?? "Loading..."}
        </span>
        <button className="flex items-center gap-2 hover:bg-background p-2 rounded-md">
          Logout <LogOut />
        </button>
      </header>

      {/* Actions */}
      <section>
        <button
          onClick={() => (window.location.href = "/create-new-note")}
          className="h-12 bg-primary px-6 py-2 rounded-lg"
        >
          Create New
        </button>
      </section>

      {/* Notes */}
      <section className="gap-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[240px] overflow-y-auto">
        {notes.length ? (
          notes.map((note) => <NoteView key={note.id} {...note} />)
        ) : (
          <div className="col-span-full text-center text-lg text-muted-foreground">
            No notes created
          </div>
        )}
      </section>
    </div>
  );
}
