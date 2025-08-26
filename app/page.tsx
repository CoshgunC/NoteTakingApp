"use client"
import NoteView from "@/components/NoteView";
import { LogOut } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className="flex flex-col gap-8 w-full h-full bg-accent rounded-2xl p-8">
      <header className="w-full h-fit">
        <div className="flex items-center gap-4">
          <span className="font-bold text-4xl">demo@gmail.com</span>
          <button className="flex items-center gap-2 hover:bg-gray-800/80 p-2 rounded-md">Logout <LogOut /></button>
        </div>
      </header>
      <section className="w-full h-fit flex items-center gap-8">
        <button className="h-12 bg-primary px-6 py-2 rounded-lg">Create New</button>
        <input
          placeholder="Search notes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="h-12 px-6 py-2 border-primary border-2 rounded-lg text-foreground" />
      </section>
      <section id="notes-section" className="gap-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[240px] overflow-y-auto">
        <NoteView />
        <NoteView />
        <NoteView />
        <NoteView />
        <NoteView />
        <NoteView />
        <NoteView />
        <NoteView />
        <NoteView />
        <NoteView />
      </section>
    </div>
  );
}
