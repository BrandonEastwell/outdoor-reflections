"use client"
import {useEffect, useState} from "react";
import Database from "@/lib/database";
import DrawIcon from "@/components/DrawIcon";
import {SVG_PATHS} from "@/constants/svgPaths";
const db = new Database();

type SyncStatus = "unsynced" | "syncing" | "synced";

export default function SyncHandler({ isEntrySynced } : { isEntrySynced: boolean }) {
    const [isSyncing, setIsSyncing] = useState(false)
    const [syncStatus, setSyncStatus] = useState<SyncStatus>(isEntrySynced ? "synced" : "unsynced");

    async function syncPendingEntries() {
        const entries = await db.getAll('reflections')
        if (!entries) return;

        const entriesToSync = entries.map(entry => entry.sync_status = "pending")
        const res = await fetch("http://localhost:8000/reflections/sync", {
            method: "POST",
            body: JSON.stringify(entriesToSync)
        })
    }

    useEffect(() => {
        window.addEventListener("online", () => {

        })

        window.addEventListener("offline", () => {

        })

    }, [])

    return (
        <div className="absolute ml-1.5 left-full place-self-center flex flex-row font-mono text-sm rounded-2xl p-0.5">
            { syncStatus === "synced" && (
                <DrawIcon fill={"green"} strokeWidth={2} iconSize={16} svgPaths={SVG_PATHS.syncedIcon} />
            )}
            { syncStatus === "unsynced" && (
                <DrawIcon fill={"red"} strokeWidth={2} iconSize={16} svgPaths={SVG_PATHS.unsyncedIcon} />
            )}
        </div>
    )
}