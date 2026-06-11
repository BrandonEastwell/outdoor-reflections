"use client"

import { SVG_PATHS } from "@/constants/svgPaths";
import {useEffect, useState} from "react";
import { motion } from "motion/react";
import SidebarItem from "@/components/SidebarItem";
import AnimatedLabel from "@/components/AnimatedLabel";
import Database from "@/lib/database";
import {sortEntriesByLastUpdated} from "@/utils/entryUtils";
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

    return (
        <motion.div className={"flex flex-col pl-1 pr-3 h-screen m-0.5 border-r bg-rose/5 border-black/10"}
                    animate={{ width: toggleSidebar ? 180 : 32 }}
                    transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                    }}>
            <motion.div animate={{ marginLeft: toggleSidebar ? 0 : -5 }}
                        className={"w-full flex flex-col items-start"}>
                <SidebarItem
                    svgPaths={SVG_PATHS.flowerIcon}
                    label="reflections"
                    expanded={toggleSidebar}
                    onClick={toggle}
                    iconSize={42}
                    strokeWidth={1.5}
                    className="flex flex-row items-center font-flower text-3xl text-nowrap cursor-pointer"
                />
            </motion.div>

            <motion.div animate={{ marginLeft: toggleSidebar ? 0 : -4, paddingLeft: toggleSidebar ? 4 : 0 }}
                        className={"w-full flex flex-col items-start gap-1 mt-6 px-2 text-lg"}>
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
                    onClick={toggle}
                />
            </motion.div>
            <div className="w-full flex flex-col place-items-start gap-1 mt-6 text-lg">
                <AnimatedLabel show={toggleSidebar} className="font-flower text-nowrap px-2 font-bold">
                    Recent entries
                </AnimatedLabel>
                { recentEntries.length > 0 && recentEntries.map((entry) => (
                    <button onClick={() => recentEntryClickHandler(entry)} className="flex w-full px-2 hover:bg-rose/10 rounded-lg cursor-pointer">
                        <AnimatedLabel show={toggleSidebar} className="font-flower text-nowrap">
                            { entry.title ? entry.title : "Untitled Reflection" }
                        </AnimatedLabel>
                    </button>
                ))}
            </div>
        </motion.div>
    )
}
