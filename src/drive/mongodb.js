import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ silent: true });

/**
 * Make a connection to MongoDB based on environment variables.
 * Set .env to change MongoDB string connection
 */
const openConnection=async ()=>{

    let opts={
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 200
    };

    let credentials={};
    if(process.env.MONGO_USER && process.env.MONGO_PASS){
        credentials={
            authSource: process.env.MONGO_USER,
            user: process.env.MONGO_USER,
            pass: process.env.MONGO_PASS
        };
    }

    const uri="mongodb://"+
        process.env.MONGO_HOST+":"+
        process.env.MONGO_PORT+"/"+
        process.env.MONGO_DB;

    return mongoose.connect(uri, Object.assign(opts,credentials)).catch(
        (error)=>{
            console.log("connection error:" + error);
        }
    );

};

/**
 * Close the connection if connected
 * 
 * @returns a Promise to close connection
 */
const closeConnection=()=>{
    if(mongoose.connection.readyState === 1 && process.env.NODE_ENV!='test')
        return mongoose.disconnect();
};

export { openConnection, closeConnection };