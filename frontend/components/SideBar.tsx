"use client"

import IconButton from "@/components/IconButton";
import {SVG_PATHS} from "@/constants/svgPaths";
import {useState} from "react";
import DrawIcon from "@/components/DrawIcon";
import { motion, AnimatePresence } from "motion/react";

export default function SideBar() {
    const [toggleSidebar, setToggleSidebar] = useState<boolean>(false);

    return (
        <motion.div animate={{ width: toggleSidebar ? 160 : 32 }}
                    transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                    }}
                    className={"flex flex-col max-w-40 items-center h-screen m-0.5 border-r bg-rose/5 border-rose/10"}>
            <div className={"flex flex-row items-center font-flower text-2xl cursor-pointer"} onClick={() => setToggleSidebar(!toggleSidebar)}>
                <DrawIcon svgPaths={SVG_PATHS.flowerIcon} strokeWidth={1.5} iconSize={42}></DrawIcon>
                <AnimatePresence>
                    {toggleSidebar && (
                        <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.15 }}
                        >
                            reflections
                        </motion.span>
                    )}
                </AnimatePresence>
            </div>
            <div className="w-full flex flex-col place-items-center gap-1 mt-6">
                <IconButton svgIconPath={SVG_PATHS.reflectionIcon} iconSize={30} strokeWidth={2} onClick={() => setToggleSidebar(!toggleSidebar)} />
                <IconButton svgIconPath={SVG_PATHS.userIcon} iconSize={30} strokeWidth={2} onClick={() => {}} />
            </div>
        </motion.div>
    )
}