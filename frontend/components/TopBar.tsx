"use client"

import { SVG_PATHS } from "@/constants/svgPaths";
import {useEffect, useState} from "react";
import BarItem from "@/components/BarItem";
import Database from "@/lib/database";
import {createEmptyEntry, isEntryEmpty, sortEntriesByLastUpdated} from "@/utils/entryUtils";
import {Entry} from "@/types/entryTypes";
import {usePathname, useRouter} from "next/navigation";

const db = new Database();

export default function TopBar() {
    const [toggleSidebar, setToggleSidebar] = useState<boolean>(false);
    const [recentEntries, setRecentEntries] = useState<Entry[]>([]);
    const toggle = () => setToggleSidebar(!toggleSidebar);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        const getRecentEntries = async () => {
            const entries = await db.getAll('reflections')
            if (!entries) return;
            const sortedEntries = sortEntriesByLastUpdated(entries)
            setRecentEntries(sortedEntries)
        }

        getRecentEntries()
    }, [])

    const recentEntryClickHandler = (entry: Entry) => {
        router.push(`/entry/${entry.id}`);
        setToggleSidebar(false);
    }

    const createNewEntry = async () => {
        if (window.location.pathname.includes("/entry/")) {
            const id = window.location.pathname.split("/")[2]
            const isCurrentEntryEmpty = await isEntryEmpty(id)
            if (isCurrentEntryEmpty === true) return router.refresh();
        }

        const emptyEntry = await createEmptyEntry();
        router.push(`/entry/${emptyEntry.id}`);
    }

    if (pathname === "/") return;

    return (
        <div className={"w-full my-5 h-20 place-items-center justify-center gap-1 text-lg"}>
            <div className="fixed z-50 flex flex-row gap-1 rounded-2xl border border-white/40 bg-rose/35 p-1 shadow-[0_8px_32px_rgba(73,88,103,0.18)] backdrop-blur-xl backdrop-saturate-150 ring-1 ring-rose/10">
                <BarItem
                    svgPaths={SVG_PATHS.userIcon}
                    label="Login"
                    onClick={toggle}
                />
                <BarItem
                    svgPaths={SVG_PATHS.flowerIcon}
                    label="reflections"
                    onClick={toggle}
                    iconSize={42}
                    strokeWidth={1.5}
                />
                <BarItem
                    iconSize={25}
                    svgPaths={SVG_PATHS.newEntryIcon}
                    label="New entry"
                    onClick={createNewEntry}
                />
            </div>
        </div>
    )
}
