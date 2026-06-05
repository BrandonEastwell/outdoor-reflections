"use client"
import { useRef, useState } from "react";
import { getStroke } from "perfect-freehand";
import {getSvgPathFromStroke} from "@/utils/getSvgPathFromStroke";

export default function DrawingArea({ focus }: { focus: boolean }) {
    const [isDrawing, setIsDrawing] = useState<boolean>(false);
    const drawAreaRef = useRef<HTMLDivElement | null>(null);
    const [points, setPoints] = useState<(number[])[]>([]);
    const [paths, setPaths] = useState<string[]>([]);

    const relativeCoordinates = (event: React.PointerEvent) => {
        const boundingRect = drawAreaRef.current?.getBoundingClientRect();
        if (!boundingRect) return;
        const x = event.clientX - boundingRect.left;
        const y = event.clientY - boundingRect.top;
        const e = event.pressure;
        return [x, y, e];
    };

    const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
        if (event.button !== 0) return;
        const point = relativeCoordinates(event);
        if (point) {
            setPoints((prevLines) => [...prevLines, point]);
        }
        setIsDrawing(true);
    };

    const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
        if (!isDrawing) return;

        const point = relativeCoordinates(event);
        if (point) {
            setPoints((prevLines) => [...prevLines, point]);
        }
    };

    const handlePointerUp = (pathData: string) => {
        setPaths((prevPaths) => [...prevPaths, pathData]);
        setIsDrawing(false);
        setPoints([]);
    }

    const stroke = getStroke(points, {
        size: 5,
        thinning: 0.5,
        smoothing: 0.5,
        streamline: 0.5,
    });

    const pathData = getSvgPathFromStroke(stroke, true);

    return (
        <div
            ref={drawAreaRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={() => handlePointerUp(pathData)}
            className={"absolute inset-0 h-full w-full z-10" + (focus ? " pointer-events-auto cursor-crosshair" : " pointer-events-none")}
        >
            <svg width="100%" height="100%">
                {points && isDrawing && <path d={pathData} />}
                {paths.map((path, index) => (
                    <path key={index} d={path} />
                ))}
            </svg>
        </div>
    );
}
