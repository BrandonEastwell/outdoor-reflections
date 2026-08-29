import {API_URL} from "@/constants/apiUrl";
import {readJsonError} from "@/lib/api/readResponse";

export const getUserEntries = async () => {
    const res = await fetch(`${API_URL}/reflections`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include"
    });

    if (!res.ok) throw new Error(await readJsonError(res, "Error fetching entries"));
    return (await res.json());
}