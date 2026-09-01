"use client"
import Database from "@/lib/database";
import {Entry} from "@/types/entryTypes";
import {useAuth} from "@/lib/context/auth";

const db = new Database();
export default async function Entries() {
    const { userId } = useAuth()
    const entries: Entry[] | undefined = await db.getAll('reflections');
    if (!entries) return;

    if (!userId) entries.filter(entry => entry.user_id === undefined)
    else entries.filter(entry => entry.user_id === userId)

    return (
        <div>
            { entries.map(entry => (
                <div key={entry.id}>{entry.title}</div>
            ))}
        </div>
    )
}
