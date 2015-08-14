/*
 * dispatcher.js
 * Dispatcher for RSWebJS
 *
 * Parses URI and dispatches to controller.
 */

define( ['jquery_hashchange'], function(){
    function getCurrentHash() {
        var r = window.location.href;
        var i = r.indexOf("#");
        return (i >= 0
            ? r.substr(i+1)
            : ""
        );
    }

    var Dispatcher = {
            app: undefined,

            router: undefined,
            loadedModule: undefined,
            loadedModuleName: "",

            loadComplete : [],
            loadQueue : [],
            loadQueueDfd : [],

            modules: {
                'membership': 'club',
                'greeting': 'splash',
                'roomsBooking': 'rooms',
                'spaBooking': 'spa',
                'ski': 'ski',
                'giftCertificates': 'retail',
                'golfBooking': 'golf',
                'profile': 'user',
                'summary': 'cart',
                'init': 'init'
            },

            hashChangeHandler : function(e, args) {

                var self = args ? args.dispatcher : e.data.dispatcher,
                    lastRoute = self.lastRoute = self.currentRoute || null,
                    hash = getCurrentHash().replace(/^[#/]+/, ''),
                    route = hash.split('/'),
                    module = '',
                    action = '';
                self.currentRoute = $.extend({},route);
                module = (route.length && route[0]) ? route.shift() : 'greeting';
                action = (route.length && route[0]) ? route.shift() : "show";

                // TODO: Add a check that self.currentModule or self.currentAction aren't already set. if they are
                // then there's a previous module still loading. queue or wait and try again
                app.customization.googleAnalytics && _gaq.push(['_trackPageview','#/'+hash]);
                app.customization.googleAnalytics && console.log(_gaq);
                if (app.localization.analytics && app.localization.analytics.everyPage && typeof app.localization.analytics.everyPage == "function") {
                    app.localization.analytics.everyPage.call(app.data,hash);
                }
                self.dispatch.call(self, module, action, route);
            },
        updateURL : function( module, action, params, replace ) {
            var replace = replace || false,
                _action = action ? "/" + action : "",
                _params = params
                    ? ( params['length'] ? "/" + params.join("/") : "/" + params )
                    : "",
                url = '/' + module + _action + _params;
            if (replace && window.history && window.history.replaceState) {
                window.history.replaceState({},app.localization.general.applicationTitle, '#'+url);
            }
            return url
        },

        replace : function( module, action, params ) {
            this.redirect( module, action, params, true);
        },

        redirect : function( module, action, params, replace ) {
                // TODO: if in url chain, append the remaining segments to the
                //     requrested uri and redir browser to a new chain url
                //     else redir the browser to the requested url
                var replace = replace || false,
                    _action = action ? "/" + action : "",
                    paramEncoded = params && ($.isArray(params)?  _.map(params, function(v){ return v && encodeURIComponent(v) }) : encodeURIComponent(params)),
                    _params = params
                        ? ( $.isArray(params) ? "/" + paramEncoded.join("/") : "/" + paramEncoded )
                        : "",
                    url = '/' + module + _action + _params;
                if (replace && window.history && window.history.replaceState) {
                    app.customization.googleAnalytics && _gaq.push(['_trackPageview','#'+url]);
                    app.customization.googleAnalytics && console.log(_gaq);
                    if (app.localization.analytics && app.localization.analytics.everyPage && typeof app.localization.analytics.everyPage == "function") {
                        app.localization.analytics.everyPage.call(app.data,url);
                    }
                    window.history.replaceState({},app.localization.general.applicationTitle, '#'+url);
                    this.dispatch( module, action, paramEncoded );
                } else {
                    location.hash = url;
                }
            },

            dispatch: function( module, action, params ) {
                console.log('dispatching ', module, action, params);
                params = _.map(params, function(v){ return v && decodeURIComponent(v) });
                this.moduleLoader( this, module, action, params );
            },

            moduleLoader : function(self, module, action, params) {
                //console.log('moduleLoader', module, action, params);
                module = module || 'greeting';
                action = action || "show";

                if (self.modules.hasOwnProperty(module)) {
                    var modulePrefix = self.modules[module];
                    if (!self.loadQueue[modulePrefix+"Controller"]) {
                        self.loadQueue[modulePrefix+"Controller"] = [];
                        self.loadQueueDfd[modulePrefix+"Controller"] = $.Deferred();
                        self.loadQueueDfd[modulePrefix+"Controller"].progress(function(controllerName){
                            if (self.loadComplete[modulePrefix+"Controller"]) {
                                while(self.loadQueue[controllerName].length) {
                                    var queue = self.loadQueue[controllerName].shift();
                                    queue.fn.apply(queue.scope, queue.args);
                                }
                            }
                        });
                        if (action) {
                            self.loadQueue[modulePrefix+"Controller"].push( {scope:self, args:[module,action,params], fn:self.dispatchAction} );
                        }
                        require(["app/controllers/"+modulePrefix+"Controller"], function(loadedModule){
                            //console.log('loaded module ' + modulePrefix, loadedModule);
                            if (loadedModule) {
                                loadedModule.init && loadedModule.init();

                                self.loadComplete[modulePrefix+"Controller"] = true;
                                self.loadQueueDfd[modulePrefix+"Controller"].notify(modulePrefix+"Controller");
                                                    }
                        });
                    } else {
                        //console.log('module ' + modulePrefix + ' already loaded')
                        if (action) {
                            self.loadQueue[modulePrefix+"Controller"].push( {scope:self, args:[module,action,params], fn:self.dispatchAction} );
                        }
                        self.loadQueueDfd[modulePrefix+"Controller"].notify(modulePrefix+"Controller");
                    }
                } else {
                    //console.log('route not found for: ' + module)
                    return false;
                }
            },

            dispatchAction : function(module, action, params) {
                var self = this,
                    modulePrefix = self.modules[module];

                if(app) {
                    //console.log('performing action ' + action + ' in loaded module ' + module, self, self.app[modulePrefix+"Controller"])
                    if(app.controllers[modulePrefix+"Controller"].actions.hasOwnProperty(action)) {
                        //console.log('action found');
                        app.controllers[modulePrefix+"Controller"].performAction.apply(self.app.controllers[modulePrefix+"Controller"], $.merge([action],params));
                    } else {
                        //console.log('action not found for: ' + action)
                        return false;
                    }
                }
            },

            init: function(app) {
                var module='';
                if (location.search!="") {
                    var searchString = location.search.replace(/^\?+/, ''),
                        searchPairs = searchString.split('&'),
                        action='',
                        params='',
                        paramstack=[];
                    $.each( searchPairs, function(id,pair){
                        var keyval = pair.split("="),
                            _get_key = keyval[0],
                            _get_value = keyval[1];
                        if (_get_key=="module") {
                            module = { "ROOM":"roomsBooking", "SPA":"spaBooking", "GC":"giftCertificates", "GOLF":"golfBooking" }[_get_value];
                        }
                        if (_get_key=="category") {
                            module = "giftCertificates";
                            action = "show";
                            params = _get_value;
                        }
                        if (_get_key=="rateCategory") {
                            module = "roomsBooking";
                            action = "roomtype";
                            params = params ? params.split('/')[0] + '/' + _get_value+"/1" : '/' + _get_value+"/1" ;
                        }
                        if (_get_key=="rateType") {
                            module = "roomsBooking";
                            action = "roomtype";
                            params = params  ? _get_value + '/' + params.split('/')[1] + "/1" : _get_value + "//1";
                        }
                        if (_get_key=="token") {
                            module = "summary";
                            action = "ppReturn";
                            params = params ? _get_value + '/' + params.split('/')[1] : _get_value + '/';
                        }
                        if (_get_key=="PayerID") {
                            module = "summary";
                            action = "ppReturn";
                            params = params ? params.split('/')[0] + '/' + _get_value : '/' + _get_value;
                        }
                        if (_get_key=="I4GO_RESPONSE") {
                            module = "summary";
                            action = "i4gReturn";
                            paramstack[0] = _get_value;
                            params = paramstack.join('/');
                        }
                        if (_get_key=="I4GO_RESPONSECODE") {
                            module = "summary";
                            action = "i4gReturn";
                            paramstack[5] = _get_value;
                            params = paramstack.join('/');
                        }
                        if (_get_key=="I4GO_UNIQUEID") {
                            module = "summary";
                            action = "i4gReturn";
                            paramstack[1] = _get_value;
                            params = paramstack.join('/');
                        }
                        if (_get_key=="I4GO_CARDTYPE") {
                            module = "summary";
                            action = "i4gReturn";
                            paramstack[2] = _get_value;
                            params = paramstack.join('/');
                        }
                        if (_get_key=="I4GO_EXPIRATIONMONTH") {
                            module = "summary";
                            action = "i4gReturn";
                            paramstack[3] = _get_value;
                            params = paramstack.join('/');
                        }
                        if (_get_key=="I4GO_EXPIRATIONYEAR") {
                            module = "summary";
                            action = "i4gReturn";
                            paramstack[4] = _get_value;
                            params = paramstack.join('/');
                        }
                        if (_get_key=="YPCancel") {
                            module = "summary";
                            action = "ypReturn";
                            params = "cancel";
                        }
                        if (_get_key=="MTR") {
                            module = "summary";
                            action = "ypReturn";
                            paramstack[10] = _get_value;
                            params = paramstack.join('/');
                        }
                        if (_get_key=="PGTR") {
                            module = "summary";
                            action = "ypReturn";
                            paramstack[0] = _get_value;
                            params = paramstack.join('/');
                        }
                        if (_get_key=="AUTHID") {
                            module = "summary";
                            action = "ypReturn";
                            paramstack[1] = _get_value;
                            params = paramstack.join('/');
                        }
                        if (_get_key=="authCode") {
                            module = "summary";
                            action = "ypReturn";
                            paramstack[2] = _get_value;
                            params = paramstack.join('/');
                        }
                        if (_get_key=="message") {
                            module = "summary";
                            action = "ypReturn";
                            paramstack[3] = _get_value;
                            params = paramstack.join('/');
                        }
                        if (_get_key=="amount") {
                            module = "summary";
                            action = "ypReturn";
                            paramstack[4] = _get_value;
                            params = paramstack.join('/');
                        }
                        if (_get_key=="result") {
                            module = "summary";
                            action = "ypReturn";
                            paramstack[5] = _get_value;
                            params = paramstack.join('/');
                        }
                        if (_get_key=="digest") {
                            module = "summary";
                            action = "ypReturn";
                            paramstack[6] = _get_value;
                            params = paramstack.join('/');
                        }
                        if (_get_key=="CVVResponse") {
                            module = "summary";
                            action = "ypReturn";
                            paramstack[7] = _get_value;
                            params = paramstack.join('/');
                        }
                        if (_get_key=="AVSResposne") { // yes this is misspelled by the payment vendor
                            module = "summary";
                            action = "ypReturn";
                            paramstack[8] = _get_value;
                            params = paramstack.join('/');
                        }
                        if (_get_key=="postcodeResponse") {
                            module = "summary";
                            action = "ypReturn";
                            paramstack[9] = _get_value;
                            params = paramstack.join('/');
                        }
                        if (_get_key=="subscriptionRef") {
                            module = "summary";
                            action = "ypReturn";
                            paramstack[11] = _get_value;
                            params = paramstack.join('/');
                        }

                    });
                }
                if (module!="") {
                    // app.models.systemModel.getData('debugfolio',{SessionId:1, WebFolioId:1, Debug: "<![CDATA["+encodeURIComponent('queryString: '+JSON.stringify(location)+"  data: "+JSON.stringify(app.data)+"  cookie: "+JSON.stringify(document.cookie))+"--]]>"}).always(function(x){
                       location.assign( location.protocol + '//' + location.host + location.pathname + "#/" + [module,action,params].join("/" ));
                    // });
                } else {
                    require(['localization/' + app.language + '/Localization','localization/' + app.language + '/customerOverrides','localization/' + app.language + '/paymentMessages'], function(Localization, overrides, paymentMessages){
                        app.dispatcher.app = app;
                        app.localization = Localization;
                        if (paymentMessages) {
                            $.extend(app.localization, paymentMessages);
                        }
                        if (overrides) {
                            $.extend(app.localization, overrides);
                        }
                        if (typeof app.localization.paymentProcessing.analyticsCustomInit == 'function' ) {
                            window._gaq = [];
                            app.localization.paymentProcessing.analyticsCustomInit(app.customization.googleAnalytics, app.customization.googleAnalyticsDomain);
                        } else {
                            if (app.customization.googleAnalytics) {
                                window._gaq = [['_setAccount', app.customization.googleAnalytics]];
                                app.customization.googleAnalyticsDomain && window._gaq.push(['_setAllowLinker', true]);
                                app.customization.googleAnalyticsDomain && window._gaq.push(['_setDomainName', app.customization.googleAnalyticsDomain]);
                                var ga = document.createElement('script');     ga.type = 'text/javascript'; ga.async = true;
                                ga.src = ('https:'   == document.location.protocol ? 'https://ssl'   : 'http://www') + '.google-analytics.com/ga.js';
                                var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
                            }
                        }
                        window.Date.CultureInfo = Localization.CultureInfo;
                        app.dispatcher.moduleLoader(app.dispatcher, 'init', 'nothing');
                        $(window).bind('hashchange', app, app.dispatcher.hashChangeHandler);
                    })
                }
            }
        }
    return Dispatcher;
});
