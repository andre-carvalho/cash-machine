import { expect } from 'chai';
import { CashBox } from './cashBox.js';
import { ATMConfig } from "../config/atm-config.js";
import { getRandomAmount, getRandomNote } from '../utils/utils.js';

describe('The main test cases of the cash box.', ()=> {

  const cashBox=new CashBox();

  describe('Default settings for a new cash box', ()=> {
    it('should return a default list of notes with same values from configuration file.', async ()=> {
      expect( cashBox.getAvailableNotes() ).to.be.eql(ATMConfig.cashBox.availableNotes);
    });
  });
  
  // generate a random amount of cash to simulate the request of customer
  const amount=getRandomAmount(0, ATMConfig.account.customerBalance);

  // get a random note from a list of notes
  const noteValue=getRandomNote(ATMConfig.cashBox.availableNotes);

  describe('For operation with number of notes', ()=> {
    const numOfNotes=cashBox.getNumberOfNotes(amount,{v:noteValue,l:Infinity});

    it('should return an integer.', async ()=> {
        expect( Number.isInteger(numOfNotes) ).to.be.eql(true);
    });

    it('should return a value that multiplied by the value of the note is less than or equal to the total money value.', async ()=> {
        expect( numOfNotes*noteValue ).to.be.lessThanOrEqual(amount);
    });

    let outputCash=[];
    if(cashBox.getTotalCash()>amount) {
      outputCash=cashBox.getCashByAmount(amount);
    }
    it('should return a list of notes and the respective number of notes for a required cash amount.', async ()=> {
      outputCash.forEach((oc,i)=>{
        expect( ATMConfig.cashBox.availableNotes[i].v ).to.be.eql(oc.v);
      });
    });

    it('the number of notes in the list must be greater than or equal to ZERO (0).', async ()=> {
      outputCash.forEach((oc)=>{
        expect( oc.a ).to.be.greaterThanOrEqual(0);
      });
    });

    it('the sum of the number of notes must be equal the amount of money requested.', async ()=> {
      let total=0;
      // get a special value where the maximum value is less than or equal to the money available
      const aSpecialAmount=getRandomAmount(0,cashBox.getTotalCash()); 
      const aSpecialOutputCash=cashBox.getCashByAmount(aSpecialAmount);
      aSpecialOutputCash.forEach((oc)=>{
        total+=oc.v*oc.a;
      });
      expect( total ).to.be.eql(aSpecialAmount);
    });

  });

  describe('Behavior with unexpected input values', ()=> {
    let amount=111;
    it('must throw an exception when some amount remains after distributing the requested amount from the available notes.', async ()=> {
      expect(()=>{cashBox.getCashByAmount(amount)}).to.throw('The value does not match the available notes.');
    });

    it('must throw an exception when some value of note is less than or equal to ZERO(0).', async ()=> {
        expect(()=>{cashBox.getNumberOfNotes(amount,{v:-10,l:Infinity})}).to.throw('Using an incorrect note value. Reset the cash box.');
    });

  });
});