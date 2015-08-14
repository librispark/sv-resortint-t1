/*
 * views/spaView.js
 * Spa View
 */

define([
    'lib/event',
    'app/views/commonViewHelper',
    'hbs!app/views/templates/navbar',
    'hbs!app/views/templates/breadcrumbs',
    'hbs!app/views/templates/content',
    'hbs!app/views/templates/spaLocationList',
    'hbs!app/views/templates/spaServiceTypeList',
    'hbs!app/views/templates/spaServiceList',
    'hbs!app/views/templates/spaClassList',
    'hbs!app/views/templates/spaClassSelection',
    'hbs!app/views/templates/spaClassConfirm',
    'bootstrap'
], function (Event, commonViewHelper, navbarTpl, breadcrumbsTpl, contentTpl, spaLocationListTpl, spaServiceTypeListTpl, spaServiceListTpl, spaClassListTpl, spaClassSelectionTpl, spaClassConfirmTpl) {
    var spaView = {
        app:app,
        event:$.extend({}, Event),
        module:"spaBooking",
        render:function (template, data, breadcrumbs) {

        }
    };

    var setBreadCrumb = function (crumbText, crumbLink) {
        app.data.breadCrumbs = app.data.breadCrumbs || {};
        app.data.breadCrumbs.spa = app.data.breadCrumbs.spa || [];
        var spliceCrumbsAt = -1,
            existingCrumb = $.grep(app.data.breadCrumbs.spa, function (crumb, index) {
                if (crumb.name == crumbText) {
                    spliceCrumbsAt = index;
                    return true;
                }
                return false;
            }),
            currentCrumb = {name:crumbText, url:crumbLink};

        app.data.breadCrumbs.spa = existingCrumb.length ?
            $.merge(app.data.breadCrumbs.spa.slice(0, spliceCrumbsAt), [currentCrumb]) :
            $.merge(app.data.breadCrumbs.spa, [currentCrumb]);

        for (var i = 0; i < app.data.breadCrumbs.spa.length; i++) {
            app.data.breadCrumbs.spa[i].last = i == (app.data.breadCrumbs.spa.length - 1);
        }
    };

    spaView.event.listen('requestSpaLocationSelection', spaView, function (e, spaLocations, spaLocationSelected) {
        var service = $.firstOrOnly($.grep(app.data.serviceTypes, function (a) {
            return a.id == app.views.spaView.module
        }));
        app.data.breadCrumbs.spa = [
            {name:app.localization.spaBooking.locationSelection.title, url:"#/spaBooking", last:true}
        ];
        var spaDate = "";
        if (app.customization.hideOtherPropertyIfItemsInCart && (app.data.spaPropertyIdsInCart.length > 0 || app.data.pmsPropertyIdsInCart.length > 0)) {
            spaLocations = _.filter(spaLocations,function(x){
                return _.any(app.data.spaPropertyIdsInCart, function(y){ return y==x.PropertyId }) || _.any(app.data.pmsPropertyIdsInCart, function(y){ return y==x.PropertyId })
            })
            if (app.data.spaPropertyIdsInCart.length == 1 && app.data.spaDateList[app.data.spaPropertyIdsInCart[0]] && app.data.spaDateList[app.data.spaPropertyIdsInCart[0]].length == 1) {
                spaDate = "/" + app.data.spaDateList[app.data.spaPropertyIdsInCart[0]][0];
            }
            if (app.data.pmsPropertyIdsInCart.length == 1 && app.data.pmsDateList[app.data.pmsPropertyIdsInCart[0]] && app.data.pmsDateList[app.data.pmsPropertyIdsInCart[0]].length >= 1) {
                spaDate = "/" + app.data.pmsDateList[app.data.pmsPropertyIdsInCart[0]][0].machine;
            }
        }
        $('#nav').html(navbarTpl({
            Localization:app.localization,
            Customization:app.customization,
            services:app.data.serviceTypes,
            languages:app.data.languageNames,
            siteName:app.localization.siteName,
            backLink:app.customization.serverURL
        }));
        $('#main').html(contentTpl({
            Localization:app.localization,
            services:app.data.serviceTypes,
            bannerMessage:app.localization.spaBooking.marketing.bannerMessage,
            siteName:app.localization.siteName,
            backLink:app.customization.serverURL,
            service:service
        }));
        $('#content').html(spaLocationListTpl({
            Localization:app.localization,
            Customization:app.customization,
            spaLocations:spaLocations,
            spaDate:spaDate,
            showitem: //$.firstOrOnly(spaLocations).LocationId
                $.isArray(spaLocations) && spaLocations.length==1
                    ? $.firstOrOnly(spaLocations).LocationId : ""
        }));
        $('#breadcrumbs').html(breadcrumbsTpl({
            'breadCrumbs':app.data.breadCrumbs.spa
        }))
        commonViewHelper.showMessages();
        commonViewHelper.updateNavBar(service,app.language,app.models.systemModel.dataModel.folioBalance.data[app.models.systemModel.makeStandardName(app.models.systemModel.dataModel.folioBalance,{})]);

        commonViewHelper.prepPMSRateForm();
    });

    spaView.event.listen('requestSpaServiceTypeSelection', spaView, function (e, spaLocationId) {
        setBreadCrumb(app.localization.spaBooking.categorySelection.title, "#/spaBooking/location/" + spaLocationId);
        var location = app.models.spaModel.getSelectedItem('spaLocations',{});
        var service = $.firstOrOnly($.grep(app.data.serviceTypes, function (a) {
            return a.id == app.views.spaView.module
        }));
        $('#nav').html(navbarTpl({
            Localization:app.localization,
            Customization:app.customization,
            services:app.data.serviceTypes,
            languages:app.data.languageNames,
            siteName:app.localization.siteName,
            backLink:Customization.serverURL
        }));
        $('#main').html(contentTpl({
            Localization:app.localization,
            bannerMessage:app.localization.spaBooking.marketing.bannerMessage,
            service:service
        }));
        $('#content').html(spaServiceTypeListTpl({
            Localization:app.localization,
            location:location
        }));
        $('#breadcrumbs').html(breadcrumbsTpl({
            'breadCrumbs':app.data.breadCrumbs.spa
        }))
        commonViewHelper.showMessages();
        commonViewHelper.updateNavBar(service,app.language,app.models.systemModel.dataModel.folioBalance.data[app.models.systemModel.makeStandardName(app.models.systemModel.dataModel.folioBalance,{})]);
    });

    spaView.event.listen('requestSpaServiceSelection', spaView, function (e, spaServices, itemId, location, date, time, staffGenderOrId, guestName, dateList, user, group) {
        setBreadCrumb(app.localization.spaBooking.categorySelection.selectService, "#spaBooking/service");


        var service = $.firstOrOnly($.grep(app.data.serviceTypes, function (arr) {
            return arr.id == 'spaBooking'
        }));
        /*  var location = $.firstOrOnly($.grep(app.data.spaLocations.SpaLocation,function(arr){
         return arr.LocationId==app.data.selectedSpaLocation
         }));*/
        var category = _.find(spaServices, function (x) {
            return _.any(x.value, function (y) {
                return y.SpaItemId && (y.SpaItemId == itemId)
            })
        })
        _.each(spaServices, function (v, k, l) {
            l[k].value = _.sortBy(l[k].value, function (s) {
                return app.customization.spaBooking.sortByPrice ? +s.Price : s.ItemName
            });
            app.customization.spaBooking.showPriceIncludingSurcharges
                && _.each(l[k].value, function(s,i){
                    s.PriceWithSurcharges && (l[k].value[i].Price = s.PriceWithSurcharges);
                })
        })
        spaServices = _.sortBy(spaServices, function (s) {
            return s.name
        });
        dateList = _.uniq(_.sortBy(dateList,function(x){
            return x.machine
        }), true, function(x){
            return x.machine
        });
        var templateData = {
            categories:spaServices,
            location:location,
            staffGenderOrId:staffGenderOrId,
            guestName:guestName,
            Customization:app.customization,
            Localization:app.localization,
            showitem:itemId,
            showcategory:category,
            staffOrGender: (location.AllowStaff=='Y' || location.AllowGender=='Y') ? "Y" : "N",
            dateList: dateList,
            selectedDate: date,
            user: user,
            group: group,
            url: window.location.hash.replace(/^#/, ''),
            showBookForGroupMember: user.CustomerId && !app.customization.spaBooking.disallowBookForGroupMember
        };
        $('#nav').html(navbarTpl({
            Localization:app.localization,
            Customization:app.customization,
            services:app.data.serviceTypes,
            languages:app.data.languageNames,
            siteName:app.localization.siteName,
            backLink:Customization.serverURL
        }));
        $('#main').html(contentTpl({
            Localization:app.localization,
            bannerMessage:app.localization.spaBooking.marketing.bannerMessage,
            service:service
        }));
        $('#content').html(spaServiceListTpl(templateData));
        $('#breadcrumbs').html(breadcrumbsTpl({
            'breadCrumbs':app.data.breadCrumbs.spa
        }))
        console.log(location, app.localization);
        commonViewHelper.updateNavBar(service,app.language,app.models.systemModel.dataModel.folioBalance.data[app.models.systemModel.makeStandardName(app.models.systemModel.dataModel.folioBalance,{})]);
        commonViewHelper.prepSpaForm(location, itemId, date, time, staffGenderOrId, templateData);
        commonViewHelper.showMessages();
    });


    spaView.event.listen('updateSpaServiceStaffList', spaView, function (e, params) {
        console.log('updateSpaServiceStaffList', arguments)
        commonViewHelper.updateSpaServiceStaffList(params.showitem, params.staffList, params.staffGenderOrId, params.location, params.type, params.value);
    });
    spaView.event.listen('requestSpaServiceStaffListUpdate', spaView, function (e, itemId) {
        console.log('requestSpaServiceStaffListUpdate', arguments)
    });
    spaView.event.listen('updateSpaItemAvailability', spaView, function (e, params) {
        console.log('updateSpaItemAvailability', params)
        commonViewHelper.updateSpaItemAvailability(params);
    });

    spaView.event.listen('requestSpaClassDateSelection', spaView, function (e, spaLocationId, startDate, dateList) {
        setBreadCrumb(app.localization.spaBooking.classSelection.title, "#/spaBooking/class/" + spaLocationId);
        var location = app.models.spaModel.getSelectedItem('spaLocations',{});
        var service = $.firstOrOnly($.grep(app.data.serviceTypes, function (a) {
            return a.id == app.views.spaView.module
        }));
        dateList = _.uniq(_.sortBy(dateList,function(x){
            return x.machine
        }), true, function(x){
            return x.machine
        });

        $('#nav').html(navbarTpl({
            Localization:app.localization,
            Customization:app.customization,
            services:app.data.serviceTypes,
            languages:app.data.languageNames,
            siteName:app.localization.siteName,
            backLink:Customization.serverURL
        }));
        $('#main').html(contentTpl({
            Localization:app.localization,
            bannerMessage:app.localization.spaBooking.marketing.bannerMessage,
            service:service
        }));
        $('#content').html(spaClassListTpl({
            Localization:app.localization,
            location:location,
            spaLocationId:spaLocationId,
            dateList: dateList,
            startDate:startDate
        }));
        $('#breadcrumbs').html(breadcrumbsTpl({
            'breadCrumbs':app.data.breadCrumbs.spa
        }))
        commonViewHelper.prepClassForm(spaLocationId, startDate);
        commonViewHelper.showMessages();
        startDate || commonViewHelper.updateNavBar(service,app.language,app.models.systemModel.dataModel.folioBalance.data[app.models.systemModel.makeStandardName(app.models.systemModel.dataModel.folioBalance,{})]);
    });
//                        app.views.spaView.event.fire('requestClassSelection',[r_sc, startDate, showItem, spaLocationId, guestName]);

    spaView.event.listen('requestClassSelection', spaView, function(e, classInfo, startDate, showItem, spaLocationId, guestName, spaItemId){

        var service = $.firstOrOnly($.grep(app.data.serviceTypes, function (a) {
            return a.id == app.views.spaView.module
        }));
        var category = _.find(classInfo, function (x) {
            return _.any(x.value, function (y) {
                var isSpaItem = y.SpaItemId && (y.SpaItemId == spaItemId);
                isSpaItem && y.SpaClassId && !showItem && (showItem = y.SpaClassId);
                return (y.SpaClassId && (y.SpaClassId == showItem)) || isSpaItem
            }) || classInfo.length==1
        })
        _.each(classInfo, function (v, k, l) {
            l[k].value = _.sortBy(l[k].value, function (s) {
                return app.customization.spaBooking.sortClassesByDate ? s.StartTime
                        : (app.customization.spaBooking.sortByPrice ? +s.Price : s.SpaItemName)
            });
            app.customization.spaBooking.showPriceIncludingSurcharges
                && _.each(l[k].value, function(s,i){
                    s.PriceWithSurcharges && (l[k].value[i].Price = s.PriceWithSurcharges);
                })
        })
        classInfo = _.sortBy(classInfo, function (s) {
            return s.name
        });
        var location = app.models.spaModel.getSelectedItem('spaLocations',{});
        $('#classResults').html( spaClassSelectionTpl( {
            Localization : app.localization,
            categories: classInfo,
            showitem: showItem,
            showcategory: category,
            spaLocationId: spaLocationId,
            guestName:guestName,
            location:location,
            spaItemId: spaItemId
//            firstTeeTime: firstTeeTime,
//            numberOfPlayers: numberOfPlayers,
//            location: app.models.golfModel.getSelectedValue("golfLocations")
        } ));
        commonViewHelper.showMessages();
        commonViewHelper.prepClassSelectionForm(spaLocationId, location, spaItemId);
        commonViewHelper.updateNavBar(service,app.language,app.models.systemModel.dataModel.folioBalance.data[app.models.systemModel.makeStandardName(app.models.systemModel.dataModel.folioBalance,{})]);
    });

    spaView.event.listen('confirmSpaClass', spaView, function(e, spaClassComponent,location,item,spaLocationId, classId, itemId, startDate, guestName){

        var service = $.firstOrOnly($.grep(app.data.serviceTypes, function (a) {
            return a.id == app.views.spaView.module
        }));
        var total = spaClassComponent.SpaClassComponent ? (spaClassComponent.SpaClassComponent.length+1) * item.Price : undefined;

        $('#nav').html(navbarTpl({
            Localization:app.localization,
            Customization:app.customization,
            services:app.data.serviceTypes,
            languages:app.data.languageNames,
            siteName:app.localization.siteName,
            backLink:Customization.serverURL
        }));
        $('#main').html(contentTpl({
            Localization:app.localization,
            bannerMessage:app.localization.spaBooking.marketing.bannerMessage,
            service:service
        }));
        $('#content').html( spaClassConfirmTpl( {
            Localization : app.localization,
            location:location,
            spaClassComponent:spaClassComponent || {},
            item:item,
            spaLocationId:spaLocationId,
            classId:classId,
            itemId:itemId,
            startDate:startDate,
            guestName:guestName,
            total:total,
            spaClassComponentCount: spaClassComponent.SpaClassComponent ? (spaClassComponent.SpaClassComponent.length+1) : undefined
        } ));
        $('#breadcrumbs').html(breadcrumbsTpl({
            'breadCrumbs':app.data.breadCrumbs.spa
        }))

        commonViewHelper.showMessages();
        commonViewHelper.updateNavBar(service,app.language,app.models.systemModel.dataModel.folioBalance.data[app.models.systemModel.makeStandardName(app.models.systemModel.dataModel.folioBalance,{})]);
        // commonViewHelper.prepClassSelectionForm(spaLocationId, location);
    });

    spaView.event.listen('updateMessages', spaView, function(e){
        var service = $.firstOrOnly($.grep(app.data.serviceTypes, function (a) {
            return a.id == app.views.spaView.module
        }));
        commonViewHelper.updateNavBar(service,app.language,app.models.systemModel.dataModel.folioBalance.data[app.models.systemModel.makeStandardName(app.models.systemModel.dataModel.folioBalance,{})]);
        commonViewHelper.showMessages();
    });

    return window.app.views.spaView = spaView;

});
