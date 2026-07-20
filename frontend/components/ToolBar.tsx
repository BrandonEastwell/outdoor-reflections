import BarItem from "@/components/BarItem";
import {SVG_PATHS} from "@/constants/svgPaths";
import {Dispatch, SetStateAction} from "react";
import {EditMode} from "@/types/customTypes";

interface EditorToolbarProps {
    drawUndo: () => void;
    drawRedo: () => void;
    setMode: Dispatch<SetStateAction<EditMode>>;
    mode: EditMode
}

export default function EditorToolbar({ drawUndo, drawRedo, setMode, mode }: EditorToolbarProps) {
    return (
            <div className="fixed flex flex-row rounded-2xl place-self-center border border-white/40 bg-rose/15 p-0.5 shadow-[0_8px_32px_rgba(73,88,103,0.18)] backdrop-blur-xl backdrop-saturate-150 ring-1 ring-rose/10">
                <BarItem iconSize={22} svgPaths={SVG_PATHS.reverseIcon} label={"undo drawing tool"} onClick={() => drawUndo()} />
                <BarItem iconSize={22} svgPaths={SVG_PATHS.forwardIcon} label={"redo drawing tool"} onClick={() => drawRedo()} />
                <BarItem iconSize={22} svgPaths={SVG_PATHS.drawIcon} label={"draw tool"} fill={mode === "drawing" ? "#ce796b" : "#000000"} onClick={() => setMode(mode === "drawing" ? "text" : "drawing")} />
            </div>
    )
}