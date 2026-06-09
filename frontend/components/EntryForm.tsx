"use client"
import DrawingArea from "./DrawingArea";
import TextArea from "./TextArea";
import {EditMode} from "@/types/customTypes";

export default function EntryForm({ mode }: { mode: EditMode }) {

    return (
        <div className="relative w-full h-full overflow-hidden"
            onSubmit={() => {}} id="journal-entry-form">
            <DrawingArea focus={mode === "drawing"} />
            <TextArea focus={mode === "text"} />
        </div>
    );
}