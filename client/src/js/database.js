import { openDB } from "idb";

const initdb = async () =>
  // creates 'jate' db using version 1
  openDB("jate", 1, {
    // logic to add db schema if it doesn't already exist
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      // Creates new object to store data, key name 'id', auto-increments
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.error("putDb not implemented");
  console.log("PUT to the database");
  const jateDB = await openDB("jate", 1);
  const tx = jateDB.transaction("jate", "readwrite");
  const store = tx.objectStore("jate");
  const request = store.put({ id: 1, value: content });
  const result = await request;
  console.log("🚀 - data saved to the database", result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.error("getDb not implemented");
  console.log("GET all from the database");
  const jateDb = await openDB("jate", 1);
  const tx = jateDb.transaction("jate", "readonly");
  const store = tx.objectStore("jate");
  const request = store.getAll();
  const result = await request;
  result
    ? console.log("Data retrieved from database")
    : console.log("Data not found in the database.");

  return result?.value;
};

// todo: add comments to these methods

initdb();
