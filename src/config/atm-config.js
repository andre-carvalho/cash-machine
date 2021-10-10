/**
 * Configure the cash machine defaults.
 * 
 */
const ATMConfig={
    account:{
        customerBalance:10000 // the initial amount of the customer's balance
    },
    cashBox:{
        availableNotes:[
            {v:100,l:2},
            {v:50,l:4},
            {v:20,l:5},
            {v:10,l:100}
        ] // the initial amount of available notes and their limits
    }
};

export{ ATMConfig };