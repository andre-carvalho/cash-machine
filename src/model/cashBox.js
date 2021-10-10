/**
 * Represents the cash box and has the cash notes available
 */
import { ATMConfig } from "../config/atm-config.js";

const cashBox={

    getDefaultCustomerBalance:()=>{
        return ATMConfig.account.customerBalance;
    },

    getDefaultAvailableNotes:()=>{
        return ATMConfig.cashBox.availableNotes;
    }
};

export { cashBox };