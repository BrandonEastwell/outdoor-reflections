"use client"
import { useRef, useState } from "react";
import { getStroke } from "perfect-freehand";
import {getSvgPathFromStroke} from "@/utils/getSvgPathFromStroke";

export default function DrawingArea() {
    const [isDrawing, setIsDrawing] = useState<boolean>(false);
    const drawAreaRef = useRef<HTMLDivElement | null>(null);
    const [points, setPoints] = useState<(number[])[]>([]);

    const relativeCoordinates = (event: React.MouseEvent) => {
        const boundingRect = drawAreaRef.current?.getBoundingClientRect();
        if (!boundingRect) return;
        const x = event.clientX - boundingRect.left;
        const y = event.clientY - boundingRect.top;
        return [x, y];
    };

    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.button !== 0) return;
        const point = relativeCoordinates(event);
        point && setPoints((prevLines) => [...prevLines, point]);
        setIsDrawing(true);
    };

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        if (!isDrawing) return;

        const point = relativeCoordinates(event);
        point && setPoints((prevLines) => [...prevLines, point]);
    };

    const stroke = getStroke(points, {
        size: 5,
        streamline: 0.5
    });

    const pathData = getSvgPathFromStroke(stroke);

    return (
        <div
            ref={drawAreaRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={() => setIsDrawing(false)}
        >
            <svg>
                <path d={pathData} />
            </svg>
        </div>
    );
}