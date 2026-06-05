"use client"
import DrawingArea from "./DrawingArea";
import TextArea from "./TextArea";
import {EditMode} from "@/types/customTypes";

export default function EntryForm({ mode }: { mode: EditMode }) {

    return (
        <form className="relative"
            onSubmit={() => {}} id="journal-entry-form">
            <DrawingArea focus={mode === "drawing"} />
            <TextArea focus={mode === "text"} />
        </form>
    );
}