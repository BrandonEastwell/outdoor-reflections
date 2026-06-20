"use client"
import EntryForm from "@/components/EntryForm";
import {useEffect, useRef, useState} from "react";
import {EditMode} from "@/types/customTypes";
import {SVG_PATHS} from "@/constants/svgPaths";
import IconButton from "@/components/IconButton";
import {DrawPath, Entry} from "@/types/entryTypes";
import {EntryContext} from "@/utils/entryContext";
import Database from "../lib/database";
import DatePicker from "@/components/DatePicker";

const db = new Database();

const isEntryBlank = (entry: Entry) => {
    return (
        entry.title.trim() === "" &&
        entry.content.trim() === "" &&
        entry.drawings.length === 0
    );
};

export default function EntryEditor({ initEntry } : { initEntry: Entry }) {
    const [mode, setMode] = useState<EditMode>("text");
    const [drawColor, setDrawColor] = useState<string>('#000000')
    const [drawHistory, setDrawHistory] = useState<DrawPath[]>([]);
    const [entry, setEntry] = useState<Entry>(initEntry);
    const isFirstRender = useRef(true);

    const saveEntry = async () => {
        const entryToSave = {...entry, updated_at: new Date().toISOString()};
        await db.saveToDB(entryToSave, "reflections");
    }

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return
        }

        if (isEntryBlank(entry)) return;

        const timeout = setTimeout(() => {
            saveEntry()
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
        <div className="flex flex-col place-items-center aspect-3/4 w-full h-full origin-top">
            <input
                value={entry.title}
                onChange={(e) =>
                    setEntry({
                        ...entry,
                        title: e.target.value,
                    })
                }
                maxLength={30}
                placeholder="untitled reflection"
                className="max-w-xs bg-transparent text-center outline-none text-3xl font-semibold font-flower tracking-wider text-black placeholder-black"
            />
            <div className="flex flex-col grow w-full h-full gap-2 px-3 pb-3 pt-2 rounded-2xl mt-4">
                <EntryContext value={{entry, setEntry, drawHistory, drawColor, setDrawColor}}>
                    <div className="flex flex-row justify-between text-rose tracking-wider font-flower">
                        <DatePicker />
                        <div className="flex flex-row items-center gap-1">
                            <IconButton svgIconPath={SVG_PATHS.drawIcon}
                                        fill={mode === "drawing" ? "#ce796b" : "#000000"}
                                        strokeWidth={2}
                                        onClick={() => setMode(mode === "drawing" ? "text" : "drawing")} />
                        </div>
                    </div>
                    <div className="flex flex-col flex-1  rounded-2xl p-3">
                        <EntryForm mode={mode} />
                    </div>
                    <div className="flex flex-row justify-between text-rose tracking-wider font-flower">
                        <div className="flex flex-row items-center">
                            <IconButton svgIconPath={SVG_PATHS.reverseIcon}
                                        fill={"#000000"}
                                        strokeWidth={2}
                                        onClick={() => drawUndo()} />
                            <IconButton svgIconPath={SVG_PATHS.forwardIcon}
                                        fill={"#000000"}
                                        strokeWidth={2}
                                        onClick={() => drawRedo()} />
                        </div>
                        <div className="flex flex-row items-center gap-1">
                            { /** <motion.div
                                className="h-[66%] aspect-square border-2 rounded-[50%] border-t-rose border-l-rose border-b-rose"
                                animate={{ transform: "rotate(360deg)" }}
                                transition={{
                                    duration: 0.8,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                            /> **/}
                        </div>
                    </div>
                </EntryContext>
            </div>
        </div>
    )
}