"use client"

import {useContext} from "react";
import {EntryContext} from "@/utils/entryContext";

interface TextAreaProps {
    focus: boolean;
}

export default function TextArea({ focus }: TextAreaProps) {
    const {entry, setEntry} = useContext(EntryContext)
    return (
        <textarea
            name="content"
            className={"relative z-20 min-h-75 h-auto font-mono outline-none outline-0 border-none bg-transparent w-full text-sm/1.7 text-black placeholder-black" + (focus ? "" : " pointer-events-none")}
            value={entry.content}
            onChange={(e) => setEntry({ ...entry, content: e.target.value })}
            placeholder="How was your day?"
            disabled={!focus}
            spellCheck={false}
        />
    );
}
