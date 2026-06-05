import {createContext, Dispatch, SetStateAction} from "react";
import {EntryDraft} from "@/types/entryTypes";

type EntryContextValue = {
    entry: EntryDraft;
    setEntry: Dispatch<SetStateAction<EntryDraft>>;
    drawHistory: string[]
};

export const EntryContext = createContext<EntryContextValue>({
    entry: { title: "", content: "", date: new Date(), drawingPaths: [] },
    setEntry: () => {},
    drawHistory: []
});
