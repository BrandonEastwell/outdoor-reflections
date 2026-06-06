import {createContext, Dispatch, SetStateAction} from "react";
import {DrawPath, EntryDraft} from "@/types/entryTypes";

type EntryContextValue = {
    entry: EntryDraft;
    setEntry: Dispatch<SetStateAction<EntryDraft>>;
    drawHistory: DrawPath[];
    drawColor: string;
    setDrawColor: Dispatch<SetStateAction<string>>;
};

export const EntryContext = createContext<EntryContextValue>({
    entry: { title: "", content: "", date: new Date(), drawPaths: [] },
    setEntry: () => {},
    drawHistory: [],
    drawColor: "#000000",
    setDrawColor: () => {},
});
