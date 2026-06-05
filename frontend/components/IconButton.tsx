import DrawIcon from "@/components/DrawIcon";
import {EditMode} from "@/types/customTypes";

export default function IconButton({mode, setMode, SVGPaths, fill, iconSize }: {
    mode: EditMode,
    setMode: (mode: EditMode) => void,
    SVGPaths: string[],
    fill?: string
    iconSize?: number
}) {
    return (
        <button type="button" onClick={() => setMode(mode === "drawing" ? "text" : "drawing")} className="mr-2 cursor-pointer">
            <DrawIcon svgPaths={SVGPaths} fill={fill} iconSize={iconSize}></DrawIcon>
        </button>
    )
}