import { expect } from 'chai';
import { CashBox } from './cashBox.js';
import { ATMConfig } from "../config/atm-config.js";
import { getRandomAmount, getRandomNote } from '../utils/utils.js';

describe('The main test cases of the cash box:', ()=> {

  const cashBox=new CashBox();

  describe('Default settings for a new cash box:', ()=> {
    it('should return a default list of notes with same values from configuration file.', async ()=> {
      expect( cashBox.getAvailableNotes() ).to.be.eql(ATMConfig.cashBox.availableNotes);
    });

    it('should return a value that is greater than or equal to ZERO(0).', async ()=> {
      expect( cashBox.getTotalCashAvailable() ).to.be.greaterThanOrEqual(0);
    });
  });

  // generate a random amount of cash to simulate the request of customer
  let max=(ATMConfig.account.customerBalance<cashBox.getTotalCashAvailable())?(ATMConfig.account.customerBalance):(cashBox.getTotalCashAvailable());
  const amount=getRandomAmount(0, max);

  // get a random note from a list of notes
  const noteValue=getRandomNote(ATMConfig.cashBox.availableNotes);

  describe('For the operation, get a number of notes for some note value:', ()=> {

    const numOfNotes=cashBox.getNumberOfNotes(amount,{v:noteValue,l:Infinity});

    it('should return a positive integer or ZERO(0).', async ()=> {
        expect( Number.isInteger(numOfNotes) && numOfNotes>=0 ).to.be.eql(true);
    });

    it('should return a value that, multiplied by the value of the note, is less than or equal to the cash value required.', async ()=> {
        expect( numOfNotes*noteValue ).to.be.lessThanOrEqual(amount);
    });
  });

  describe('For the operation, get a list of notes for the order value:', ()=> {

    const outputCash=cashBox.getNotesForAmount(amount);

    it('should return a list of notes and the respective number of notes for a required cash amount.', async ()=> {
      outputCash.forEach((oc,i)=>{
        expect( ATMConfig.cashBox.availableNotes[i].v ).to.be.eql(oc.v);
      });
    });

    it('the number of notes in the list must greater than or equal to ZERO (0).', async ()=> {
      outputCash.forEach((oc)=>{
        expect( oc.a ).to.be.greaterThanOrEqual(0);
      });
    });

    it('the sum of the number of notes must equal the required cash amount.', async ()=> {
      let total=0;
      outputCash.forEach((oc)=>{
        total+=oc.v*oc.a;
      });
      expect( total ).to.be.eql(amount);
    });

  });

  describe('Behavior with unexpected input values', ()=> {
    let amount=111;
    it('must throw an exception when some amount remains after distributing the requested amount from the available notes.', async ()=> {
      expect(()=>{cashBox.getNotesForAmount(amount)}).to.throw('The value does not match the available notes.');
    });

    it('must throw an exception when some value of note is less than or equal to ZERO(0).', async ()=> {
        expect(()=>{cashBox.getNumberOfNotes(amount,{v:-10,l:Infinity})}).to.throw('Using an incorrect note value. Reset the cash box.');
    });

  });
});