import { CashBox } from '../model/cashBox.js';

const getNewCashBox=()=>{
    return new CashBox();
};

export{ getNewCashBox };