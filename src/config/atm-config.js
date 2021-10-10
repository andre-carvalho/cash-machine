/**
 * Configure the cash machine defaults.
 * 
 */
const n100={v:100,a:Infinity};
const n50={v:50,a:Infinity};
const n20={v:20,a:Infinity};
const n10={v:10,a:Infinity};

const ATMConfig={
    account:{
        customerBalance:10000 // the initial amount of the customer's balance
    },
    cashBox:{
        availableNotes:[n100,n50,n20,n10] // the initial amount of available notes and their limits
    }
};

export{ ATMConfig };