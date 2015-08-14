/**
 * @license ResortSuite Web Copyright (c) 2012-2014, Enablez Inc. All Rights Reserved.
 * build: @@buildrsweb@@
 */
 require.config({
    paths:{
        jquery:'lib/jquery',
        jquerymigrate:'lib/jquery.migrate',
        jqueryui:'lib/jquery.ui.core',
        jqueryuidatepicker:'lib/jquery.ui.datepicker',
        underscore:'lib/underscore',
        date:'lib/date',
        text:'lib/text',
        order:'lib/order',
        json2:'lib/json2',
        bootstrap:'lib/bootstrap',
        enquire:'lib/enquire',
        director:'lib/director-1.0.7',
        jquery_cookie:'lib/jquery.cookie',
        jquery_validate:'lib/jquery.validate',
        jquery_xml2json:'lib/jquery.xml2json',
        jquery_hashchange:'lib/jquery.ba-hashchange',
        rsweblib:'lib/rsweblib',
        Handlebars:'lib/handlebars',
        hbs:'lib/hbs',
        Customization:'customization/Customization',
        pointer_events_polyfill: 'lib/pointer_events_polyfill',
        jquerymask: 'lib/jquery.mask'
    },
    hbs:{
        templateExtension:'html',
        helperDirectory:'app/views/templates/helpers/',
        i18nDirectory:'app/views/templates/i18n/',
        // if disableI18n is `true` it won't load locales and the i18n helper
        // won't work as well.
        disableI18n:true
    },
    waitSeconds:15
});

window.app = {
    controllers: {},
    views: {},
    models: {}
};

window.noconsolelogging = true;
//>>excludeStart('excludeAfterBuild', pragmas.excludeAfterBuild)
window.noconsolelogging = false;

//>>excludeEnd('excludeAfterBuild')


// Load our app
define('rswebjs', [
    'order!jquery',
    'order!jquerymigrate',
    'order!underscore',
    'order!lib/event',
    'order!lib/pickLanguage',
    'order!app/dispatcher',
    'order!Customization',
    'order!json2',
    'order!jquery_cookie',
    'order!rsweblib',
    'order!app/app',
    'pointer_events_polyfill'
    ,'order!lib/hbs/controllerSham'
], function ($, querymigrate, _, Event, pickLanguage, Dispatcher, Customization, json2, jqc, rs, RSWebJS, PointerEventsPolyfill) {

        PointerEventsPolyfill.initialize({});

        if(!window.console || window.noconsolelogging ) {
            if (!!window.console) {
                window._console = window.console;
            }
            window.console = { log: function(){}}
        } else if (!window.console.log) {
            window.console.log = function(){}
        }


        var rswebjs = new RSWebJS($, _, Event, pickLanguage, Dispatcher, Customization, rs)
        window.app = $.extend(rswebjs, window.app);
        // Expose the application globally
      //  try {
            return window.app.init();
      //  }
//        catch (e) {
//            alert('General Exception. This message is intentionally cryptic.')
//        }
    }
);
