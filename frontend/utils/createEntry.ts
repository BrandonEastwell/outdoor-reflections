import {Entry} from "@/types/entryTypes";
import Database from "@/lib/database";
const db = new Database();

export default async function createEntry() {
    const initEntry: Entry = {
        id: crypto.randomUUID(),
        created_at: new Date(),
        last_synced_at: null,
        sync_status: "pending",
        updated_at: new Date(),
        title: "",
        content: "",
        date: new Date(),
        drawings: []
    }

    await db.saveToDB(initEntry, "reflections")
    return initEntry
}