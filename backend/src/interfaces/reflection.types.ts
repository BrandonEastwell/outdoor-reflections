export type DrawPath = {
    path: string;
    color: string;
};

type EntrySyncStatus = "synced" | "pending" | "failed";

export type Reflection = {
    id: string;
    user_id: number;
    title: string;
    content: string;
    date: Date;
    drawing_paths: DrawPath[];
    last_synced_at: Date | null;
    created_at: Date;
    updated_at: Date;
}

export type ReflectionEntryDTO = {
    id: string;
    title: string;
    content: string;
    date: Date;
    drawing_paths: DrawPath[];
    sync_status: EntrySyncStatus;
    last_synced_at: Date | null;
    created_at: Date;
    updated_at: Date;
}