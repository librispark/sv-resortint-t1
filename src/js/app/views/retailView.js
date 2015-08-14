/*
 * views/spaView.js
 * Spa View
 */

define( [
    'lib/event',
    'app/views/commonViewHelper',
    'hbs!app/views/templates/navbar',
    'hbs!app/views/templates/breadcrumbs',
    'hbs!app/views/templates/content',
    'hbs!app/views/templates/giftCertificatesTpl',
    'bootstrap'
], function( Event, commonViewHelper, navbarTpl, breadcrumbsTpl, contentTpl, giftCertificatesTpl){
    var retailView = {
        app : app,
        event : $.extend({},Event),
        module : "giftCertificates",
        render: function(template,data,breadcrumbs) {

        }
    };
    var setBreadCrumb = function( crumbText, crumbLink ) {
        app.data.breadCrumbs = app.data.breadCrumbs || {};
        app.data.breadCrumbs.retail = app.data.breadCrumbs.retail || [];
        var spliceCrumbsAt = -1,
            existingCrumb = $.grep(app.data.breadCrumbs.retail,function(crumb,index){
                if (crumb.name==crumbText) {
                    spliceCrumbsAt = index;
                    return true;
                }
                return false;
            }),
            currentCrumb = {name:crumbText,url:crumbLink};

        app.data.breadCrumbs.retail = existingCrumb.length ?
            $.merge(app.data.breadCrumbs.retail.slice(0,spliceCrumbsAt),[currentCrumb]) :
            $.merge(app.data.breadCrumbs.retail,[currentCrumb]);

        for(var i=0;i<app.data.breadCrumbs.retail.length;i++) {
            app.data.breadCrumbs.retail[i].last = i==(app.data.breadCrumbs.retail.length-1);
        }
    };

    retailView.event.listen('requestGCSelection', retailView, function(e, giftCertificates, categoryId){
        console.log('reading gcs types');
        var service = $.firstOrOnly($.grep( app.data.serviceTypes, function(a){
            return a.id==app.views.retailView.module
        }));
        if (!!categoryId) {
            giftCertificates = _.filter(giftCertificates, function(gc) {
                return _.any( categoryId.split('|'), function(cat) {
                    return gc.ItemType==cat
                });
            });
        }
        giftCertificates = _.sortBy(giftCertificates, function(gc) {
            return [gc.Name,app.rs.lpad(+gc.Price,15)]
        });
        app.data.breadCrumbs.retail = [{name:app.localization.giftCertificate.title,url:"#/giftCertificates",last:true}];
        $('#nav').html( navbarTpl( {
            Customization:app.customization,
            Localization : app.localization,
            services : app.data.serviceTypes,
            languages : app.data.languageNames,
            siteName : app.localization.siteName,
            backLink : app.customization.serverURL
        }) );
        $('#main').html( contentTpl( {
            Localization : app.localization,
            services : app.data.serviceTypes,
            bannerMessage : app.localization.giftCertificate.marketing.bannerMessage,
            siteName : app.localization.siteName,
            backLink : app.customization.serverURL,
            service : service
        }) );
        console.log(giftCertificates, service)
        $('#content').html( giftCertificatesTpl( {
            Customization: app.customization,
            Localization : app.localization,
            giftCertificates : giftCertificates,
            mailOrPickup : app.customization.retail.showSnailMail || app.customization.retail.showPickup
        }));
        $('#breadcrumbs').html( breadcrumbsTpl({
            'breadCrumbs':app.data.breadCrumbs.retail
        }) )
        commonViewHelper.updateNavBar(service,app.language,app.models.systemModel.dataModel.folioBalance.data[app.models.systemModel.makeStandardName(app.models.systemModel.dataModel.folioBalance,{})]);
        commonViewHelper.showMessages();
        commonViewHelper.prepGCForm();
    });

    retailView.event.listen('updateMessages', retailView, function(e){
        var service = $.firstOrOnly($.grep( app.data.serviceTypes, function(a){
            return a.id==app.views.retailView.module
        }));
        commonViewHelper.updateNavBar(service,app.language,app.models.systemModel.dataModel.folioBalance.data[app.models.systemModel.makeStandardName(app.models.systemModel.dataModel.folioBalance,{})]);
        commonViewHelper.showMessages();
        $('.submitGCForm').button('reset');
    });


    return window.app.views.retailView = retailView;
});
