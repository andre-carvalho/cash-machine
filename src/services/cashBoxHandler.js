import { closeConnection } from '../drive/mongodb.js';
import { getCashBox, createCashBox, updateCashBox } from '../model/cashBox.dao.js'
import { CashBox } from '../model/cashBox.js';

const getDefaultCashBox=async ()=>{
    let cashBox=await getCashBox();
    if(!cashBox) {
        cashBox=new CashBox();
        await createCashBox(cashBox);
    }
    return cashBox;
};

const getAvailableNotes=async ()=>{
    const cashBox=await getDefaultCashBox();
    closeConnection();
    return {availableNotes:cashBox.getAvailableNotes()};
};

const resetCashBox=async ()=>{
    const cashBox=await updateCashBox(new CashBox());
    closeConnection();
    if(!cashBox) {
        return { error: 'cash box reset failed' };
    }
    return cashBox;
};

export{ getDefaultCashBox, getAvailableNotes, resetCashBox };