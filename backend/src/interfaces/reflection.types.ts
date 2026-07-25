export type DrawPath = {
    path: string;
    color: string;
};

type SyncStatus = "synced" | "pending" | "failed";

export type Entry = {
    id: string;
    title: string;
    content: string[];
    date: string;
    drawing_paths: DrawPath[];
    sync_status: SyncStatus;
    last_synced_at: string | null;
    created_at: string;
    updated_at: string;
}

export type EntryDTO = {
    id: string;
    user_id: number;
    title: string;
    content: string[];
    date: string;
    drawing_paths: DrawPath[];
    sync_status: SyncStatus;
    last_synced_at: string | null;
    created_at: string;
    updated_at: string;
}