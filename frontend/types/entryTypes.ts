export type DrawPath = {
    path: string;
    color: string;
};

type EntrySyncStatus = "synced" | "pending" | "failed";

export type Entry = {
    id: string;
    title: string;
    content: string[];
    date: string;
    drawings: DrawPath[];
    sync_status: EntrySyncStatus;
    last_synced_at: string | null;
    created_at: string;
    updated_at: string;
}