"use client"
import {useEffect, useRef, useState} from "react";
import {EditMode} from "@/types/customTypes";
import {DrawPath, Entry} from "@/types/entryTypes";
import {EntryContext} from "@/utils/entryContext";
import Database from "../lib/database";
import DatePicker from "@/components/DatePicker";
import EditorToolbar from "@/components/ToolBar";
import DrawingArea from "@/components/DrawingArea";
import TextArea from "@/components/TextArea";

const db = new Database();

const isEntryBlank = (entry: Entry) => {
    return (
        entry.title.trim() === "" &&
        entry.content[0] === "" &&
        entry.drawings.length === 0
    );
};

export default function EntryEditor({ initEntry } : { initEntry: Entry }) {
    const [mode, setMode] = useState<EditMode>("text");
    const [drawColor, setDrawColor] = useState<string>('#000000')
    const [drawHistory, setDrawHistory] = useState<DrawPath[]>([]);
    const [entry, setEntry] = useState<Entry>(initEntry);
    const isFirstRender = useRef(true);
    const editorAreaRef = useRef<HTMLDivElement | null>(null);
    const [editorScale, setEditorScale] = useState(1);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return
        }

        if (isEntryBlank(entry)) return;

        const timeout = setTimeout(() => {
            const entryToSave = {...entry, updated_at: new Date().toISOString()};
            db.saveToDB(entryToSave, "reflections");
        }, 1000);
        return () => clearTimeout(timeout);
    }, [entry])

    useEffect(() => {
        const updateScale = () => {
            const container = editorAreaRef.current;
            if (!container) return;

            const rect = container.getBoundingClientRect();
            if (rect.width === 0 || rect.height === 0) return;

            const nextScale = rect.width / 320
            setEditorScale(Math.max(1, nextScale));
        };

        updateScale();

        const resizeObserver = new ResizeObserver(updateScale);
        if (editorAreaRef.current) {
            resizeObserver.observe(editorAreaRef.current);
        }

        return () => resizeObserver.disconnect();
    }, []);

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
            <div className="flex flex-col grow w-full max-w-2xl h-full gap-2 px-3 pb-3 pt-2 rounded-2xl mt-4">
                <EntryContext value={{entry, setEntry, drawHistory, drawColor, setDrawColor, editorScale}}>
                    <div className="flex flex-row justify-between text-rose tracking-wider font-flower">
                        <DatePicker />
                    </div>
                    <div ref={editorAreaRef} className={"relative w-full h-full w-min-[320px] overflow-hidden flex flex-col flex-1 rounded-2xl p-3" + `scale-${editorScale}`}>
                        <div style={{width: `${320 * editorScale}px`}} className="relative flex shrink-0 overflow-hidden">
                            <DrawingArea focus={mode === "drawing"} />
                            <TextArea focus={mode === "text"} />
                        </div>
                    </div>
                </EntryContext>
            </div>
            <EditorToolbar drawUndo={drawUndo} drawRedo={drawRedo} setMode={setMode} mode={mode} />
        </div>
    )
}
