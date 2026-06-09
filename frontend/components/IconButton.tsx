"use client"
import DrawIcon from "@/components/DrawIcon";
import {ButtonProps} from "@/types/customTypes";

export default function IconButton(props: ButtonProps) {
    const { svgIconPath, fill, strokeWidth, iconSize } = props;
    return (
        <button type="button" onClick={props.onClick} className="cursor-pointer">
            <DrawIcon svgPaths={svgIconPath} fill={fill} strokeWidth={strokeWidth} iconSize={iconSize}></DrawIcon>
        </button>
    )
}