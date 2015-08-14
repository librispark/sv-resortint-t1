/*
 * app.js
 * RSWebJS main app
 *
 */

define( [], function(){
    function RSWebJS( $, _, Event, pickLanguage, Dispatcher, Customization, rs ) {
        this.VERSION = '0.1.0';
        this.data = {};
        this.cookiekeys = [];
        this.rs = rs;
        this.dataclear = function() {
            $.cookie('data', null)
        }
        this.datal = function (n, v) {
            if (arguments.length > 1) {
                console.log('datal',n,v);
                this.data[n] = v;
                try {
                    var persistentdata = {},
                            storeageMechanism = window.localStorage ? window.localStorage.getItem('rswebjs') : window.top.name;
                    persistentdata = JSON.parse(storeageMechanism) || {};
                    persistentdata[n] = v;
                    var newdata = JSON.stringify(persistentdata);
                    window.localStorage ? window.localStorage.setItem('rswebjs', newdata) : (window.top.name = newdata);
                } catch (e) {
                }
            }
            return arguments.length == 0 ? undefined : this.data[n];
        }
        this.datac = function (n, v) {
            if (arguments.length > 1) {
                console.log('datac',n,v);
//                if (n=='CustomerId' && v==undefined) {throw Error("setting CustomerID!")}
                this.data[n] = v;
                if ($.inArray(n, this.cookiekeys) == -1) {
                    this.cookiekeys.push(n);
                }
            }
            if (arguments.length > 1 || arguments.length == 0) {
                var maxcookiesize = 4000,
                    cookiearray = {},
                    cookiedata = "";
                for (var i = 0; i < this.cookiekeys.length; i++) {
                    cookiearray[ this.cookiekeys[i] ] = this.data[ this.cookiekeys[i] ];
                }
                cookiedata = encodeURIComponent(JSON.stringify(cookiearray));
                for (var i = 0, cookiechunk = ""; cookiedata.length > 0; i++) {
                    var reverseoffset = 0;
                    if (cookiedata.length > maxcookiesize) {
                        var byteoffset = cookiedata.substr(maxcookiesize - 1, 1) == "%" ? 1 :
                            cookiedata.substr(maxcookiesize - 2, 1) == "%" ? 2 : 0;
                        /* TODO protect against UTF8 characters getting split.
                         *
                         for(;cookiedata.substr(maxcookiesize-byteoffset)){

                         }
                         //& 0xE0 == 0xC0)*/
                        cookiechunk = cookiedata.substr(0, maxcookiesize - byteoffset);
                        cookiedata = cookiedata.substr(maxcookiesize - byteoffset);
                    } else {
                        cookiechunk = cookiedata;
                        cookiedata = "";
                    }
                    $.cookie('data' + i, cookiechunk, {raw:true});
                }
                $.cookie('data', i);
            }
            return arguments.length == 0 ? undefined : this.data[n];
        };
        this.templates = {};
        this.app = this;
        this.event = Event;
        this.language = $.cookie('language') || pickLanguage || Customization.defaultLanguage;
        if (_.indexOf(Customization.availableLanguages, this.language)==-1) {
            this.language = Customization.defaultLanguage;
        }
        Customization.roomsBooking.defaultNumAdults = Customization.roomsBooking.defaultNumAdults || 1
        this.controllers = {};
        this.views = {};
        this.models = {};
        this.dispatcher = Dispatcher;
        this.customization = Customization;

        // Constructor
        this.init = function () {
            console.log('app init');
            var app = this,
                sessionid = null;
            if (+$.cookie('data')) {
                var cookiedata = "";
                for (var i = 0; i < $.cookie('data'); i++) {
                    cookiedata += $.cookie('data' + i)
                }
                this.data = JSON.parse(cookiedata);
                this.cookiekeys = _.keys(this.data);
            }
            if (sessionid = $.cookie('sessionid')) {
                this.data.SessionId = sessionid;
            }
            try {
                var persistentdata = {},
                    storeageMechanism = window.localStorage ? window.localStorage.getItem('rswebjs') : window.top.name;
                persistentdata = JSON.parse(storeageMechanism) || {};
                $.extend(this.data,persistentdata);
            } catch (e) {}


            this.dispatcher.init(this);
            return this;
        }
    };
    return RSWebJS;
});
