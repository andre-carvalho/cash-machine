import { ATMConfig } from '../config/atm-config.js';

/**
 * Represents the customer's account and has the balance and transactions
 */
class Account {
    constructor(balance=ATMConfig.account.customerBalance,transactions=[]){
        this.balance=balance;
        this.transactions=transactions;
    };

    getBalance=()=>{
        return this.balance;
    };

    getTransactions=()=>{
        return this.transactions;
    };
};

export { Account };