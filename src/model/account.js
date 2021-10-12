import { ATMConfig } from '../config/atm-config.js';

/**
 * Represents the customer's account and has the balance and transactions.
 */
class Account {
    /**
     * Setting the initial value of an instance.
     * On fallback starts with ATM configuration values by default.
     * 
     * @param {integer} balance, the balance value.
     * @param {[integer]} transactions, the transactions list.
     */
    constructor(balance=ATMConfig.account.customerBalance,transactions=[]){
        this.balance=balance;
        this.transactions=transactions;
    };

    /**
     * Gets the current value of the account balance.
     * 
     * @returns {integer} the balance value.
     */
    getBalance=()=>{
        return this.balance;
    };

    /**
     * Gets the transactions registered in the account.
     * 
     * @returns {[integer]} the transaction list.
     */
    getTransactions=()=>{
        return this.transactions;
    };

    /**
     * Take out amount from account.
     * 
     * @param {integer} amount, a value to take out from account
     * @returns {integer} the balance that remains in the account
     */
    takeOut=(amount)=>{
        if(amount>this.balance) throw Error('This amount exceeds the account balance.');
        this.balance-=amount;
        this.transactions.push(amount);
        return this.balance;
    };

    /**
     * Export data of instance to JSON.
     * @returns {...} a simple Object
     */
    simplify=()=>{
        return {
            "balance":this.getBalance(),
            "transactions":this.getTransactions()
        };
    };
};

export { Account };