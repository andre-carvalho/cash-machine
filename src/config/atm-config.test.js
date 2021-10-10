import { expect } from 'chai';
import { ATMConfig } from './atm-config.js';

describe('The main test cases of the ATM configuration.', ()=> {

    describe('Get the customer balance from configuration file.', ()=> {

        it('should return 10000 as the default value of the customer\'s opening balance.', async ()=> {
            expect( ATMConfig.account.customerBalance ).to.be.eql(10000);
        });
    });

    describe('Get the available notes from configuration file.', ()=> {

        it('should return an ordered list of available notes from highest to lowest using note values.', async ()=> {
            let clonedAvailableNotes=JSON.parse(JSON.stringify(ATMConfig.cashBox.availableNotes));
            clonedAvailableNotes.sort((a,b)=>{return a.v - b.v});

            expect( clonedAvailableNotes ).to.be.eql(ATMConfig.cashBox.availableNotes);
        });

        it('should return a note of 100 in the list of available notes.', async ()=> {
            expect( ATMConfig.cashBox.availableNotes[0].v ).to.be.eql(100);
        });
        it('should return a note of 50 in the list of available notes.', async ()=> {
            expect( ATMConfig.cashBox.availableNotes[1].v ).to.be.eql(50);
        });
        it('should return a note of 20 in the list of available notes.', async ()=> {
            expect( ATMConfig.cashBox.availableNotes[2].v ).to.be.eql(20);
        });
        it('should return a note of 10 in the list of available notes.', async ()=> {
            expect( ATMConfig.cashBox.availableNotes[3].v ).to.be.eql(10);
        });

        it('should return integer values including zero and infinity for the amount of notes.', async ()=> {
            ATMConfig.cashBox.availableNotes.forEach((avn)=>{
                expect( avn.a==Infinity || (Number.isInteger(avn.a) && avn.a>=0) ).to.be.eql(true);
            });
        });
    });
});