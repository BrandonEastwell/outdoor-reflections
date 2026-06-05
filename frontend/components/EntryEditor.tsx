"use client"
import EntryForm from "@/components/EntryForm";
import {useState} from "react";import {EditMode} from "@/types/customTypes";
import { SVG_PATHS } from "@/constants/svgPaths";
import IconButton from "@/components/IconButton";
import {EntryDraft} from "@/types/entryTypes";
import {EntryContext} from "@/utils/entryContext";

export default function EntryEditor() {
    const [mode, setMode] = useState<EditMode>("text");
    const [drawHistory, setDrawHistory] = useState<string[]>([]);
    const [entry, setEntry] = useState<EntryDraft>({
        title: "",
        content: "",
        date: new Date(),
        drawingPaths: []
    });

    const saveEntry = () => {

    };

    const handleUndo = () => {
        if (entry.drawingPaths.length === 0) return;
        setEntry(prevEntry => ({...prevEntry, drawingPaths: prevEntry.drawingPaths.slice(0, -1)}));
        setDrawHistory(prevHistory => [...prevHistory, entry.drawingPaths[entry.drawingPaths.length - 1]]);
    }

    const handleRedo = () => {
        if (drawHistory.length === 0) return;
        setEntry(prevEntry => ({...prevEntry, drawingPaths: [...prevEntry.drawingPaths, drawHistory[drawHistory.length - 1]]}));
        setDrawHistory(prevHistory => prevHistory.slice(0, -1));
    }

    return (
        <div className="flex flex-col grow w-full gap-2 px-3 pb-3 pt-2 bg-white rounded-2xl mt-4">
            <EntryContext value={{entry, setEntry, drawHistory}}>
                <div className="flex flex-row justify-between text-rose tracking-wider font-flower">
                    <div>
                        <span className="">saturday, 27.04</span>
                    </div>
                    <div className="flex flex-row items-center gap-1">
                        <IconButton svgIconPath={SVG_PATHS.drawIcon}
                                    fill={mode === "drawing" ? "#ce796b" : "#000000"}
                                    iconSize={2}
                                    onClick={() => setMode(mode === "drawing" ? "text" : "drawing")} />
                    </div>
                </div>
                <div className="flex flex-col flex-1 bg-desert/40 rounded-2xl p-3">
                    <EntryForm mode={mode} />
                </div>
                <div className="flex flex-row justify-between text-rose tracking-wider font-flower">
                    <div className="flex flex-row items-center">
                        <IconButton svgIconPath={SVG_PATHS.reverseIcon}
                                    fill={"#000000"}
                                    iconSize={2}
                                    onClick={() => handleUndo()} />
                        <IconButton svgIconPath={SVG_PATHS.forwardIcon}
                                    fill={"#000000"}
                                    iconSize={2}
                                    onClick={() => handleRedo()} />
                    </div>
                    <div className="flex flex-row items-center gap-1">
                        <IconButton svgIconPath={SVG_PATHS.saveIcon}
                                    fill={"#000000"}
                                    iconSize={2}
                                    onClick={() => {}} />
                    </div>
                </div>
            </EntryContext>
        </div>
    )
}