import { getCashBox, createCashBox } from '../model/cashBox.dao.js'
import { CashBox } from '../model/cashBox.js';


const getDefaultCashBox=async ()=>{
    let cashBox=await getCashBox();
    if(!cashBox) {
        cashBox=new CashBox();
        await createCashBox(cashBox);
    }
    return cashBox;
};

export{ getDefaultCashBox };