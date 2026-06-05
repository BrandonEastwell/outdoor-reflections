"use client"
import EntryForm from "@/components/EntryForm";
import {useState} from "react";
import {EditMode} from "@/types/customTypes";
import DrawIcon from "@/components/DrawIcon";
import { SVG_PATHS } from "@/constants/svgPaths";

export default function EntryArea() {
    const [mode, setMode] = useState<EditMode>("text");

    return (
        <div className="flex flex-col grow w-full gap-2 px-3 pb-3 pt-2 bg-white rounded-2xl mt-4">
            <div className="flex flex-row justify-between text-rose tracking-wider font-flower">
                <div>
                    <span className="">saturday, 27.04</span>
                </div>
                <div className="flex flex-row items-center gap-2">
                    <DrawIcon svgPaths={SVG_PATHS.drawIcon}></DrawIcon>
                    <button type="button" onClick={() => setMode("drawing")} className="mr-2">Draw</button>
                    <button type="button" onClick={() => setMode("text")}>Text</button>
                </div>
            </div>
            <div className="flex flex-col flex-1 bg-desert/40 rounded-2xl p-3">
                <EntryForm mode={mode} />
            </div>
        </div>
    )
}