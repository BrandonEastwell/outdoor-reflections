import Database from "@/lib/database";
import {Entry} from "@/types/entryTypes";

const db = new Database();

export default async function EntriesPage() {
    const entries: Entry[] | undefined = await db.getAll('reflections');

    return (
        <div>
            {
                entries && entries.map(
                    entry =>
                        <div key={entry.id}>{entry.title}</div>
                )
            }
        </div>
    )
}
