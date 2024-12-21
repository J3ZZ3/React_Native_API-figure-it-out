import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('images.db');

export const init = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS images (id INTEGER PRIMARY KEY NOT NULL, filePath TEXT NOT NULL, timestamp TEXT NOT NULL, latitude REAL, longitude REAL);',
        [],
        () => { resolve(); },
        (_, err) => { reject(err); }
      );
    });
  });
};

export const insertImage = (filePath, timestamp, latitude, longitude) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO images (filePath, timestamp, latitude, longitude) VALUES (?, ?, ?, ?);',
        [filePath, timestamp, latitude, longitude],
        (_, result) => { resolve(result); },
        (_, err) => { reject(err); }
      );
    });
  });
};

// Additional CRUD operations can be added here