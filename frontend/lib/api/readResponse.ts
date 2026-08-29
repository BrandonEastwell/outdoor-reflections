export async function readJsonError(res: Response, fallback: string) {
    try {
        const body = await res.json();
        return body?.message ?? fallback;
    } catch {
        return fallback;
    }
}