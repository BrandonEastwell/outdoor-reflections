"use client"
import { useState } from "react";
import DrawingArea from "./DrawingArea";
import TextArea from "./TextArea";

export default function EntryForm() {
    const [content, setContent] = useState<undefined | string>();

    const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(content);
    };

    return (
        <form className="relative"
            onSubmit={handleSave} id="journal-entry-form">
            <DrawingArea />
            <TextArea value={content} onChange={setContent} />
        </form>
    );
}