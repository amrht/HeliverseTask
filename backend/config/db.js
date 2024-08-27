const mongoose = require('mongoose');
const { ServerApiVersion } = require('mongodb');


const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://arhayat7:UDNhuMzrHvsr3IeV@cluster0.jpujb.mongodb.net/express-mongo-crud?retryWrites=true&w=majority&appName=Cluster0',{
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            },
        });
        console.log('MongoDB Connected to cloud');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;