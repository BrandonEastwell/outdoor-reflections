import SidebarItem from "@/components/SidebarItem";
import {SVG_PATHS} from "@/constants/svgPaths";
import IconButton from "@/components/IconButton";

export default function EditorToolbar() {
    return (
        <div className={"fixed w-full my-5 bottom-0 h-20 place-items-center justify-center gap-1 text-lg"}>
            <div className="fixed z-50 flex flex-row rounded-2xl border border-white/40 bg-rose/25 p-1 shadow-[0_8px_32px_rgba(73,88,103,0.18)] backdrop-blur-xl backdrop-saturate-150 ring-1 ring-rose/10">
                <SidebarItem svgPaths={SVG_PATHS.reverseIcon} label={"draw tool"} onClick={() => drawUndo()} />
                <SidebarItem svgPaths={SVG_PATHS.forwardIcon} label={"draw tool"} onClick={() => drawRedo()} />
                <SidebarItem svgPaths={SVG_PATHS.drawIcon} label={"draw tool"} />
            </div>
        </div>
    )
}