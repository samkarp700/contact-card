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
    });

    //exported READ function

    //export a function we will use to GET to the database
    export const getDB = async () => {
        console.log('GET from the database');

    //create a connection to the indexedDB databse and the version we want to use
    const contactDb = await openDB('contact_db', 1);

    // create a new transaction and specif the store and data privileges
    const tx = contactDb.transaction('contacts', 'readonly');

    //open up the desired object store
    const store = tx.objectStore('contacts');

    //use the .getAll() method to get all data in the databse
    const request = store.getAll();

    //get confirmation of the request
    const result = await request;
    console.log('result.value', result);
    return result;

};

//exported create function

//export a function we will use to post to the databse

export const postDB = async (name, email, phone, profile) => {
    console.log('Post to the database');

    //create a connection to the database and version we want to use
const contactDB = await openDB('contact_db', 1);

// create a new transaction and specify the store and data privileges
const tx = contactDB.transaction('contacts', 'readwrite');

//open up the desired object store
const store = tx.objectStore('contacts');

//use the .add() method on the store and pass in the content
const request = store.add({ name: name, email: email, phone: phone, profile: profile });

//get confirmation of the request
const result = await request;
console.log('data saved to the database', result);
};