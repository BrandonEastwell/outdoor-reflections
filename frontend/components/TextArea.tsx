"use client"

import {useContext} from "react";
import {EntryContext} from "@/utils/entryContext";
import { Reorder } from "motion/react";

interface TextAreaProps {
    focus: boolean;
}

export default function TextArea({ focus }: TextAreaProps) {
    const {entry, setEntry} = useContext(EntryContext)

    const handleReorder = (newContent: string[]) => {
        setEntry({...entry, content: newContent})
    }

    const handleChange = (index: number, value: string) => {
        setEntry({
            ...entry,
            content: entry.content.map((line, lineIndex) => (lineIndex === index ? value : line)),
        });
    };

    return (
            <Reorder.Group
                values={entry.content}
                axis="y"
                onReorder={handleReorder}
                className="absolute inset-0 h-full w-full"
            >
                { entry.content.map((text, index) => (
                    <Reorder.Item key={index} value={text}>
                        <textarea
                            name="content"
                            className={
                                "block z-20 w-full resize-none border-none bg-transparent font-mono outline-none outline-0 text-black placeholder-black " +
                                "text-[16px] leading-[27px] min-h-[75px] " +
                                (focus ? "" : " pointer-events-none")
                            }
                            value={text}
                            onChange={(e) => handleChange(index, e.target.value)}
                            placeholder="How was your day?"
                            disabled={!focus}
                            spellCheck={false}
                        />
                    </Reorder.Item>
                ))}
            </Reorder.Group>
    );
}
