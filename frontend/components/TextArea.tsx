"use client"

import {useContext, useState, type KeyboardEvent} from "react";
import {EntryContext} from "@/utils/entryContext";
import {Reorder, useDragControls} from "motion/react";
import {normalizeEntryContent} from "@/utils/entryUtils";

interface TextAreaProps {
    focus: boolean;
}

type TextBlock = {
    id: string;
    text: string;
};

const createBlock = (text: string): TextBlock => ({
    id: crypto.randomUUID(),
    text,
});

const reorderBlocks = (blocks: TextBlock[], orderedIds: string[]) =>
    orderedIds
        .map((id) => blocks.find((block) => block.id === id))
        .filter((block): block is TextBlock => Boolean(block));

export default function TextArea({ focus }: TextAreaProps) {
    const {entry, setEntry} = useContext(EntryContext);
    const dragControls = useDragControls();
    const [blocks, setBlocks] = useState<TextBlock[]>(
        normalizeEntryContent(entry.content).map(createBlock)
    );

    const commitBlocks = (nextBlocks: TextBlock[]) => {
        setBlocks(nextBlocks);
        setEntry((prevEntry) => ({
            ...prevEntry,
            content: nextBlocks.map((block) => block.text),
        }));
    };

    const handleReorder = (orderedIds: string[]) => {
        commitBlocks(reorderBlocks(blocks, orderedIds));
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            commitBlocks([...blocks, createBlock("")]);
        }
    };

    const handleChange = (id: string, value: string) => {
        commitBlocks(
            blocks.map((block) =>
                block.id === id ? {...block, text: value.trimEnd()} : block
            )
        );
    };

    return (
        <Reorder.Group
            values={blocks.map((block) => block.id)}
            axis="y"
            onReorder={handleReorder}
            className="absolute inset-0 h-full w-full"
        >
            {blocks.map((block) => (
                <Reorder.Item
                    key={block.id}
                    value={block.id}
                    drag="y"
                    dragListener={false}
                    dragControls={dragControls}
                    className="w-full"
                >
                    <div className="flex items-start gap-2">
                        <button
                            type="button"
                            aria-label="Drag text block"
                            className="mt-2 h-4 w-4 shrink-0 rounded-full border border-rose/30 bg-transparent cursor-grab active:cursor-grabbing"
                            onPointerDown={(event) => {
                                event.preventDefault();
                                dragControls.start(event, {snapToCursor: true});
                            }}
                            tabIndex={-1}
                        />
                        <textarea
                            name="content"
                            className={
                                "block w-full resize-none rounded-md border-none bg-transparent px-2 font-mono text-black outline-none placeholder-black " +
                                "text-[16px] leading-[27px] min-h-[75px] overflow-hidden " +
                                (focus ? "" : " pointer-events-none")
                            }
                            value={block.text}
                            onKeyDown={handleKeyDown}
                            onChange={(e) => handleChange(block.id, e.target.value)}
                            placeholder="How was your day?"
                            disabled={!focus}
                            spellCheck={false}
                            style={{padding: 0, margin: 0}}
                        />
                    </div>
                </Reorder.Item>
            ))}
        </Reorder.Group>
    );
}
