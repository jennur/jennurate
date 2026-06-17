export function openIndexedDB({ dbName, storeName }) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName);
      }
    };

    request.onsuccess = (event) => {
      const db = event.target.result;
      resolve(db);
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
}

export async function saveToIndexedDB({ dbName, storeName, data, key }) {
  try {
    const db = await openIndexedDB({ dbName, storeName });

    return new Promise((resolve, reject) => {
      const transaction = db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.put(data, key);

      request.onsuccess = () => {
        console.log('Data saved to IndexedDB successfully');
        resolve();
      };

      request.onerror = (event) => {
        reject(event.target.error);
      };
    });
  } catch (error) {
    console.error('Error opening IndexedDB:', error);
    throw error;
  }
}

export async function getFromIndexedDB({ dbName, storeName, key }) {
  try {
    const db = await openIndexedDB({ dbName, storeName });

    return new Promise((resolve, reject) => {
      const transaction = db.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.get(key);

      request.onsuccess = (event) => {
        resolve(event.target.result);
      };

      request.onerror = (event) => {
        reject(event.target.error);
      };
    });
  } catch (error) {
    console.error('Error opening IndexedDB:', error);
    throw error;
  }
}

export async function deleteFromIndexedDB({ dbName, storeName, key }) {
  try {
    const db = await openIndexedDB({ dbName, storeName });
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.delete(key);

      request.onsuccess = () => {
        console.log('Data deleted from IndexedDB successfully');
        resolve();
      };

      request.onerror = (event) => {
        reject(event.target.error);
      };
    });
  } catch (error) {
    console.error('Error opening IndexedDB:', error);
    throw error;
  }
}
