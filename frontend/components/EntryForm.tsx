"use client"
import {useState} from "react";

export default function EntryForm() {
    const [content, setContent] = useState<undefined | string>()

    const handleSave = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        console.log(formData.get("content") as string)
    }

    return (
        <form id="journal-entry-form"
            onSubmit={handleSave}>
                        <textarea name="content"
                                  className="min-h-[300px] h-auto font-mono w-full text-sm text-black placeholder-black"
                                  value={content}
                                  placeholder="How was your day?"
                                  onChange={(e) => setContent(e.target.value)}>
                        </textarea>
        </form>
    )
}