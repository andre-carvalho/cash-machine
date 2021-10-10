import { expect } from 'chai';
import { ATMConfig } from '../config/atm-config.js';
import { getNewAccount } from './accountHandler.js';

describe('The main test cases of the account handler:', ()=> {

    describe('Start a new account:', ()=> {

        const account=getNewAccount();

        it('should return an account with default customer balance.', async ()=> {
            expect( account.getBalance() ).to.be.eql(ATMConfig.account.customerBalance);
        });

        it('should return an account with no transactions.', async ()=> {
            expect( account.getTransactions().length ).to.be.eql(0);
        });
    });
});