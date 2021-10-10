import { cashBox } from '../model/cashBox.js'

const getAvailableNotes=()=>{
    return cashBox.getDefaultAvailableNotes();
}

const getNumberOfNotes=(amount,note)=>{
    let non=parseInt(amount/note.v);// number of notes
    return ((note.l!==Infinity && non>note.l)?(note.l):(non));
}

const getTotalCash=()=>{
    let availableNotes=getAvailableNotes();
    let total=0;
    availableNotes.forEach((avn)=>{
        total+=avn.v*avn.l;
    });
    return total;
};

const getCashByAmount=(amount)=>{
    let availableNotes=getAvailableNotes();
    let outputCash=[];
    availableNotes.forEach((avn)=>{
        let l=getNumberOfNotes(amount,avn);
        amount=(l)?(amount-l*avn.v):(amount);
        outputCash.push({
            v:avn.v,
            l:l
        });
    });
    if(amount>0) throw Error('the value does not match the available notes');
    return outputCash;
}

export{ getNumberOfNotes, getAvailableNotes, getCashByAmount, getTotalCash };