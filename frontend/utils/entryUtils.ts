import {Entry} from "@/types/entryTypes";

export function sortEntriesByLastUpdated(entries: Entry[])  {
    return entries.sort((a,b) => {
        return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    })
}