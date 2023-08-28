// Connecting to mongoDB server
const mongoose = require('mongoose');
const mongoURI = "mongodb://0.0.0.0:27017/note-x";  // Replace the localhost by 0.0.0.0 i.e "mongodb://0.0.0.0:27017/"

// Creating a function to connect to MongoDB
const connectToMongo = ()=>{

    // In new version of monogDB callback function are no longer available so we will directly include our connection string without any callback function
    mongoose.connect(mongoURI);
    console.log('Database connected successfully')
}

module.exports = connectToMongo;


