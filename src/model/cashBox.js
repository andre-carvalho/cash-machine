import { ATMConfig } from "../config/atm-config.js";

/**
 * Represents the cash box and has the cash notes available
 */
class CashBox {

    constructor(availableNotes=ATMConfig.cashBox.availableNotes){
        this.availableNotes=availableNotes;
    };
    
    getAvailableNotes=()=>{
        return this.availableNotes;
    };

    getNumberOfNotes=(amount,note)=>{
        if(note.v<=0) throw Error('Using an incorrect note value. Reset the cash box.');
        let non=parseInt(amount/note.v);// number of notes
        return ((note.a!==Infinity && non>note.a)?(note.a):(non));
    };
    
    getTotalCash=()=>{
        let availableNotes=this.getAvailableNotes();
        let total=0;
        availableNotes.forEach((avn)=>{
            total+=avn.v*avn.a;
        });
        return total;
    };
    
    getCashByAmount=(amount)=>{
        let availableNotes=this.getAvailableNotes();
        let outputCash=[];
        availableNotes.forEach((avn)=>{
            let l=this.getNumberOfNotes(amount,avn);
            amount=(l)?(amount-l*avn.v):(amount);
            outputCash.push({
                v:avn.v,
                l:l
            });
        });
        if(amount>0) throw Error('The value does not match the available notes.');
        return outputCash;
    };
};

class Note{
    constructor(value,amount){
        this.v=value;
        this.a=amount;
    }
};

export { CashBox, Note };