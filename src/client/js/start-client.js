$(document).ready(function () {
    registerEvents();
});

var registerEvents=()=>{
    $('#balance-btn').on('click', function (ev) {
        account.getBalance((balance)=>{
            console.log("get balance: "+balance);
        });
    });
    $('#extract-btn').on('click', function (ev) {
        account.getExtract((extract)=>{
            console.log("get extract: "+extract);
        });
    });
    $('#takeout-btn').on('click', function (ev) {
        let amount=250;
        account.takeOut(amount,(ret)=>{
            console.log("take out: "+ret);
        });
    });
};