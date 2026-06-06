export type DrawPath = {
    path: string;
    color: string;
};

type EntrySyncStatus = "synced" | "pending" | "failed";

export type EntryDraft = {
    title: string;
    content: string;
    date: Date;
    drawPaths: DrawPath[];
}

export type Entry = {
    id?: number;
    title: string;
    content: string;
    date: Date;
    drawings: DrawPath[];
    sync_status: EntrySyncStatus;
    last_synced_at: Date | null;
    created_at: Date;
    updated_at: Date;
}