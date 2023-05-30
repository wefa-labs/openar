import { IDBPDatabase, openDB } from "idb";

export let db: IDBPDatabase<unknown> | undefined;
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
    db = await openDB("wefa", 1, {
      upgrade(db) {
        db.createObjectStore("keyval");
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
