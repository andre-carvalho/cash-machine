import { expect } from 'chai';
import { Account } from './account.js';
import { getRandomAmount } from '../utils/utils.js';

describe('The main test cases of the account:', ()=> {

    describe('Take money from the account:', ()=> {

        const account=new Account();
        // get some value compatible with the account balance
        const amount=getRandomAmount(0, account.getBalance());

        it('should return a balance amount minus the withdrawal amount.', async ()=> {
            let previousBalance=account.getBalance() - amount;
            expect( account.takeOut(amount) ).to.be.eql(previousBalance);
        });

        it('should return a recorded transaction.', async ()=> {
            expect( account.getTransactions().length ).to.be.eql(1);
        });

        it('should return a recorded transaction with withdrawal amount.', async ()=> {
            expect( account.getTransactions()[0] ).to.be.eql(amount);
        });
    });
});