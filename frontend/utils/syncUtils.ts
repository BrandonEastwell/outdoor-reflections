import Database from "@/lib/database";
import {Entry} from "@/types/entryTypes";

const db = new Database();
const backendApiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL ?? "http://localhost:8000";

export async function syncPendingEntries() {
    const entries = await db.getAll('reflections')
    if (!entries) return;

    const entriesToSync = entries.map(entry => entry.sync_status = "pending")

    try {
        const res = await fetch(`${backendApiUrl}/reflections/sync`, {
            method: "POST",
            body: JSON.stringify(entriesToSync)
        })

        if (!res.ok) throw new Error("Failed to sync entries")
        const body: { entries: Entry[], message: string } = await res.json()
        console.log(body.message)
        return body.entries
    } catch (error) {
        console.error(error)
    }
}