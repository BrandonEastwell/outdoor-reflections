import Database from "@/lib/database";
import {Entry} from "@/types/entryTypes";
import {AuthProvider} from "@/lib/context/authContext";

const db = new Database();

export default async function EntriesPage({ children } : { children: React.ReactNode}) {
    const entries: Entry[] | undefined = await db.getAll('reflections');

    return (
        <div>
            <AuthProvider>
                { children }
            </AuthProvider>
        </div>
    )
}
