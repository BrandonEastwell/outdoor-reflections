import {AuthProvider} from "@/lib/context/authContext";
import Entries from "@/components/Entries";

export default async function EntriesPage() {
    return (
        <div>
            <AuthProvider>
                <Entries />
            </AuthProvider>
        </div>
    )
}
