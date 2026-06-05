import {Dexie, EntityTable} from 'dexie';
import {Entry} from "@/types/entryTypes";

export const db = new Dexie('Reflections') as Dexie & {
    reflections: EntityTable<Entry, "id">
};

db.version(1).stores({reflections: '++id, title, content, date, drawingPaths, created_at'});

export default db;