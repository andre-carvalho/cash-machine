import { assert, expect } from 'chai';
import { getNumberOfNotes, getAvailableNotes, getCashByAmount, getTotalCash } from './cashBoxHandler.js';
import { cashBox } from '../model/cashBox.js';
import { ATMConfig } from "../config/atm-config.js";
import { getRandomAmount, getRandomNote } from '../utils/utils.js';

describe('The main test cases of the cash box handler.', ()=> {
  
  // generate a random amount of cash to simulate the request of customer
  const amount=getRandomAmount(0,cashBox.getDefaultCustomerBalance());

  // get a random note from a list of notes
  const configNotes=ATMConfig.cashBox.availableNotes;
  const noteValue=getRandomNote(configNotes);

  describe('Gets the max number of notes for a value of note without fraction', ()=> {
    const numOfNotes=getNumberOfNotes(amount,{v:noteValue,l:Infinity});

    it('should return an integer.', async ()=> {
        expect( Number.isInteger(numOfNotes) ).to.be.eql(true);
    });

    it('should return a value that multiplied by the value of the note is less than or equal to the total money value.', async ()=> {
        expect( numOfNotes*noteValue ).to.be.lessThanOrEqual(amount);
    });
  });

  describe('Delivery of available notes', ()=> {
    const availableNotes=getAvailableNotes();

    it('should return a default list of available notes of the same length as the list in the configuration file.', async ()=> {
      expect( availableNotes.length ).to.be.eql(configNotes.length);
    });

    it('should return a default list of notes with same values from configuration file.', async ()=> {
      configNotes.forEach((avn,i)=>{
        expect( availableNotes[i] ).to.be.eql(avn);
      });
    });

    let outputCash=[];
    if(getTotalCash()>amount) {
      outputCash=getCashByAmount(amount);
    }
    it('should return a list of notes and the respective number of notes for a required cash amount.', async ()=> {
      outputCash.forEach((oc,i)=>{
        expect( configNotes[i].v ).to.be.eql(oc.v);
      });
    });

    it('the number of notes in the list must be greater than or equal to ZERO (0).', async ()=> {
      outputCash.forEach((oc)=>{
        expect( oc.l ).to.be.greaterThanOrEqual(0);
      });
    });

    it('the sum of the number of notes must be equal the amount of money requested.', async ()=> {
      let total=0;
      // get a special value where the maximum value is less than or equal to the money available
      const aSpecialAmount=getRandomAmount(0,getTotalCash()); 
      const aSpecialOutputCash=getCashByAmount(aSpecialAmount);
      aSpecialOutputCash.forEach((oc)=>{
        total+=oc.v*oc.l;
      });
      expect( total ).to.be.eql(aSpecialAmount);
    });

  });

  describe('Behavior with unexpected input values', ()=> {
    let amount=111;
    it('must throw an exception when some amount remains after distributing the requested amount from the available notes.', async ()=> {
      expect(()=>{getCashByAmount(amount)}).to.throw('the value does not match the available notes');
    });

  });
});