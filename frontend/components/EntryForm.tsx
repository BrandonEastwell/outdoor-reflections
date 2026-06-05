"use client"
import { useState } from "react";
import DrawingArea from "./DrawingArea";
import TextArea from "./TextArea";
import {EditMode} from "@/types/customTypes";

export default function EntryForm({ mode }: { mode: EditMode }) {
    const [content, setContent] = useState<undefined | string>();

    const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(content);
    };

    return (
        <form className="relative"
            onSubmit={handleSave} id="journal-entry-form">
            <DrawingArea focus={mode === "drawing"} />
            <TextArea value={content} onChange={setContent} focus={mode === "text"} />
        </form>
    );
}