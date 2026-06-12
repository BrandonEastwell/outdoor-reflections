"use client"

import { SVG_PATHS } from "@/constants/svgPaths";
import {useEffect, useState} from "react";
import { motion } from "motion/react";
import SidebarItem from "@/components/SidebarItem";
import AnimatedLabel from "@/components/AnimatedLabel";
import Database from "@/lib/database";
import {createEmptyEntry, isEntryEmpty, sortEntriesByLastUpdated} from "@/utils/entryUtils";
import {Entry} from "@/types/entryTypes";
import {useRouter} from "next/navigation";

const db = new Database();

export default function SideBar() {
    const [toggleSidebar, setToggleSidebar] = useState<boolean>(false);
    const [recentEntries, setRecentEntries] = useState<Entry[]>([]);
    const toggle = () => setToggleSidebar(!toggleSidebar);
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

    return (
        <motion.div className={"flex flex-col h-screen border-r pl-1 pr-1 bg-rose/5 border-black/10 select-none"}
                    animate={{ width: toggleSidebar ? 180 : 40 }}
                    transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                    }}>
            <div className={"w-full flex flex-col items-start"}>
                <SidebarItem
                    svgPaths={SVG_PATHS.flowerIcon}
                    label="reflections"
                    expanded={toggleSidebar}
                    onClick={toggle}
                    iconSize={42}
                    strokeWidth={1.5}
                    className="flex flex-row items-center font-flower text-3xl text-nowrap cursor-pointer"
                />
            </div>

            <div className={"w-full flex flex-col items-start gap-1 mt-6 text-lg"}>
                <SidebarItem
                    svgPaths={SVG_PATHS.userIcon}
                    label="Login"
                    expanded={toggleSidebar}
                    onClick={toggle}
                />
                <SidebarItem
                    svgPaths={SVG_PATHS.reflectionIcon}
                    label="Entries"
                    expanded={toggleSidebar}
                    onClick={toggle}
                />
                <SidebarItem
                    iconSize={25}
                    svgPaths={SVG_PATHS.newEntryIcon}
                    label="New entry"
                    expanded={toggleSidebar}
                    onClick={createNewEntry}
                />
            </div>
            <div className="w-full flex flex-col place-items-start gap-1 mt-6 text-lg">
                <AnimatedLabel show={toggleSidebar} className="font-flower text-nowrap px-2 font-bold">
                    Recent entries
                </AnimatedLabel>
                { recentEntries.length > 0 && recentEntries.map((entry) => (
                    <button key={entry.id} onClick={() => recentEntryClickHandler(entry)} className={"flex w-full px-2 rounded-lg cursor-pointer " + (window.location.pathname === `/entry/${entry.id}` ? "bg-rose/25" : "hover:bg-rose/10")}>
                        <AnimatedLabel show={toggleSidebar} className="font-flower text-nowrap">
                            { entry.title ? entry.title : "Untitled Reflection" }
                        </AnimatedLabel>
                    </button>
                ))}
            </div>
        </motion.div>
    )
}
