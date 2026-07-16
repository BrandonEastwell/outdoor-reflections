"use client"

import {useContext, useEffect, useRef, useState} from "react";
import {EntryContext} from "@/utils/entryContext";
import {motion, Reorder, useDragControls} from "motion/react";

interface TextAreaProps {
    focus: boolean;
    container: React.RefObject<HTMLDivElement | null>;
}

type TextBox = {
    id: string;
    text: string;
};

const createLine = (text = ""): TextBox => ({
    id: crypto.randomUUID(),
    text,
});

export default function TextArea({ focus, container }: TextAreaProps) {
    const {entry, setEntry} = useContext(EntryContext)
    const [content, setContent] = useState<TextBox[]>(
        () => entry.content.map((text) => createLine(text))
    );
    const holdTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const controls = useDragControls();

    useEffect(() => {
        return () => {
            if (holdTimeout.current) {
                clearTimeout(holdTimeout.current);
            }
        };
    }, []);

    const updateContent = (nextContent: TextBox[]) => {
        setContent(nextContent);
        setEntry((prevEntry) => ({
            ...prevEntry,
            content: nextContent.map((line) => line.text),
        }));
    };

    const handleReorder = (newContent: TextBox[]) => {
        updateContent(newContent);
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
            const nextContent = [...content, createLine("")];
            updateContent(nextContent);
        }
    }

    const handlePointerDown = (event: React.PointerEvent<HTMLTextAreaElement>) => {
        if (holdTimeout.current) {
            clearTimeout(holdTimeout.current);
        }

        event.persist?.();
        holdTimeout.current = setTimeout(() => {
            controls.start(event);
        }, 150);
    }

    const handlePointerUp = () => {
        if (holdTimeout.current) {
            clearTimeout(holdTimeout.current);
            holdTimeout.current = null;
        }
    }

    const handleChange = (id: string, value: string) => {

        const nextContent = content.map((line) =>
            line.id === id ? {...line, text: value} : line
        );
        setContent(nextContent);
        setEntry((prevEntry) => ({
            ...prevEntry,
            content: nextContent.map((line) => line.text),
        }));
    };

    return (
            <Reorder.Group
                values={content}
                axis="y"
                onReorder={handleReorder}
                className="absolute inset-0 h-full w-full"
            >
                {content.map((line) => (
                    <Reorder.Item key={line.id}
                                  value={line}
                                  whileHover={{ borderWidth: 1 }}
                                  dragControls={controls}
                                  dragConstraints={container}
                                  className="w-full h-auto border-rose/20 bg-rose rounded-md px-2 mb-1 hover:cursor-pointer">
                        <motion.textarea
                            name="content"
                            className={
                                "resize-none field-sizing-content bg-transparent font-mono outline-none outline-0 text-black placeholder-black " +
                                "text-xs leading-6.75 h-auto overflow-hidden  " +
                                (focus ? "" : " pointer-events-none")
                            }
                            value={line.text}
                            onPointerUp={handlePointerUp}
                            onPointerDown={handlePointerDown}
                            onKeyDown={handleKeyDown}
                            onChange={(e) => handleChange(line.id, e.target.value)}
                            placeholder="How was your day?"
                            disabled={!focus}
                            spellCheck={false}
                        />
                    </Reorder.Item>
                ))}
            </Reorder.Group>
    );
}
