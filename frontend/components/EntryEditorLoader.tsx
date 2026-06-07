"use client"
import EntryEditor from "@/components/EntryEditor";
import Database from "../lib/database";
import {Entry} from "@/types/entryTypes";
import {useEffect, useState} from "react";

export default function EntryEditorLoader({ id } : { id: string }) {
    const [entry, setEntry] = useState<Entry | null>(null)
    const db = new Database();

    useEffect(async () => {
        const data = await db.getFromDB(id, "reflections")
        const entry: Entry = data
    }, [])

    return (
        entry && <EntryEditor initEntry={entry} />
    )
}