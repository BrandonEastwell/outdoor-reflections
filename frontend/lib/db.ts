import {Entry} from "@/types/entryTypes";

type DBNames = 'reflections'

export default class db {
    constructor() {}

    openDB = (name: DBNames) => {
        const db = indexedDB.open(`${name}-db`, 1);
        db.onupgradeneeded = () => {
            db.result.createObjectStore(name, { keyPath: "id", autoIncrement: true });
        };

        return db;
    }

    saveEntryToOfflineDB = (entry: Entry, name: DBNames) => {
        try {
            const db = this.openDB(name);
            return db.onsuccess = () => {
                const transaction = db.result.transaction(name, "readwrite");
                const store = transaction.objectStore(name);
                const { result } = store.put(entry);
                transaction.oncomplete = () => {
                    console.log(`Entry id=${result} saved to offline database`);
                }
                return result
            }
        } catch (error) {
            console.error("Error saving entry to offline database:", error);
        }
    }

    getNextEntryId = (name: DBNames) => {
        const db = this.openDB(name);
        return db.onsuccess = () => {
            const transaction = db.result.transaction(name, "readonly");
            const store = transaction.objectStore(name);
            const request = store.count();
            request.onsuccess = () => {
                return request.result + 1;
            };
        };
    }
}