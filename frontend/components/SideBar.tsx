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
        <motion.div animate={{ width: toggleSidebar ? 160 : 32 }}
                    transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                    }}
                    className={"flex flex-col pl-1 max-w-40 items-center h-screen m-0.5 border-r bg-rose/5 border-rose/10"}>
            <SidebarItem
                svgPaths={SVG_PATHS.flowerIcon}
                label="reflections"
                expanded={toggleSidebar}
                onClick={toggle}
                iconSize={42}
                strokeWidth={1.5}
                className="flex flex-row place-items-center font-flower text-2xl cursor-pointer"
            />
            <motion.div animate={{ placeItems: toggleSidebar ? "start" : "center"}}
                className={"w-full flex flex-col gap-1 mt-6"}>
                <SidebarItem
                    svgPaths={SVG_PATHS.userIcon}
                    label="login"
                    expanded={toggleSidebar}
                    onClick={toggle}
                />
                <SidebarItem
                    svgPaths={SVG_PATHS.reflectionIcon}
                    label="new entry"
                    expanded={toggleSidebar}
                    onClick={toggle}
                />
            </motion.div>
            <div className="w-full flex flex-col place-items-start gap-1 mt-6">
                <AnimatedLabel show={toggleSidebar} className="font-flower text-nowrap pl-1 font-bold">
                    recent entries
                </AnimatedLabel>
            </div>
        </motion.div>
    )
}
