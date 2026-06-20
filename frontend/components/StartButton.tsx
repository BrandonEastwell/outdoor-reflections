"use client"
import {useRouter} from "next/navigation";
import {createEmptyEntry} from "@/utils/entryUtils";

export default function StartButton() {
    const router = useRouter();

    async function handleClick() {
        const emptyEntry = await createEmptyEntry();
        router.push(`/entry/${emptyEntry.id}`);
    }

    return (
        <button type="button" onClick={handleClick} className="flex h-12 w-full items-center justify-center gap-2
        rounded-lg px-5 font-mono text-background transition-colors bg-rose hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-39.5">
            lets start
        </button>
    )
}