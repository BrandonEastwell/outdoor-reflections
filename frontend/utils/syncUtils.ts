import Database from "@/lib/database";

const db = new Database();

export async function syncPendingEntries() {
    const entries = await db.getAll('reflections')
    if (!entries) return;

    const entriesToSync = entries.map(entry => entry.sync_status = "pending")
    const res = await fetch("http://localhost:8000/reflections/sync", {
        method: "POST",
        body: JSON.stringify(entriesToSync)
    })
}