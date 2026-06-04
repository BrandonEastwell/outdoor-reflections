"use client"
import {useRef, useState} from "react";

export default function EntryForm() {
    const [content, setContent] = useState<undefined | string>()
    const [lines, setLines] = useState<(number[])[]>([])
    const drawAreaRef = useRef<HTMLFormElement | null>(null)

    const handleSave = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        console.log(formData.get("content") as string)
    }

    const relativeCoordinates = (event) => {
        const boundingRect = drawAreaRef.current?.getBoundingClientRect()
        if (!boundingRect) return;
        const x = event.clientX - boundingRect.left;
        const y = event.clientY - boundingRect.top;
        return [ x , y ]
    }

    const handleMouseDown = (event: React.MouseEvent<HTMLFormElement>) => {
        if (event.button !== 0) return
        const point = relativeCoordinates(event)
        point && setLines((prevLines) => [...prevLines, point])
        console.log(lines)
        console.log(point)
    }

    return (
        <form ref={drawAreaRef} onMouseDown={handleMouseDown} id="journal-entry-form"
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