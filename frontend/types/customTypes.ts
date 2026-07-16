export type EditMode = 'drawing' | 'text';
export type Point = [number, number];

export interface ButtonProps {
    fill?: string,
    iconSize?: number,
    strokeWidth?: number,
    svgIconPath: string[],
    onClick: () => void,
}

export interface IconButtonType {
    drawButton: ButtonProps,
    textButton: ButtonProps,
}

export type TextBox = {
    id: string;
    text: string;
};