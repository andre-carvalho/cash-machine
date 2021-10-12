var api={
    baseUrl:"http://localhost:3000/cashmachine/v1",

    call:function(path,fn,method){
        if(!method) method='GET';
        $.ajax( {url: this.baseUrl+path,type: method} )
            .done(function(response) {
                fn(response)
            })
            .fail(function(reason) {
                console.error(JSON.stringify(reason));
            })
            .always(function() {
                console.log( "complete" );
            });
    }
};

var account={
    path:"/account",

    getBalance:function(fn){
        api.call(this.path+"/balance",fn);
    },

    getExtract:function(fn){
        api.call(this.path+"/extract",fn);
    },

    takeOut:function(amount,fn){
        api.call(this.path+"/takeout/"+amount,fn);
    },

    reset:function(){
        api.call(this.path+"/reset",fn);
    }

};

var cashBox={

    getAvailableNotes:function(){

    },

    reset:function(){

    }
};