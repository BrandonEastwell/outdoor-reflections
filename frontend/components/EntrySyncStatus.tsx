"use client"
import {useEffect, useState} from "react";
import Database from "@/lib/database";
import DrawIcon from "@/components/DrawIcon";
import {SVG_PATHS} from "@/constants/svgPaths";
new Database();
type SyncStatus = "unsynced" | "syncing" | "synced";

export default function EntrySyncStatus({ isEntrySynced } : { isEntrySynced: boolean }) {
    const [isSyncing, setIsSyncing] = useState(false)
    const [syncStatus, setSyncStatus] = useState<SyncStatus>(isEntrySynced ? "synced" : "unsynced");

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