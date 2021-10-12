$(document).ready(function () {
    registerEvents();
    cashMachine.initDisplays();
});

/**
 * API Results Handler and UI View
 */
var cashMachine={

    initDisplays:function(){
        account.getBalance((balance)=>{
            cashMachine.displayBalance(balance);
            cashMachine.displayAvailableNotes();
        });
    },

    displayAvailableNotes:function(){
        cashBox.getAvailableNotes((avn)=>{
            let notes="";
            avn.forEach((n)=>{
                notes+="$"+n.v+" : "+((n.a!=null)?(n.a):("Infinity"))+"<br/>";
            });
            $("#op-notes").html(notes);
        });
    },

    displayBalance:function(balance){
        $("#op-content").html("$"+balance.balance);
    },

    displayExtract:function(extract){
        let ext="";
        extract.transactions.forEach((t)=>{
            ext+="debit $"+t+"<br/>";
        });
        $("#op-content").html( ext?ext:"no debits found");
    },

    displayListNotes:function(withdrawn){
        let wd="";
        if(withdrawn.error){
            wd=withdrawn.error;
        }else{
            wd="Take your money <br/>";
            withdrawn.notes.forEach((cash)=>{
                if(cash.a>0) wd+=cash.a+" notes of $"+cash.v+"<br/>";
            });
            wd+="Balance after take out: "+withdrawn.balance;
        }
        $("#op-content").html(wd);
        setTimeout(cashMachine.displayAvailableNotes(),300);
    },

    swapFields:function(isTakeout){
        $('#balance-form').attr('style','display:'+(isTakeout?'none':'inline')+';');
        $('#takeout-form').attr('style','display:'+(isTakeout?'inline':'none')+';');
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
        cashMachine.swapFields(true);
    });

    $('#confirm-btn').on('click', function (ev) {
        let amount=$('#amount').val();
        account.takeOut(amount,(withdrawn)=>{
            cashMachine.swapFields(false);
            cashMachine.displayListNotes(withdrawn);
        });
    });

    $('#account-reset-btn').on('click', function (ev) {
        if(confirm("Are you sure?")){
            account.reset((ret)=>{
                console.log("reset account: "+ret);
                setTimeout(cashMachine.initDisplays(),300);
            });
        }
    });

    $('#cashbox-reset-btn').on('click', function (ev) {
        if(confirm("Are you sure?")){
            cashBox.reset((ret)=>{
                console.log("reset cash box: "+ret);
                setTimeout(cashMachine.initDisplays(),300);
            });
        }
    });

    $('#balance-btn, #extract-btn, #account-reset-btn, #cashbox-reset-btn').on('click',()=>{cashMachine.swapFields(false);});
};