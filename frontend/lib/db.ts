import {Entry} from "@/types/entryTypes";

type DBNames = 'reflections'

export default class db {
    constructor() {}

    openDB = (name: DBNames) => {
        const db = indexedDB.open(`${name}-db`, 1);
        db.onupgradeneeded = () => {
            db.result.createObjectStore(name, { keyPath: "id" });
        };

        return db;
    }

    saveEntryToOfflineDB = (entry: Entry, name: DBNames) => {
        try {
            const db = this.openDB(name);
            return db.onsuccess = () => {
                const transaction = db.result.transaction(name, "readwrite");
                const store = transaction.objectStore(name);
                const res = store.put(entry);
                return res.onsuccess = () => {
                    console.log(`Entry id=${res.result} saved to offline database`);
                    return res.result
                }
            }
        } catch (error) {
            console.error("Error saving entry to offline database:", error);
        }
    }
}