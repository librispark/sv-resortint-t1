/*
 * views/splash.js
 * Splash View
 */

define([
    'lib/event',
    'app/views/commonViewHelper',
    'hbs!app/views/templates/navbar',
    'hbs!app/views/templates/serviceTypeList',
    'hbs!app/views/templates/footer',
    'bootstrap'
], function (Event, commonViewHelper, navbarTpl, serviceTypeListTpl, footerTpl) {
    var splashView = {
        app:app,
        event:$.extend({}, Event),
        module:"splash"
    };

    splashView.event.listen('initTemplate', splashView, function (e) {
        $('#nav').html(navbarTpl({
            services:app.data.serviceTypes,
            languages:app.data.languageNames,
            Customization:app.customization,
            Localization:app.localization,
            siteName:app.localization.siteName,
            backLink:app.customization.serverURL
        }));
        $('#footer').html(footerTpl({
            Customization:app.customization,
            Localization:app.localization
        }))
        if (!!location.hash.replace(/^[#/]+/, '')) {
            $('#progressIndicator').modal('show');
        }
    });

    splashView.event.listen('requestServiceTypeSelection', splashView, function (e) {
        console.log('requestServiceTypeSelection');
        $('#main').html(serviceTypeListTpl({
            Localization:app.localization,
            Customization:app.customization,
            services:app.data.serviceTypes,
            siteName:app.localization.siteName,
            backLink:app.customization.serverURL
        }));
        $('#nav').html(navbarTpl({
            services:app.data.serviceTypes,
            languages:app.data.languageNames,
            Customization:app.customization,
            Localization:app.localization,
            siteName:app.localization.siteName,
            backLink:app.customization.serverURL
        }));
        $('#footer').html(footerTpl({
            Customization:app.customization,
            Localization:app.localization
        }))
        app.commonViewHelper.updateNavBar(null,app.language,app.models.systemModel.dataModel.folioBalance.data[app.models.systemModel.makeStandardName(app.models.systemModel.dataModel.folioBalance,{})]);
        app.commonViewHelper.showMessages();
    });

    splashView.event.listen('displayRemainingUpTime', splashView, function (e, minutes) {
        $('#uptimewarning').remove();
        $('#warnings').append('<div id="uptimewarning" class="alert alert-warning"><strong>' + app.localization.general.maintenance.maintenanceMessage + ' ' + minutes + ' ' + app.localization.general.maintenance.maintenanceMessageTimeUnit + '</strong></div>');
    });

    splashView.event.listen('clearRemainingUpTime', splashView, function (e) {
        $('#uptimewarning').remove();
    });

    splashView.event.listen('folioTimeoutWarning', splashView, function (e, minutes) {
        $('#foliowarning').remove();
        $('#warnings').append('<div id="foliowarning" class="alert alert-warning"><strong>' + app.localization.general.maintenance.folioTimeOutWarning + ' ' + minutes + ' ' + app.localization.general.maintenance.maintenanceMessageTimeUnit + '</strong></div>');
    });

    splashView.event.listen('clearTimeoutWarning', splashView, function (e) {
        $('#foliowarning').remove();
    });

    splashView.event.listen('folioTimedOut', splashView, function (e) {
        $('body').append('<div class="modal hide" id="folioTimedOut">\
            <div class="modal-header">\
            <h3>'+app.localization.general.err.timeoutTitle+'</h3>\
        </div>\
            <div class="modal-body">\
                <p>'+app.localization.general.err.timeoutText+'</p>\
                <p>'+app.localization.general.err.timeoutContinue+'</p>\
            </div>\
            <div class="modal-footer">\
                <a id="restart" href="#/" class="btn btn-primary">'+app.localization.general.err.startOver+'</a>\
            </div>\
        </div>');

        app.commonViewHelper.prepFolioTimedOut();
    });

    splashView.event.listen('folioCheckedOut', splashView, function (e) {
        if (app.data.folioCheckedOutFired) return;
        app.data.folioCheckedOutFired = true;
        $('body').append('<div class="modal hide" id="folioTimedOut">\
            <div class="modal-header">\
            <h3>'+app.localization.general.err.checkedoutTitle+'</h3>\
        </div>\
            <div class="modal-body">\
                <p>'+app.localization.general.err.checkedoutText+'</p>\
' + ( app.data.receipt
            ? app.localization.paymentProcessing.receiptHeader + app.data.receipt + app.localization.paymentProcessing.receiptFooter
            : ""
    ) + '                <p>'+app.localization.general.err.checkedoutContinue+'</p>\
            </div>\
            <div class="modal-footer">\
            ' + ( (app.localization.general.paymentCompleteMainSiteButton && app.localization.general.paymentCompleteMainSiteButton)
                ? '    <a id="mainsite" href="' + app.localization.general.paymentCompleteMainSiteLink + '" class="pull-left btn btn-primary">'+app.localization.general.paymentCompleteMainSiteButton+'</a>\
            '   : '' )
            +
            '    <a id="restart" href="#/" class="btn btn-primary">'+(app.localization.general.paymentCompleteStartOverButton||app.localization.general.err.startOver)+'</a>\
            </div>\
        </div>\
' + ( app.data.receipt
            ? '<div class="printReceipt">' + app.localization.paymentProcessing.receiptHeader + app.data.receipt + app.localization.paymentProcessing.receiptFooter + '</div>\
<style type="text/css" media="print">\n\
#main, #footer, .modal, .modal-backdrop, .printReceipt .btn { display:none !important }\n\
.printReceipt { display:inline-block }\n\
</style>'
            : ""
    ) + '');

        app.commonViewHelper.prepFolioTimedOut();
    });

    splashView.event.listen('displaySystemOffline', splashView, function (e) {
        $('#nav').html('<div class="offset4 span4 alert">\
            <img src="img/ResortSuiteWEB.png" alt="ResortSuite WEB"/><br/>\
            <h4 id="loadMessage">'+app.localization.general.err.serverOffline+'</h4>\
        </div>');
        $('#main').html('');
        $('#warnings').html('');
    });


    return window.app.views.splashView = splashView;
});
