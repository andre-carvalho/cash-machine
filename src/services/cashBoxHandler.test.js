import { expect } from 'chai';
import { getNewCashBox } from './cashBoxHandler.js';
import { ATMConfig } from "../config/atm-config.js";

describe('The main test cases of the cash box handler.', ()=> {

  const cashBox=getNewCashBox();

  describe('Start a new cash box', ()=> {

    it('should return an cash box with default available notes.', async ()=> {
        expect( cashBox.getAvailableNotes() ).to.be.eql(ATMConfig.cashBox.availableNotes);
    });
  });
  
});