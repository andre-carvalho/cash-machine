import { expect } from 'chai';
import { ATMConfig } from '../config/atm-config.js';
import { getDefaultCashBox, getAvailableNotes, resetCashBox } from './cashBoxHandler.js';
import { CashBox } from '../model/cashBox.js'

describe('The main test cases of the cash box handler.', () => {


  describe('Gets the current cash box from storage:', () => {

    it('should return an instance of CashBox class.', async () => {
      const cashBox = await getDefaultCashBox();
      expect(cashBox).instanceOf(CashBox);
    });
  });

  describe('For account operations:', () => {

    it('should return an array length greater than or equal to 0 for available notes.', async () => {
      const res = await getAvailableNotes();
      expect(res.availableNotes.length).to.be.greaterThanOrEqual(0);
    });
  });

  describe('For account reset operation:', () => {

    it('should return a new cashBox with default available notes.', async () => {
      const newCashBox = await resetCashBox();
      expect(newCashBox.getAvailableNotes()).to.be.eql(ATMConfig.cashBox.availableNotes);
    });
  });

});