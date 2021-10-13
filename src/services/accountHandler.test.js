import { expect } from 'chai';
import { ATMConfig } from '../config/atm-config.js';
import { getDefaultAccount, getBalance, getTransactions, takeOut, resetAccount } from './accountHandler.js';
import { Account } from '../model/account.js';
import { closeConnection } from '../drive/mongodb.js';

describe('The main test cases of the account handler:', ()=> {

    describe('Gets the current account from storage:', ()=> {

        it('should return an instance of Account class.', async ()=> {
            const account=await getDefaultAccount();
            expect( account ).instanceOf(Account);
        });
    });

    describe('For account operations:', ()=> {

        it('should return the number greater than or equal to 0 for the customer balance.', async ()=> {
            const res=await getBalance();
            expect( res.balance ).to.be.greaterThanOrEqual(0);
        });

        it('should return an array length greater than or equal to 0 for account transactions.', async ()=> {
            const res=await getTransactions();
            expect( res.transactions.length ).to.be.greaterThanOrEqual(0);
        });

        it('should return the balance that remains in the account.', async ()=> {
            const res=await getBalance();
            const amount=210;
            const amountRemains=await takeOut(amount);
            expect( amountRemains.balance ).to.be.greaterThanOrEqual(res.balance-amount);
            expect( amountRemains.notes.length ).to.be.greaterThanOrEqual(0);
        });
    });

    describe('For account reset operation:', ()=> {

        it('should return a new account with default customer balance and no transactions.', async ()=> {
            const newAccount=await resetAccount();
            expect( newAccount.getBalance() ).to.be.eql(ATMConfig.account.customerBalance);
            expect( newAccount.getTransactions().length ).to.be.eql(0);
        });
    });

    after(async ()=>{
        await closeConnection();
    });
});