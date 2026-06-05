export type EntryDraft = {
    title: string;
    content: string;
    date: Date;
    drawingPaths: string[];
    created_at: Date;
}

export type Entry = {
    id: number;
    title: string;
    content: string;
    date: Date;
    drawing: string[];
    created_at: string;
}