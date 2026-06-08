"use client"
import { svgPathProperties } from "svg-path-properties";
import {getStroke} from "perfect-freehand";
import {getFlatSvgPathFromStroke, getSvgPathFromStroke} from "@/utils/getSvgPathFromStroke";
import {lineToPoints} from "@/utils/svgPoints";
import {Point} from "@/types/customTypes";

function createPointsFromSVGPath(path: string) {
    const points: Point[] = [];

    // Check if path starts with 'M' for a path, else it's a line'
    if (path[0] === "M") {
        const props = new svgPathProperties(path);
        const length = props.getTotalLength();

        for (let i = 0; i <= length; i += length / 100) {
            const point = props.getPointAtLength(i);
            points.push([point.x, point.y]);
        }
    } else {
        const pointsFromLine = lineToPoints(path);
        points.push(...pointsFromLine);
    }

    return points
}

export default function DrawIcon({ svgPaths, fill, iconSize = 2 } : { svgPaths: string[], fill?: string, iconSize?: number }) {
    const paths: string[] = [];

    for (const path of svgPaths) {
        const points: Point[] = [];
        points.push(...createPointsFromSVGPath(path));

        const stroke = getStroke(points, {
            size: iconSize,
            thinning: 0.5,
            streamline: 0.5,
            smoothing: 0.5,
            easing: (t) => t,
            simulatePressure: true,
            last: true,
            start: {
                cap: false,
                taper: 1,
                easing: (t) => t,
            },
            end: {
                cap: true,
                taper: 0,
                easing: (t) => t,
            },
        });

        const pathFromStroke = getSvgPathFromStroke(stroke)
        paths.push(pathFromStroke);
    }

    return (
        <svg height="24" width="24" viewBox="0 0 24 24" fill={fill} xmlns="http://www.w3.org/2000/svg">
            { paths.map((path, index) => <path key={index} d={path}/>) }
        </svg>
    )
}