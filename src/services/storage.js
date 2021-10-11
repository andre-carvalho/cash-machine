import mongoose from 'mongoose';
import { AccountModel } from '../model/account.model.js';

const connString="mongodb://localhost:32768/cash_machine";

mongoose.connect(connString, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Create an instance of model AccountModel
const AccountInstance = new AccountModel({ _id: "single_account", balance: 10000, transactions: [] });

// Save the new model instance, passing a callback
AccountInstance.save()
.then(()=> {
    console.log("Saved!");
},(reason)=>{
    console.log("Failure on save:"+JSON.stringify(reason));
    updateDoc();
})
.catch((error)=>{console.log("Exception on save:"+JSON.stringify(error));});
//.finally(()=>{db.close()});


// UPDATE document on MongoDB
const updateDoc=()=>{
    AccountModel.findOne({ _id: "single_account" })
    .then((anAccount)=>{
        anAccount.balance=99999;
        anAccount.save()
        .then(()=> {
            console.log("Updated!");
        },(reason)=>{
            console.log("Failure on update:"+JSON.stringify(reason));
        }).catch((error)=>{console.log("Exception on update:"+JSON.stringify(error));});
    },(reason)=>{
        console.log("Failure on findOne:"+JSON.stringify(reason));
    })
    .catch((error)=>{console.log("Exception on findOne:"+JSON.stringify(error));})
    .finally(()=>{db.close()});
};