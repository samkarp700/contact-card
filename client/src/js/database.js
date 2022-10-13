import { openDB } from "idb";
import 'regenerator-runtime/runtime';

//exported async function to open connection with indexedDB api
export const initDB = async () => 
    // we are creating a new db named contact_db which will be using version 1 of the db. 
    openDB('contact_db', 1, {
        // add our db schema if it has not already been initialized
        upgrade(db) {
            if (db.objectStoreNames.contains('contacts')) {
                console.log('contacts store already exists');
                return;
            }
            // create a new object store for the data and give it a key name of 'id' which will increment automatically
            db.createObjectStore('contacts', { keyPath: 'id', autoIncrement: true });
            console.log('contacts store created');
        }
    })
