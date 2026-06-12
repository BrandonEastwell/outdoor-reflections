import {Entry} from "@/types/entryTypes";
import Database from "@/lib/database";
const db = new Database();

export function sortEntriesByLastUpdated(entries: Entry[])  {
    return entries.sort((a,b) => {
        return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    })
}

export async function isEntryEmpty(id: string) {
    const entry = await db.get(id, "reflections")
    if (!entry) return Error("Entry not found");
    return entry.content === "" && entry.title === "" && entry.drawings.length === 0
}

export async function createEmptyEntry() {
    const curDate = new Date().toISOString();

    const initEntry: Entry = {
        id: crypto.randomUUID(),
        created_at: curDate,
        last_synced_at: null,
        sync_status: "pending",
        updated_at: curDate,
        title: "",
        content: "",
        date: curDate,
        drawings: []
    }

    await db.saveToDB(initEntry, "reflections")
    return initEntry
}