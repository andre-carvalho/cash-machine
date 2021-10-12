import { ATMConfig } from "../config/atm-config.js";

/**
 * Represents the cash box and has the cash notes available
 */
class CashBox {
    /**
     * Setting the initial value of an instance.
     * On fallback starts with ATM configuration values by default.
     * 
     * @param {[{v:integer,a:integer}]} availableNotes, a list of notes and their quantities.
     */
    constructor(availableNotes=ATMConfig.cashBox.availableNotes){
        this.availableNotes=availableNotes;
    };
    
    /**
     * Gets the current value of the available notes list.
     * 
     * @returns {[{v:integer,a:integer}]} the list of available notes and their quantities.
     */
    getAvailableNotes=()=>{
        return this.availableNotes;
    };

    /**
     * Gets a number of notes for a take out amount and some note value.
     * 
     * This method throw an exception if value of note is wrong, zero or negative.
     * 
     * @param {integer} amount, an amount to take out.
     * @param {integer} note, a note value.
     * @returns the number of notes including ZERO if available notes is not enough.
     */
    getNumberOfNotes=(amount,note)=>{
        if(note.v<=0) throw Error('Using an incorrect note value. Reset the cash box.');
        let non=parseInt(amount/note.v);// number of notes
        return ((note.a!==Infinity && note.a<non)?(note.a):(non));
    };
    
    /**
     * Gets the value total cash available in cash box.
     * 
     * @returns {integer} the total cash including ZERO and Infinity
     */
    getTotalCashAvailable=()=>{
        let availableNotes=this.getAvailableNotes();
        let total=0;
        availableNotes.forEach((avn)=>{
            total+=avn.v*avn.a;
        });
        return total;
    };
    
    /**
     * Get the number of notes for each note value and an take out amount.
     * 
     * This method throws an exception if the total amount of notes in the
     * cash box is less than the take out amount.
     * 
     * @param {integer} amount, an amount to take out.
     * @returns {[{v:integer,a:integer}]} the list of notes and each note value.
     */
    getNotesForAmount=(amount)=>{
        let availableNotes=this.getAvailableNotes();
        let outputCash=[];
        availableNotes.forEach((avn)=>{
            let non=this.getNumberOfNotes(amount,avn);
            avn.a=avn.a-non;// remove take out notes from cash box
            amount=(non)?(amount-non*avn.v):(amount);
            outputCash.push({
                v:avn.v,
                a:non
            });
        });
        if(amount>0) throw Error('The value does not match the available notes.');
        return outputCash;
    };

    /**
     * Export data of instance to JSON.
     * @returns {...} a simple Object
     */
    simplify=()=>{
        return {
            "availableNotes":this.getAvailableNotes()
        };
    };
};

export { CashBox };