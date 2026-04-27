"use client"
import {useState} from "react";

export default function EntryForm() {
    const [content, setContent] = useState<undefined | string>()

    const handleSave = () => {

    }

    return (
        <form onSubmit={handleSave}>
                        <textarea name="content"
                                  className="min-h-[300px] font-mono w-full text-sm text-black placeholder-black"
                                  value={content}
                                  placeholder="How was your day?"
                                  onChange={(e) => setContent(e.target.value)}>
                        </textarea>
        </form>
    )
}