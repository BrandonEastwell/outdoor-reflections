"use client"

import {useContext} from "react";
import {EntryContext} from "@/utils/entryContext";
import {motion, Reorder, useDragControls} from "motion/react";

interface TextAreaProps {
    focus: boolean;
    container: React.RefObject<HTMLDivElement | null>;
}

export default function TextArea({ focus, container }: TextAreaProps) {
    const {entry, setEntry} = useContext(EntryContext)
    let holdInterval: NodeJS.Timeout | null = null

    const handleReorder = (newContent: string[]) => {
        setEntry({...entry, content: newContent})
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
            setEntry({...entry, content: [...entry.content, ""]});
        }
    }

    const handlePointerDown = (event: React.PointerEvent<HTMLTextAreaElement>) => {
        holdInterval = setInterval(() => {
            controls.start(event)
        }, 100)
    }

    const handlePointerUp = (event: React.PointerEvent<HTMLTextAreaElement>) => {
        holdInterval ? clearInterval(holdInterval) : null
    }

    const handleChange = (index: number, value: string) => {
        setEntry({
            ...entry,
            content: entry.content.map((line, lineIndex) => (lineIndex === index ? value : line)),
        });
    };

    const controls = useDragControls();

    return (
            <Reorder.Group
                values={entry.content}
                axis="y"
                onReorder={handleReorder}
                className="absolute inset-0 h-full w-full"
            >
                { entry.content.map((text, index) => (
                    <Reorder.Item key={index}
                                  value={text}
                                  whileHover={{ borderWidth: 1 }}
                                  dragControls={controls}
                                  dragConstraints={container}
                                  className="w-full h-auto border-rose/20 rounded-md px-2 mb-1 hover:cursor-pointer">
                        <motion.textarea
                            name="content"
                            className={
                                "resize-none field-sizing-content bg-transparent font-mono outline-none outline-0 text-black placeholder-black " +
                                "text-xs leading-6.75 h-auto overflow-hidden  " +
                                (focus ? "" : " pointer-events-none")
                            }
                            value={text}
                            onPointerUp={handlePointerUp}
                            onPointerDown={handlePointerDown}
                            onKeyDown={handleKeyDown}
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
