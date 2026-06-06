"use client"
import EntryForm from "@/components/EntryForm";
import {useState} from "react";
import {EditMode} from "@/types/customTypes";
import {SVG_PATHS} from "@/constants/svgPaths";
import IconButton from "@/components/IconButton";
import {DrawPath, EntryDraft} from "@/types/entryTypes";
import {EntryContext} from "@/utils/entryContext";
import openReflectionEntriesDB from "@/lib/db";

export default function EntryEditor() {
    const [mode, setMode] = useState<EditMode>("text");
    const [drawColor, setDrawColor] = useState<string>('#000000')
    const [drawHistory, setDrawHistory] = useState<DrawPath[]>([]);
    const [entry, setEntry] = useState<EntryDraft>({
        title: "",
        content: "",
        date: new Date(),
        drawPaths: []
    });

    const onSaveEntry = () => {
        saveEntryToOfflineDB();
    }

    const saveEntryToOfflineDB = () => {
        try {
            const db = openReflectionEntriesDB();
            return db.onsuccess = () => {
                const transaction = db.result.transaction("entries", "readwrite");
                const store = transaction.objectStore("entries");
                const { result } = store.put(entry);
                transaction.oncomplete = () => {
                    console.log(`Entry id=${result} saved to offline database`);
                }
                return result
            }
        } catch (error) {
            console.error("Error saving entry to offline database:", error);
        }
    }

    const handleUndo = () => {
        if (entry.drawPaths.length === 0) return;
        setEntry(prevEntry => ({...prevEntry, drawPaths: prevEntry.drawPaths.slice(0, -1)}));
        setDrawHistory(prevHistory => [...prevHistory, entry.drawPaths[entry.drawPaths.length - 1]]);
    }

    const handleRedo = () => {
        if (drawHistory.length === 0) return;
        setEntry(prevEntry => ({...prevEntry, drawPaths: [...prevEntry.drawPaths, drawHistory[drawHistory.length - 1]]}));
        setDrawHistory(prevHistory => prevHistory.slice(0, -1));
    }

    // initial save to offline db
    const id = saveEntryToOfflineDB()

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
                                    onClick={() => onSaveEntry()} />
                    </div>
                </div>
            </EntryContext>
        </div>
    )
}