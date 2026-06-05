import {Point} from "@/types/customTypes";

export function interpolatePoints(a: Point, b: Point) {
    const points: Point[] = [];

    const [x1, y1] = a;
    const [x2, y2] = b;
    const dx = x2 - x1;
    const dy = y2 - y1;
    const steps = 32;
    for (let i = 1; i <= steps; i++) {
        const t = i / steps;
        const x = x1 + t * dx;
        const y = y1 + t * dy;
        points.push([x, y]);
    }

    return points;
}

export function lineToPoints(line: string) {
    const nums = line.trim().split(" ").map(Number);
    const pointsPair: Point[] = [];
    const points: [number, number][] = [];

    for (let i = 0; i < nums.length; i += 2) {
        pointsPair.push([nums[i], nums[i + 1]]);
    }

    for (let i = 0; i < pointsPair.length - 1; i++) {
        const interpolatedPoints = interpolatePoints(pointsPair[i], pointsPair[i + 1])
        if (i > 0) interpolatedPoints.shift();
        points.push(...interpolatedPoints);
    }

    return points;
}