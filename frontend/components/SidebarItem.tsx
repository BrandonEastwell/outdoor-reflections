"use client"

import DrawIcon from "@/components/DrawIcon";
import AnimatedLabel from "@/components/AnimatedLabel";

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
    className = "flex flex-row items-center font-flower text-base text-nowrap cursor-pointer",
}: SidebarItemProps) {
    return (
        <div className={className} onClick={onClick}>
            <div className="grid grid-cols-[30px_1fr] place-items-center">
                <DrawIcon svgPaths={svgPaths} strokeWidth={strokeWidth} iconSize={iconSize} />
                <AnimatedLabel show={expanded}>{label}</AnimatedLabel>
            </div>
        </div>
    );
}
