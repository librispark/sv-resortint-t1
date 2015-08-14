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
    'hbs!app/views/templates/golfLocationList',
    'hbs!app/views/templates/golfCourseList',
    'hbs!app/views/templates/golfTeeInfo',
    'hbs!app/views/templates/golfTeeTimeSelection',
    'hbs!app/views/templates/golfBookConfirm',
    'bootstrap'
], function( Event, commonViewHelper, navbarTpl, breadcrumbsTpl, contentTpl, golfLocationList, golfCourseList, golfTeeInfo, golfTeeSelection, golfBookConfirm){
    var golfView = {
        app : app,
        event : $.extend({},Event),
        module : "golfBooking",
        render: function(template,data,breadcrumbs) {

        }
    };
    var setBreadCrumb = function( crumbText, crumbLink ) {
        app.data.breadCrumbs = app.data.breadCrumbs || {};
        app.data.breadCrumbs.golf = app.data.breadCrumbs.golf || [];
        var spliceCrumbsAt = -1,
            existingCrumb = $.grep(app.data.breadCrumbs.golf,function(crumb,index){
                if (crumb.name==crumbText) {
                    spliceCrumbsAt = index;
                    return true;
                }
                return false;
            }),
            currentCrumb = {name:crumbText,url:crumbLink};

        app.data.breadCrumbs.golf = existingCrumb.length ?
            $.merge(app.data.breadCrumbs.golf.slice(0,spliceCrumbsAt),[currentCrumb]) :
            $.merge(app.data.breadCrumbs.golf,[currentCrumb]);

        for(var i=0;i<app.data.breadCrumbs.golf.length;i++) {
            app.data.breadCrumbs.golf[i].last = i==(app.data.breadCrumbs.golf.length-1);
        }
    };

    golfView.event.listen('requestGolfLocationSelection', golfView, function(e, golfLocations){
        console.log('reading service types');
        var service = $.firstOrOnly($.grep( app.data.serviceTypes, function(a){
            return a.id==app.views.golfView.module
        }));
        app.data.breadCrumbs.golf = [{name:app.localization.golf.title,url:"#/golfBooking",last:true}];
        $('#nav').html( navbarTpl( {
            Customization:app.customization,
            Localization : app.localization,
            services : app.data.serviceTypes,
            languages : app.data.languageNames,
            siteName : app.localization.siteName,
            backLink : Customization.serverURL
        }) );
        $('#main').html( contentTpl( {
            Localization : app.localization,
            services : app.data.serviceTypes,
            bannerMessage : app.localization.golf.marketing.bannerMessage,
            siteName : app.localization.siteName,
            backLink : Customization.serverURL,
            service : service
        }) );
        console.log(golfLocations, service)
        $('#content').html( golfLocationList( {
            Localization : app.localization,
            golfLocations : golfLocations,
            showitem: // $.firstOrOnly(golfLocations).LocationId
                    $.isArray(golfLocations) && golfLocations.length==1
                        ? $.firstOrOnly(golfLocations).LocationId : ""
        }));
        $('#breadcrumbs').html( breadcrumbsTpl({
            'breadCrumbs':app.data.breadCrumbs.golf
        }) )
        commonViewHelper.updateNavBar(service,app.language,app.models.systemModel.dataModel.folioBalance.data[app.models.systemModel.makeStandardName(app.models.systemModel.dataModel.folioBalance,{})]);
        commonViewHelper.showMessages();
    });

    golfView.event.listen('requestGolfCourseSelection', golfView, function(e, golfLocations, golfCourses){

        var golfLocation = $.firstOrOnly($.grep( golfLocations, function(a){
            return a.LocationId==app.models.golfModel.getSelectedValue("golfLocations");

        }));

        setBreadCrumb(golfLocation.LocationName,"#/golfBooking/location/"+app.models.golfModel.getSelectedValue("golfLocations"));

        var service = $.firstOrOnly($.grep( app.data.serviceTypes, function(a){
            return a.id==app.views.golfView.module
        }));
        $('#nav').html( navbarTpl( {
            Localization : app.localization,
            Customization:app.customization,
            services : app.data.serviceTypes,
            languages : app.data.languageNames,
            siteName : app.localization.siteName,
            backLink : Customization.serverURL
        }) );
        $('#main').html( contentTpl( {
            Localization : app.localization,
            bannerMessage : app.localization.golf.marketing.bannerMessage,
            service : service
        }) );
        $('#content').html( golfCourseList( {
            Localization : app.localization,
            golfCourse : golfCourses,
            showitem: // $.firstOrOnly(golfCourses).CourseId
                $.isArray(golfCourses) && golfCourses.length==1
                    ? $.firstOrOnly(golfCourses).CourseId : ""
        }));
        $('#breadcrumbs').html( breadcrumbsTpl({
            'breadCrumbs':app.data.breadCrumbs.golf
        }) )
        commonViewHelper.updateNavBar(service,app.language,app.models.systemModel.dataModel.folioBalance.data[app.models.systemModel.makeStandardName(app.models.systemModel.dataModel.folioBalance,{})]);
        commonViewHelper.showMessages();
    });

    golfView.event.listen('requestGolfTeeInfo', golfView, function(e, golfCourses, golfLocation, startDate, startTime, endDTime, numberOfPlayers){

        var golfCourse = $.firstOrOnly($.grep( golfCourses, function(a){
            return a.CourseId==app.models.golfModel.getSelectedValue('golfCourses');
        }));

        setBreadCrumb(golfCourse.CourseName,"#/golfBooking/course/"+app.models.golfModel.getSelectedValue("golfCourses"));

        var service = $.firstOrOnly($.grep( app.data.serviceTypes, function(a){
            return a.id==app.views.golfView.module
        }));
/*
        $('#nav').html( navbarTpl( {
            Localization : app.localization,
            services : app.data.serviceTypes,
            languages : app.data.languageNames,
            siteName : app.localization.siteName,
            backLink : Customization.serverURL
        }) );
*/
        $('#main').html( contentTpl( {
            Localization : app.localization,
            bannerMessage : app.localization.golf.marketing.bannerMessage,
            service : service
        }) );
        $('#content').html( golfTeeInfo( {
            Localization : app.localization,
            course: app.models.golfModel.getSelectedValue("golfCourses"),
            startDate:startDate,
            startTime:startTime,
            endDTime:endDTime,
            numberOfPlayers:numberOfPlayers
        } ));
        $('#breadcrumbs').html( breadcrumbsTpl({
            'breadCrumbs':app.data.breadCrumbs.golf
        }) )
        commonViewHelper.prepGolfForm(golfLocation, startTime);
        commonViewHelper.updateNavBar(service,app.language,app.models.systemModel.dataModel.folioBalance.data[app.models.systemModel.makeStandardName(app.models.systemModel.dataModel.folioBalance,{})]);
        commonViewHelper.showMessages();
    });

    golfView.event.listen('requestTeeTimeSelection', golfView, function(e, golfTeeInfo, numberOfPlayers){
        setBreadCrumb(app.localization.golf.availableTeeTimeTitle,"#/golfBooking/course/"+app.models.golfModel.getSelectedValue("golfCourses"));

        var service = $.firstOrOnly($.grep( app.data.serviceTypes, function(a){
            return a.id==app.views.golfView.module
        }));
        var teeInfo = $.firstOrOnly(golfTeeInfo),
            firstTeeTime = (teeInfo && teeInfo.TeeTime) ? $.firstOrOnly(teeInfo.TeeTime) : {};
        $('#golfResults').html( golfTeeSelection( {
            Localization : app.localization,
            Customization:app.customization,
            teeInfo: teeInfo,
            firstTeeTime: firstTeeTime,
            numberOfPlayers: numberOfPlayers,
            location: app.models.golfModel.getSelectedValue("golfLocations")
        } ));
        commonViewHelper.showMessages();
        commonViewHelper.updateNavBar(service,app.language,app.models.systemModel.dataModel.folioBalance.data[app.models.systemModel.makeStandardName(app.models.systemModel.dataModel.folioBalance,{})]);
        commonViewHelper.updatedTeeTimes();
    });

    golfView.event.listen('requestTeeTimeConfirmation', golfView, function(e, golfRate, location, course, dateTime, numberOfPlayers){
        setBreadCrumb(Localization.golf.confirmGolfBooking,"#/golfBooking/confirm/"+golfRate);
        var service = $.firstOrOnly($.grep( app.data.serviceTypes, function(a){
            return a.id==app.views.golfView.module
        }));
        if (app.customization.golfBooking.showPriceIncludingSurcharges) {
            golfRate.Price = golfRate.PriceWithSurcharge || golfRate.Price || 0
        }
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
            bannerMessage : app.localization.golf.marketing.bannerMessage,
            service : service
        }) );
        $('#content').html( golfBookConfirm( {
            Localization : app.localization,
            golfRate: golfRate,
            location: location,
            course: course,
            dateTime: dateTime,
            date: dateTime.substr(0,10),
            time: dateTime.substr(10),
            numberOfPlayers: numberOfPlayers,
            total: numberOfPlayers * (golfRate ? golfRate.Price : 0),
            CustomerId: app.data.CustomerId
        } ));
        $('#breadcrumbs').html( breadcrumbsTpl({
            'breadCrumbs':app.data.breadCrumbs.golf
        }) )
        commonViewHelper.updateNavBar(service,app.language,app.models.systemModel.dataModel.folioBalance.data[app.models.systemModel.makeStandardName(app.models.systemModel.dataModel.folioBalance,{})]);
        commonViewHelper.showMessages();
        commonViewHelper.prepGolfConfirmForm();
    });
    return window.app.views.golfView = golfView;
});
