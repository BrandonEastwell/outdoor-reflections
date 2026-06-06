import {createContext, Dispatch, SetStateAction} from "react";
import {DrawPath, Entry} from "@/types/entryTypes";

type EntryContextValue = {
    entry: Partial<Entry>;
    setEntry: Dispatch<SetStateAction<Entry>>;
    drawHistory: DrawPath[];
    drawColor: string;
    setDrawColor: Dispatch<SetStateAction<string>>;
};

export const EntryContext = createContext<EntryContextValue>({
    entry: {
        title: "",
        content: "",
        date: new Date(),
        drawings: [],
        sync_status: "synced",
    },
    setEntry: () => {},
    drawHistory: [],
    drawColor: "#000000",
    setDrawColor: () => {},
});
