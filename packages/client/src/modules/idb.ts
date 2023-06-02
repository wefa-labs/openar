import { DBSchema, IDBPDatabase, openDB } from "idb";

interface WEFADB extends DBSchema {
  plants: {
    key: string;
    value: Plant;
  };
  creatures: {
    key: string;
    value: Creature;
  };
}

export let db: IDBPDatabase<WEFADB> | undefined;
export let status: "idle" | "loading" | "error" | "success" = "idle";

export async function initDB() {
  if (db) return db;
  if (status === "loading") return;
  if (typeof window === "undefined" && !("indexedDB" in window)) {
    console.log("This browser doesn't support IndexedDB.");
    status = "error";
    return;
  }

  status = "loading";

  try {
    db = await openDB<WEFADB>("wefa", 1, {
      upgrade(db) {
        db.createObjectStore("plants", {
          keyPath: "id",
        });
        db.createObjectStore("creatures", {
          keyPath: "id",
        });
      },
      blocking(currentVersion, blockedVersion, event) {
        console.log("blocking", currentVersion, blockedVersion, event);
      },
      blocked(currentVersion, blockedVersion, event) {
        console.log("blocked", currentVersion, blockedVersion, event);
      },
      terminated() {
        console.log("terminated");
      },
    });

    status = "success";
    console.log("Indexed DB initialized", db);
  } catch (error) {
    status = "error";
    console.log("Indexed DB failed to initialize", error);
  }

  return db;
}

export async function fetchPlants() {
  const db = await initDB();
  const transaction = db?.transaction("plants", "readonly");
  const store = transaction?.objectStore("plants");
  const data = await store?.getAll();
  // const index = store?.index("spaceId");
  // const range = IDBKeyRange.only(spaceId);
  // const cursor = index?.openCursor(range);

  if (!data) {
    console.log("no plants");
    return [];
  }

  return data;
}

export async function fetchCreatures() {
  const db = await initDB();
  const transaction = db?.transaction("creatures", "readonly");
  const store = transaction?.objectStore("creatures");
  const data = await store?.getAll();

  if (!data) {
    console.log("no creatures");
    return [];
  }

  return data;
}
