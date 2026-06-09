"use client"

import IconButton from "@/components/IconButton";
import {SVG_PATHS} from "@/constants/svgPaths";
import {useState} from "react";

export default function SideBar() {
    const [toggleSidebar, setToggleSidebar] = useState<boolean>(false);

    return (
        <div className={"flex flex-col w-full mx-auto place-items-center h-screen m-0.5 border-r bg-rose/5 border-rose/10" + (toggleSidebar ? " max-w-30" : " max-w-6")}>
            <IconButton svgIconPath={SVG_PATHS.flowerIcon} iconSize={28} strokeWidth={1.5} onClick={() => setToggleSidebar(!toggleSidebar)} />
            <div className="w-full flex flex-col place-items-center gap-1 mt-6">
                <IconButton svgIconPath={SVG_PATHS.reflectionIcon} iconSize={20} strokeWidth={2} onClick={() => setToggleSidebar(!toggleSidebar)} />
                <IconButton svgIconPath={SVG_PATHS.userIcon} iconSize={20} strokeWidth={2} onClick={() => {}} />
            </div>
        </div>
    )
}