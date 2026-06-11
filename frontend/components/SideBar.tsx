"use client"

import { SVG_PATHS } from "@/constants/svgPaths";
import { useState } from "react";
import { motion } from "motion/react";
import SidebarItem from "@/components/SidebarItem";
import AnimatedLabel from "@/components/AnimatedLabel";

export default function SideBar() {
    const [toggleSidebar, setToggleSidebar] = useState<boolean>(false);
    const toggle = () => setToggleSidebar(!toggleSidebar);



    return (
        <motion.div className={"flex flex-col pl-1 pr-3 h-screen m-0.5 border-r bg-rose/5 border-black/10"}
                    animate={{ width: toggleSidebar ? 160 : 32 }}
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
                    className="flex flex-row items-center font-flower text-2xl text-nowrap cursor-pointer"
                />
            </motion.div>

            <motion.div animate={{ marginLeft: toggleSidebar ? 0 : -3 }}
                        className={"w-full flex flex-col items-start gap-1 mt-6"}>
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
            <div className="w-full flex flex-col place-items-start gap-1 mt-6">
                <AnimatedLabel show={toggleSidebar} className="font-flower text-nowrap pl-1 font-bold">
                    Recent entries
                </AnimatedLabel>
            </div>
        </motion.div>
    )
}
