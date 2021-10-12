import dotenv from 'dotenv';
import express from 'express';
import { accountRouter } from './routes/account.js';

dotenv.config({ silent: true });
var app = express();
var api = "/cashmachine/v1";

app.use( api+"/account", accountRouter);


app.get( api+"/cashbox/available/notes", (req, res)=> {
    res.send('available/notes');
});


app.listen(process.env.API_LISTEN_PORT, () => {
    console.log("The cash machine API is listening on the port: "+process.env.API_LISTEN_PORT);
});