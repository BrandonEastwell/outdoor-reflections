import {createContext, Dispatch, SetStateAction} from "react";
import {DrawPath, Entry} from "@/types/entryTypes";

type EntryContextValue = {
    entry: Entry;
    setEntry: Dispatch<SetStateAction<Entry>>;
    drawHistory: DrawPath[];
    drawColor: string;
    setDrawColor: Dispatch<SetStateAction<string>>;
};

export const EntryContext = createContext<EntryContextValue>({
    entry: {
        title: "",
        content: "",
        date: "",
        drawings: [],
        sync_status: "pending",
        last_synced_at: null,
        created_at: "",
        updated_at: "",
        id: ""
    },
    setEntry: () => {},
    drawHistory: [],
    drawColor: "#000000",
    setDrawColor: () => {},
});
