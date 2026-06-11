"use client"

import DrawIcon from "@/components/DrawIcon";
import AnimatedLabel from "@/components/AnimatedLabel";
import { motion } from "motion/react";

interface SidebarItemProps {
    svgPaths: string[];
    label: string;
    expanded: boolean;
    onClick?: () => void;
    iconSize?: number;
    strokeWidth?: number;
    className?: string;
}

export default function SidebarItem({
    svgPaths,
    label,
    expanded,
    onClick,
    iconSize = 30,
    strokeWidth = 2,
    className = "flex flex-row w-full hover:bg-rose/10 py-1 rounded-lg items-center font-flower text-nowrap cursor-pointer",
}: SidebarItemProps) {
    return (
        <motion.div className={className} onClick={onClick} animate={{ paddingLeft: expanded ? 4 : 0, paddingRight: expanded ? 4 : 0 }}>
            <div className="grid grid-cols-[30px_1fr] place-items-center">
                <DrawIcon svgPaths={svgPaths} strokeWidth={strokeWidth} iconSize={iconSize} />
                <AnimatedLabel show={expanded}>{label}</AnimatedLabel>
            </div>
        </motion.div>
    );
}
