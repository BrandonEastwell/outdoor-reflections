import DrawIcon from "@/components/DrawIcon";
import {EditMode} from "@/types/customTypes";

export default function IconButton({mode, setMode, SVGPaths, fill}: {
    mode: EditMode,
    setMode: (mode: EditMode) => void,
    SVGPaths: string[],
    fill?: string
}) {
    return (
        <button type="button" onClick={() => setMode(mode === "drawing" ? "text" : "drawing")} className="mr-2 cursor-pointer">
            <DrawIcon svgPaths={SVGPaths} fill={mode === "drawing" ? "#ce796b" : "#000000"}></DrawIcon>
        </button>
    )
}