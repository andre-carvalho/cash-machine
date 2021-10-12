import mongoose from 'mongoose';
import { openConnection } from '../drive/mongodb.js';
import { AccountModel } from './account.model.js';
import { Account } from './account.js';
import dotenv from 'dotenv';
dotenv.config({ silent: true });

// fixing an identifier to keep a single document on Mongo
const ACCOUNT_ID="single_account";

/**
 * Create an AccountModel instance from the Account class instance
 * 
 * @param {Account} account, an instance of Account class
 * @returns {AccountModel} an instance of AccountModel
 */
const createModelAccount=(account)=>{
    let anAccount={_id: ACCOUNT_ID, ...account.simplify()};
    return new AccountModel(anAccount);
};

/**
 * Gets the default Account from DB if exists.
 * 
 * @returns {Account} the Account instance using default ACCOUNT_ID as filter
 */
const getAccount = async ()=>{
    
    // if already connected, skip connect
    if(mongoose.connection.readyState === 0) await openConnection();
    let account=null;
    await AccountModel.findOne({ _id: ACCOUNT_ID })
    .then((anAccount)=>{
        account = new Account(anAccount.balance,anAccount.transactions);
    },(reason)=>{
        if(process.env.NODE_ENV!='test') console.log("Failure on getAccount:"+JSON.stringify(reason));
    })
    .catch((error)=>{
        if(process.env.NODE_ENV!='test') console.log("Exception on getAccount:"+JSON.stringify(error));
    });
    return account;
};

/**
 * Createan Account into DB.
 * It runs in an independent transaction, so it opens the connection,
 * performs the operation and closes the connection
 * 
 * @param {Account} account, an instance of Account class
 * @returns an instance of Account class on success or null otherwise
 */
const createAccount = async (account=new Account())=>{

    // if already connected, skip connect
    if(mongoose.connection.readyState === 0) await openConnection();

    const anAccount=createModelAccount(account);
    await anAccount.save()
    .then(()=>{
        if(process.env.NODE_ENV!='test') console.log("createAccount ok!")
    },(reason)=>{
        if(process.env.NODE_ENV!='test') console.log("Failure on createAccount:"+JSON.stringify(reason));
        account=null;
    })
    .catch((error)=>{
        if(process.env.NODE_ENV!='test') console.log("Exception on createAccount:"+JSON.stringify(error));
        account=null;
    });
    return account;
};

/**
 * Update an account document on DB
 * 
 * @param {Account} account, an instance of Account class
 * @returns an instance of Account class on success or null otherwise
 */
const updateAccount = async (account)=>{
    
    // if already connected, skip connect
    if(mongoose.connection.readyState === 0) await openConnection();

    await AccountModel.updateOne({ _id: ACCOUNT_ID }, account.simplify())
    .then(()=>{
        if(process.env.NODE_ENV!='test') console.log("updateAccount ok!");
    },(reason)=>{
        if(process.env.NODE_ENV!='test') console.log("Failure on updateAccount:"+JSON.stringify(reason));
        account=null;
    })
    .catch((error)=>{
        if(process.env.NODE_ENV!='test') console.log("Exception on updateAccount:"+JSON.stringify(error));
        account=null;
    });
    return account;
};

export { createAccount, getAccount, updateAccount };