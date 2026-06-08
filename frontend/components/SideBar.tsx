"use client"

import IconButton from "@/components/IconButton";
import {SVG_PATHS} from "@/constants/svgPaths";

export default function SideBar() {

    return (
        <div className="flex flex-col items-center gap-4 left-0 h-screen p-0.5 border-r border-rose/10">
            <IconButton svgIconPath={SVG_PATHS.reflectionIcon} iconSize={2} onClick={() => {}} />
            <IconButton svgIconPath={SVG_PATHS.userIcon} iconSize={2} onClick={() => {}} />
        </div>
    )
}