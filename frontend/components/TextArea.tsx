"use client"

import {useContext, useMemo} from "react";
import {EntryContext} from "@/utils/entryContext";
import { Reorder } from "motion/react";
import {normalizeEntryContent} from "@/utils/entryUtils";

interface TextAreaProps {
    focus: boolean;
}

export default function TextArea({ focus }: TextAreaProps) {
    const {entry, setEntry, editorScale} = useContext(EntryContext)
    const content = normalizeEntryContent(entry.content);

    const handleReorder = (newContent: string[]) => {
        setEntry({...entry, content: newContent})
    }

    const textStyle = useMemo(
        () => ({
            fontSize: `${16 * editorScale}px`,
            lineHeight: `${27 * editorScale}px`,
            minHeight: `${75 * editorScale}px`,
        }),
        [editorScale]
    );

    const handleChange = (index: number, value: string) => {
        setEntry({
            ...entry,
            content: content.map((line, lineIndex) => (lineIndex === index ? value : line)),
        });
    };

    return (
            <Reorder.Group values={content} axis="y" onReorder={handleReorder} className="h-full w-full">
                { content.map((text, index) => (
                    <Reorder.Item key={`${index}-${text}`} value={text}>
                        <textarea
                            name="content"
                            className={"relative z-20 w-full resize-none border-none bg-transparent font-mono outline-none outline-0 text-black placeholder-black" + (focus ? "" : " pointer-events-none")}
                            style={textStyle}
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
