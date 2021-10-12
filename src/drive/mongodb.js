import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ silent: true });

/**
 * Make a connection to MongoDB based on environment variables.
 * Set .env to change MongoDB string connection
 */
const openConnection=async ()=>{

    const credentials="";//process.env.MONGO_USER+":"+process.env.MONGO_PASS+"@";
    const uri="mongodb://"+
        credentials+
        process.env.MONGO_HOST+":"+
        process.env.MONGO_PORT+"/"+
        process.env.MONGO_DB;

    const opts = {useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: 200 };
    try {
        return mongoose.connect(uri, opts);
    } catch (err) {
        return console.log("connection error:" + err.reason);
    }
};

/**
 * Close the connection if connected
 * 
 * @returns a Promise to close connection
 */
const closeConnection=()=>{
    if(mongoose.connection.readyState === 1) return mongoose.connection.close();
};

export { openConnection, closeConnection };