$(document).ready(function () {
    registerEvents();
    cashMachine.initDisplays();
});

/**
 * API Results Handler and UI View
 */
var cashMachine={

    initDisplays:function(){
        $('#balance-btn').trigger('click');
        cashMachine.displayAvailableNotes();
    },

    displayAvailableNotes:function(){
        cashBox.getAvailableNotes((avn)=>{
            let notes="";
            avn.forEach((n)=>{
                notes+="$"+n.v+" : "+((n.a)?(n.a):("Infinity"))+"<br/>";
            });
            $("#op-notes").html(notes);
        });
    },

    displayBalance:function(balance){
        $("#op-content").html(balance.balance);
    },

    displayExtract:function(extract){
        let ext="";
        extract.transactions.forEach((t)=>{
            ext+="debit $"+t+"<br/>";
        });
        $("#op-content").html(ext);
    },

    displayListNotes:function(withdrawn){
        let wd="Take your money <br/>";
        withdrawn.notes.forEach((cash)=>{
            if(cash.a>0) wd+=cash.a+" notes of $"+cash.v+"<br/>";
        });
        wd+="Balance after take out: "+withdrawn.balance;
        $("#op-content").html(wd);
        setTimeout(cashMachine.displayAvailableNotes(),300);
    }
};

var registerEvents=()=>{
    $('#balance-btn').on('click', function (ev) {
        account.getBalance((balance)=>{
            cashMachine.displayBalance(balance);
        });
    });
    $('#extract-btn').on('click', function (ev) {
        account.getExtract((extract)=>{
            cashMachine.displayExtract(extract);
        });
    });
    $('#takeout-btn').on('click', function (ev) {
        $('#balance-form').attr('style','display:none;');
        $('#takeout-form').attr('style','display:inline;');
    });

    $('#confirm-btn').on('click', function (ev) {
        let amount=$('#amount').val();
        account.takeOut(amount,(withdrawn)=>{
            $('#takeout-form').attr('style','display:none;');
            $('#balance-form').attr('style','display:inline;');
            cashMachine.displayListNotes(withdrawn);
        });
    });

    $('#account-reset-btn').on('click', function (ev) {
        if(confirm("Are you sure?")){
            account.reset((ret)=>{
                console.log("reset account: "+ret);
            });
        }
    });

    $('#cashbox-reset-btn').on('click', function (ev) {
        if(confirm("Are you sure?")){
            cashBox.reset((ret)=>{
                console.log("reset cash box: "+ret);
            });
        }
    });
};