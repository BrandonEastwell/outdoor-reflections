"use client"
import Database from "@/lib/database";
import {Entry} from "@/types/entryTypes";
import {useAuth} from "@/lib/context/auth";
import {useEffect, useState} from "react";

const db = new Database();
export default function Entries() {
    const [entries, setEntries] = useState<Entry[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { userId } = useAuth()

    useEffect(() => {
        async function loadEntries() {
            const entries: Entry[] | undefined = await db.getAll('reflections');
            if (!entries) return;

            let filteredEntries: Entry[] = [];
            if (!userId) filteredEntries = entries.filter(entry => entry.user_id === undefined)
            else filteredEntries = entries.filter(entry => entry.user_id === userId)
            setEntries(filteredEntries)
            setLoading(false);
        }

        loadEntries()
    });

    return (
        <div>
            { loading && <p>Loading...</p> }
            { !loading && entries.length === 0 && <p>Create your first entry</p> }
            { !loading && entries.map(entry => (
                <div key={entry.id} className="flex flex-col p-1 rounded-lg bg-amber-50">
                </div>
            ))}
        </div>
    )
}
