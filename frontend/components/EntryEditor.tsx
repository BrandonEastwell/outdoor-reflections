"use client"
import EntryForm from "@/components/EntryForm";
import {useEffect, useState} from "react";
import {EditMode} from "@/types/customTypes";
import {SVG_PATHS} from "@/constants/svgPaths";
import IconButton from "@/components/IconButton";
import {DrawPath, Entry} from "@/types/entryTypes";
import {EntryContext} from "@/utils/entryContext";
import Database from "../lib/database";

const db = new Database();

export default function EntryEditor({ initEntry } : { initEntry: Entry }) {
    const [mode, setMode] = useState<EditMode>("text");
    const [drawColor, setDrawColor] = useState<string>('#000000')
    const [drawHistory, setDrawHistory] = useState<DrawPath[]>([]);
    const [entry, setEntry] = useState<Entry>(initEntry);

    const onSaveEntry = async () => {
        await db.saveToDB(entry, "reflections");
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            onSaveEntry()
        }, 1000);
        return () => clearTimeout(timeout);
    }, [entry])

    const drawUndo = () => {
        if (entry.drawings.length === 0) return;
        setEntry(prevEntry => ({...prevEntry, drawings: prevEntry.drawings.slice(0, -1)}));
        setDrawHistory(prevHistory => [...prevHistory, entry.drawings[entry.drawings.length - 1]]);
    }

    const drawRedo = () => {
        if (drawHistory.length === 0) return;
        setEntry(prevEntry => ({...prevEntry, drawings: [...prevEntry.drawings, drawHistory[drawHistory.length - 1]]}));
        setDrawHistory(prevHistory => prevHistory.slice(0, -1));
    }

    return (
        <div className="flex flex-col grow w-full gap-2 px-3 pb-3 pt-2 bg-white rounded-2xl mt-4">
            <EntryContext value={{entry, setEntry, drawHistory, drawColor, setDrawColor}}>
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
                                    onClick={() => drawUndo()} />
                        <IconButton svgIconPath={SVG_PATHS.forwardIcon}
                                    fill={"#000000"}
                                    iconSize={2}
                                    onClick={() => drawRedo()} />
                    </div>
                    <div className="flex flex-row items-center gap-1">
                        <IconButton svgIconPath={SVG_PATHS.saveIcon}
                                    fill={"#000000"}
                                    iconSize={2}
                                    onClick={() => onSaveEntry()} />
                    </div>
                </div>
            </EntryContext>
        </div>
    )
}