"use client"
import {useEffect} from "react";
import {syncPendingEntries} from "@/lib/api/reflections";

export default function SyncManager() {

    useEffect(() => {
        window.addEventListener("online", syncPendingEntries);
        window.addEventListener("offline", syncPendingEntries);
        return () => {
            window.removeEventListener("online", syncPendingEntries);
            window.removeEventListener("offline", syncPendingEntries);
        };
    }, []);

    return null;
}