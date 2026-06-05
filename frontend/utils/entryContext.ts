import {createContext, Dispatch, SetStateAction} from "react";
import {EntryDraft} from "@/types/entryTypes";

type EntryContextValue = {
    entry: EntryDraft;
    setEntry: Dispatch<SetStateAction<EntryDraft>>;
};

export const EntryContext = createContext<EntryContextValue>({entry: {title: null, content: "", date: new Date(), drawingPaths: []}, setEntry: () => {}});
