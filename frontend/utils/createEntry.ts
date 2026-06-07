import {Entry} from "@/types/entryTypes";

export default function createEntry() {
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

    return initEntry
}