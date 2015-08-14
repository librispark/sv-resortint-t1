/*
 * controllers/splash.js
 * Splash Controller
 */

define( [
    'app/ControllerClass',
    'app/models/systemModel',
    'app/views/splashView'], function( ControllerClass, SystemModel, SplashView ){
    return window.app.controllers.splashController = $.extend({}, ControllerClass, {
            app: app,
        module: 'splash',

        // required by the dispatcher: actions, init, performAction
            actions: {
                'show': ['show'],
                'iniSession': ['iniSession'],
                'language': ['changeLanguage']
            },
            init: function() {
                console.log('initializing splash controller');
                app.data.messages = app.data.messages || [];
            },

/**
            * Starts the whole thing rolling.
            *
            * @constructor
            */
            show : function () {
                console.log('spalshctrl:show');
                if(!app.data.splashControllerInitializedDfd) {
                    $.Deferred(function(dfd){
                        $.extend(app.data, {
                            'splashControllerInitializedDfd' : dfd ,
                            'splashControllerInitializedPromise' : dfd.promise()
                        });
                    });
                }

                $.when(
                        app.controllers.initController.InitializedPromise,
                        !!app.data.SessionId && app.models.systemModel.getData('folioBalance', {})
                    )
                    .done( function( r_fs, r_c, r_i ) {
                        console.log('splash controller init is resolved.')
                        app.views.splashView.event.fire('requestServiceTypeSelection');
                    })

            },

            iniSession : function () {
                                    app.models.systemModel.getData('folioSpecialServices', {
                                        SessionId : +Date.now()
                                    }).done(function(r_pfss){
                                        app.dispatcher.redirect('','',[]);
                                    })

            },

            changeLanguage : function (newLangId) {
                if (_.any(_.pluck(app.data.languageNames,"id"),function(x){return x==newLangId})) {
                    require(['localization/' + newLangId + '/Localization','localization/' + newLangId + '/customerOverrides','localization/' + app.language + '/paymentMessages'], function(Localization, overrides, paymentMessages){
                        app.localization = Localization;
                        if (paymentMessages) {
                            $.extend(app.localization, paymentMessages);
                        }
                        if (overrides) {
                            $.extend(app.localization, overrides);
                        }
                        window.Date.CultureInfo = Localization.CultureInfo;
                        app.language = newLangId;
                        window.app.controllers.initController.loadServiceTypes();
                        $.cookie('language',newLangId, {expires: Date.today().add(1).year()});
                        $.validator.messages = app.localization.general.err.jquery_validate;
                        app.views.splashView.event.fire('initTemplate');
                        window.history.back();
                    })
                }

            }



        })
});
