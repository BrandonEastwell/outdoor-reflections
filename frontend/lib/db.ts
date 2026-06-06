
const openReflectionEntriesDB = () => {
    const db = indexedDB.open("reflections-db", 1);
    db.onupgradeneeded = () => {
        db.result.createObjectStore("reflections", { keyPath: "id" });
    };

    return db;
}

export default openReflectionEntriesDB;