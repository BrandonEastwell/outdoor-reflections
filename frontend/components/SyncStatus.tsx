"use client"
import DrawIcon from "@/components/DrawIcon";
import {SVG_PATHS} from "@/constants/svgPaths";
import {useState} from "react";

type SyncStatus = "unsynced" | "syncing" | "synced";

export default function SyncStatus({ isEntrySynced } : { isEntrySynced: boolean }) {
    const [syncStatus, setSyncStatus] = useState<SyncStatus>(isEntrySynced ? "synced" : "unsynced");

    return (
        <div className="fixed flex flex-row font-mono gap-1 items-center text-sm rounded-2xl place-self-end self-center p-0.5 mr-20">
            { syncStatus === "synced" && (
                <DrawIcon fill={"green"} strokeWidth={2} iconSize={20} svgPaths={SVG_PATHS.syncedIcon} />
            )}
            { syncStatus === "unsynced" && (
                <DrawIcon fill={"red"} strokeWidth={2} iconSize={20} svgPaths={SVG_PATHS.unsyncedIcon} />
            )}
        </div>
    )
}