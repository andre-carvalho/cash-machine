import mongoose from 'mongoose';
import { openConnection } from '../drive/mongodb.js';
import { CashBoxModel } from './cashBox.model.js';
import { CashBox } from '../model/cashBox.js';
import dotenv from 'dotenv';
dotenv.config({ silent: true });

// fixing an identifier to keep a single document on Mongo
const CASHBOX_ID="single_cash_box";

/**
 * Create an CashBoxModel instance from the CashBox class instance
 * 
 * @param {CashBox} cashBox, an instance of CashBox class
 * @returns {CashBoxModel} an instance of CashBoxModel
 */
const createCashBoxModel=(cashBox)=>{
    let aCashBox={_id: CASHBOX_ID, ...cashBox.simplify()};
    return new CashBoxModel(aCashBox);
};

/**
 * Gets the default CashBox from DB if exists.
 * 
 * @returns the cashBox with default CASHBOX_ID
 */
const getCashBox = async ()=>{
    
    // if already connected, skip connect
    if(mongoose.connection.readyState === 0) await openConnection();
    let cashbox;
    await CashBoxModel.findOne({ _id: CASHBOX_ID })
    .then((aCashBox)=>{
        cashbox = new CashBox(aCashBox.availableNotes);
    },(reason)=>{
        if(process.env.NODE_ENV!='test') console.log("Failure on getCashBox:"+JSON.stringify(reason));
    })
    .catch((error)=>{
        if(process.env.NODE_ENV!='test') console.log("Exception on getCashBox:"+JSON.stringify(error));
    });
    return cashbox;
};

/**
 * Create a CashBox into DB.
 * 
 * @param {CashBox} cashBox, an instance of CashBox class or {availableNotes:[{v:aInteger,a:aInteger}]}
 * @returns an instance of CashBox class on success or null otherwise
 */
const createCashBox = async (cashBox=new CashBox())=>{

    // if already connected, skip connect
    if(mongoose.connection.readyState === 0) await openConnection();

    const aCashBoxModel=createCashBoxModel(cashBox);
    await aCashBoxModel.save()
    .then(()=>{
        if(process.env.NODE_ENV!='test') console.log("createCashBox ok!");
    },(reason)=>{
        if(process.env.NODE_ENV!='test') console.log("Failure on createCashBox:"+JSON.stringify(reason));
        cashBox=null;
    })
    .catch((error)=>{
        if(process.env.NODE_ENV!='test') console.log("Exception on createCashBox:"+JSON.stringify(error));
        cashBox=null;
    });
    return cashBox;
};

/**
 * Update a cashBox document on DB
 * 
 * @param {CashBoxModel} cashBox, an instance of CashBox class
 * @returns an instance of CashBox class on success or null otherwise
 */
const updateCashBox = async (cashBox)=>{
    
    // if already connected, skip connect
    if(mongoose.connection.readyState === 0) await openConnection();

    await CashBoxModel.updateOne({ _id: CASHBOX_ID }, cashBox.simplify())
    .then(()=>{
        if(process.env.NODE_ENV!='test') console.log("updateCashBox ok!");
    },(reason)=>{
        if(process.env.NODE_ENV!='test') console.log("Failure on updateCashBox:"+JSON.stringify(reason));
        cashBox=null;
    })
    .catch((error)=>{
        if(process.env.NODE_ENV!='test') console.log("Exception on updateCashBox:"+JSON.stringify(error));
        cashBox=null;
    });
    return cashBox;
};

export { createCashBox, getCashBox, updateCashBox };