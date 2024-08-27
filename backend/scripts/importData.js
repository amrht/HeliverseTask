const { MongoClient } = require('mongodb');
const fs = require('fs');
const { ServerApiVersion } = require('mongodb');


const uri = 'mongodb+srv://arhayat7:UDNhuMzrHvsr3IeV@cluster0.jpujb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(uri,{
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

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
