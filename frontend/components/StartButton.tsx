"use client"
import {useRouter} from "next/navigation";
import {Entry} from "@/types/entryTypes";
import Database from "@/lib/database";
const db = new Database();

async function createEmptyEntry() {
    const initEntry: Entry = {
        id: crypto.randomUUID(),
        created_at: new Date().toISOString(),
        last_synced_at: null,
        sync_status: "pending",
        updated_at: new Date().toISOString(),
        title: "",
        content: "",
        date: new Date().toISOString(),
        drawings: []
    }

    await db.saveToDB(initEntry, "reflections")
    return initEntry
}

export default function StartButton() {
    const router = useRouter();

    async function handleClick() {
        const emptyEntry = await createEmptyEntry();
        router.push(`/entry/${emptyEntry.id}`);
    }

    return (
        <button type="button" onClick={handleClick} className="flex h-12 w-full items-center justify-center gap-2 rounded-lg px-5 text-background transition-colors bg-[#ce796b] hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]">
            Let's start
        </button>
    )
}