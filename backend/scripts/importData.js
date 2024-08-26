const { MongoClient } = require('mongodb');
const fs = require('fs');


const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function updateDatabase() {
    try {
        await client.connect();

        const database = client.db('express-mongo-crud');
        const usersCollection = database.collection('users');

        // Delete all existing documents in the collection
        await usersCollection.deleteMany({});

        // Load the new data from the JSON file
        const data = JSON.parse(fs.readFileSync('./data/users.json', 'utf8'));

        // Insert the new data into the collection
        await usersCollection.insertMany(data);

        console.log('Database updated successfully');
    } catch (error) {
        console.error('Error updating database:', error);
    } finally {
        await client.close();
    }
}

updateDatabase();
