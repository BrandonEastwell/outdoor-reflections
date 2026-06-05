"use client"
import { svgPathProperties } from "svg-path-properties";
import {getStroke} from "perfect-freehand";
import {getFlatSvgPathFromStroke} from "@/utils/getSvgPathFromStroke";

export default function DrawIcon({ svgPaths, fill } : { svgPaths: string[], fill?: string }) {
    const paths: string[] = [];

    for (const path of svgPaths) {
        const props = new svgPathProperties(path);
        const length = props.getTotalLength();
        const points: [number, number][] = [];

        for (let i = 0; i <= length; i += length / 100) {
            const point = props.getPointAtLength(i);
            points.push([point.x, point.y]);
        }

        const stroke = getStroke(points, {
            size: 1,
            thinning: 0.5,
            streamline: 0.5,
            smoothing: 0,
            easing: (t) => t,
            simulatePressure: true,
            last: true,
            start: {
                cap: true,
                taper: 0,
                easing: (t) => t,
            },
            end: {
                cap: true,
                taper: 0,
                easing: (t) => t,
            },
        });

        const pathFromStroke = getFlatSvgPathFromStroke(stroke)
        paths.push(pathFromStroke);
    }

    return (
        <svg height="24" width="24" viewBox="0 0 24 24" fill={fill} xmlns="http://www.w3.org/2000/svg">
            { paths.map((path, index) => <path key={index} d={path}/>) }
        </svg>
    )
}