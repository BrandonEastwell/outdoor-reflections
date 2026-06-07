import {Entry} from "@/types/entryTypes";

type DBNames = 'reflections'

export default class Database {
    constructor() {}

    openDB(name: DBNames): Promise<IDBDatabase> {
        return new Promise((resolve, reject) => {
            const db = indexedDB.open(`${name}-db`, 1);
            db.onupgradeneeded = () => {
                db.result.createObjectStore(name, { keyPath: "id" });
                resolve(db.result)
            };

            db.onerror = () => {
                reject(db.error);
            };

            db.onsuccess = () => {
                resolve(db.result)
            }
        })
    }

    async getFromDB(id: string, name: DBNames): Promise<Entry | undefined> {
        const db = await this.openDB(name);

        return new Promise((resolve, reject) => {
            const transaction = db.transaction(name, "readonly");
            const store = transaction.objectStore(name);

            if (!id) return reject(`[${name}DB] No key provided`);
            const request = store.get(id);

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async saveToDB(obj: any, name: DBNames) {
        try {
            const db = await this.openDB(name);
            const transaction = db.transaction(name, "readwrite");
            const store = transaction.objectStore(name);
            const res = store.put(obj);
            return res.onsuccess = () => {
                console.log(`Entry id=${res.result} saved to offline database`);
                return res.result
            }
        } catch (error) {
            console.error("Error saving entry to offline database:", error);
        }
    }
}