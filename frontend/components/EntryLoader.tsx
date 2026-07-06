"use client"
import EntryEditor from "@/components/EntryEditor";
import Database from "../lib/database";
import {Entry} from "@/types/entryTypes";
import {useEffect, useState} from "react";


export default function EntryLoader({ id } : { id: string }) {
    const [entry, setEntry] = useState<Entry | null>(null)
    const db = new Database();

    useEffect(() => {
        async function loadEntry() {
            try {
                // TODO set if entry is users entry to show (editable view)
                const data = await db.get(id, "reflections")
                if (data) setEntry(data);
            } catch (error) {
                console.error("Failed to load entry", error)
            }
        }

        loadEntry();
    }, [])

    return (
        entry && <EntryEditor initEntry={entry} />
    )
}