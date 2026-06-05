"use client"
import DrawIcon from "@/components/DrawIcon";
import {ButtonProps} from "@/types/customTypes";

export default function IconButton(props: ButtonProps) {
    const { svgIconPath, fill, iconSize } = props;
    return (
        <button type="button" onClick={props.onClick} className="mr-2 cursor-pointer">
            <DrawIcon svgPaths={svgIconPath} fill={fill} iconSize={iconSize}></DrawIcon>
        </button>
    )
}