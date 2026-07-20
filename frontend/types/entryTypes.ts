export type DrawPath = {
    path: string;
    color: string;
};

export type SyncStatus = "synced" | "pending" | "failed";

export type Entry = {
    id: string;
    title: string;
    content: string[];
    date: string;
    drawings: DrawPath[];
    sync_status: SyncStatus;
    last_synced_at: string | null;
    created_at: string;
    updated_at: string;
}