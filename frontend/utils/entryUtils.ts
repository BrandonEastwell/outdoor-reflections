import {Entry} from "@/types/entryTypes";
import Database from "@/lib/database";
const db = new Database();

export function sortEntriesByLastUpdated(entries: Entry[])  {
    return entries.sort((a,b) => {
        return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    })
}

export async function createEmptyEntry() {
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