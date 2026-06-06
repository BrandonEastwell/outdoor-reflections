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
    id: number;
    title: string;
    content: string;
    date: Date;
    drawing: DrawPath[];
    sync_status: EntrySyncStatus;
    last_synced_at: Date;
    created_at: Date;
    updated_at: Date;
}