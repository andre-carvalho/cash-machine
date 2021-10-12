import { dotenv } from 'dotenv';
/**
 * Configure the MongoDB connection.
 */
dotenv.config();

const confConn="mongodb://"+process.env.MONGO_HOST+":"+process.env.MONGO_PORT+"/"+process.env.MONGO_DB;

